require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// Phục vụ các file tĩnh (HTML, CSS, JS) từ thư mục gốc
app.use(express.static(__dirname));

// Cấu hình kết nối SSMS
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, 
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // đối với azure, hoặc bắt buộc ở một số server thật
        trustServerCertificate: true // thiết yếu nếu dùng local không có chứng chỉ TLS
    }
};

// Khởi tạo Pool
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log(' Đã kết nối thành công tới MS SQL Server');
        return pool;
    })
    .catch(err => {
        console.error(' Lỗi kết nối CSDL: ', err);
        process.exit(1);
    });

// ===== API Đăng ký tài khoản =====
app.post('/api/auth/register', async (req, res) => {
    try {
        const { fullName, email, password, university } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ error: 'Vui lòng điền đầy đủ Tên, Email và Mật khẩu' });
        }

        const pool = await poolPromise;
        
        // Kiểm tra xem email đã tồn tại hay chưa
        const checkUser = await pool.request()
            .input('Email', sql.NVarChar, email)
            .query('SELECT Email FROM Users WHERE Email = @Email');

        if (checkUser.recordset.length > 0) {
            return res.status(400).json({ error: 'Email này đã được sử dụng!' });
        }

        // Mã hoá mật khẩu
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Lưu vào CSDL
        const insertQuery = `
            INSERT INTO Users (FullName, Email, PasswordHash, University, HskLevel)
            OUTPUT INSERTED.Id, INSERTED.FullName, INSERTED.Email, INSERTED.University, INSERTED.HskLevel, INSERTED.CreatedAt
            VALUES (@FullName, @Email, @PasswordHash, @University, @HskLevel)
        `;

        const result = await pool.request()
            .input('FullName', sql.NVarChar, fullName)
            .input('Email', sql.NVarChar, email)
            .input('PasswordHash', sql.NVarChar, passwordHash)
            .input('University', sql.NVarChar, university)
            .input('HskLevel', sql.NVarChar, ' HSK Sơ cấp')
            .query(insertQuery);

        // Lấy lại data để gửi về cho client set LocalStorage
        const user = result.recordset[0];
        res.status(201).json({ message: 'Tạo tài khoản thành công', user });

    } catch (err) {
        console.error('Lỗi API Register: ', err);
        res.status(500).json({ error: 'Lỗi hệ thống máy chủ' });
    }
});

// ===== API Đăng nhập =====
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Vui lòng nhập Email và Mật khẩu' });
        }

        const pool = await poolPromise;

        // Lấy User từ DB
        const result = await pool.request()
            .input('Email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE Email = @Email');

        const user = result.recordset[0];

        if (!user) {
            return res.status(401).json({ error: 'Email hoặc mật khẩu không chính xác' });
        }

        // So khớp mật khẩu
        const isMatch = await bcrypt.compare(password, user.PasswordHash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Email hoặc mật khẩu không chính xác' });
        }

        // Đăng nhập thành công, loại bỏ trường PasswordHash trước khi gửi về client
        delete user.PasswordHash;

        // Chỉ email admin được phép có quyền Admin
        const ADMIN_EMAIL = 'trungho20050@gmail.com';
        if (email.toLowerCase() !== ADMIN_EMAIL) {
            user.Role = 'User'; // Ép về User dù DB có ghi gì
        } else {
            user.Role = 'Admin';
        }

        res.status(200).json({ message: 'Đăng nhập thành công', user });

    } catch (err) {
        console.error('Lỗi API Login: ', err);
        res.status(500).json({ error: 'Lỗi hệ thống máy chủ' });
    }
});

// Biến nhớ tạm OTP (Lưu ý: Nếu server restart sẽ mất OTP chưa dùng)
const otpMap = new Map();

// ===== API Gửi OTP Khôi phục mật khẩu =====
app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Vui lòng cung cấp Email.' });

        const pool = await poolPromise;
        const result = await pool.request()
            .input('Email', sql.NVarChar, email)
            .query('SELECT Id FROM Users WHERE Email = @Email');

        if (result.recordset.length === 0) {
            return res.status(400).json({ error: 'Email không tồn tại trong hệ thống.' });
        }

        // Tạo OTP 6 số
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Lưu vào Map, hết hạn sau 15 phút
        otpMap.set(email, {
            otp: otp,
            expiresAt: Date.now() + 15 * 60 * 1000 
        });

        // Đáng lẽ sẽ gửi Email, nhưng ta gửi thẳng JSON để giả lập frontend nhận
        res.status(200).json({ message: 'Đã gửi mã OTP!', defaultOTP: otp });

    } catch (err) {
        console.error('Lỗi API Forgot Password:', err);
        res.status(500).json({ error: 'Lỗi hệ thống máy chủ' });
    }
});

// ===== API Reset mật khẩu =====
app.post('/api/auth/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ error: 'Vui lòng điền đủ mã OTP và Mật khẩu mới.' });
        }

        const otpData = otpMap.get(email);
        if (!otpData) {
            return res.status(400).json({ error: 'Mã OTP không hợp lệ hoặc bạn chưa yêu cầu cấp mã.' });
        }

        if (Date.now() > otpData.expiresAt) {
            otpMap.delete(email);
            return res.status(400).json({ error: 'Mã OTP đã hết hạn (chỉ tồn tại trong 15 phút).' });
        }

        if (otpData.otp !== otp) {
            return res.status(400).json({ error: 'Mã OTP không chính xác.' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'Mật khẩu phải từ 6 ký tự trở lên.' });
        }

        // OTP đúng, cập nhật DB
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(newPassword, saltRounds);

        const pool = await poolPromise;
        await pool.request()
            .input('Email', sql.NVarChar, email)
            .input('PasswordHash', sql.NVarChar, passwordHash)
            .query('UPDATE Users SET PasswordHash = @PasswordHash WHERE Email = @Email');

        // Xóa OTP đã sử dụng
        otpMap.delete(email);

        res.status(200).json({ message: 'Đổi mật khẩu thành công!' });

    } catch (err) {
        console.error('Lỗi API Reset Password:', err);
        res.status(500).json({ error: 'Lỗi hệ thống máy chủ' });
    }
});

// ===== API Lấy danh sách Video =====
app.get('/api/videos', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT * FROM Videos ORDER BY Category, CreatedAt DESC');
        
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Lỗi API GET Videos: ', err);
        res.status(500).json({ error: 'Lỗi hệ thống máy chủ' });
    }
});

// ===== API Thêm Video =====
app.post('/api/videos', async (req, res) => {
    try {
        const { youtubeId, title, desc, category, duration } = req.body;
        
        if (!youtubeId || !title || !category) {
            return res.status(400).json({ error: 'Vui lòng điền đủ YoutubeId, Tiêu đề và Danh mục.' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('YoutubeId', sql.NVarChar, youtubeId)
            .input('Title', sql.NVarChar, title)
            .input('Description', sql.NVarChar, desc || '')
            .input('Category', sql.NVarChar, category)
            .input('Duration', sql.NVarChar, duration || '')
            .query(`
                INSERT INTO Videos (YoutubeId, Title, Description, Category, Duration)
                OUTPUT INSERTED.*
                VALUES (@YoutubeId, @Title, @Description, @Category, @Duration)
            `);
            
        res.status(201).json({ message: 'Thêm video thành công', video: result.recordset[0] });
    } catch (err) {
        console.error('Lỗi API POST Videos: ', err);
        res.status(500).json({ error: 'Lỗi hệ thống máy chủ' });
    }
});

// ===== API Sửa Video =====
app.put('/api/videos/:id', async (req, res) => {
    try {
        const videoId = req.params.id;
        const { youtubeId, title, desc, category, duration } = req.body;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('Id', sql.Int, videoId)
            .input('YoutubeId', sql.NVarChar, youtubeId)
            .input('Title', sql.NVarChar, title)
            .input('Description', sql.NVarChar, desc || '')
            .input('Category', sql.NVarChar, category)
            .input('Duration', sql.NVarChar, duration || '')
            .query(`
                UPDATE Videos
                SET YoutubeId = @YoutubeId, Title = @Title, Description = @Description, Category = @Category, Duration = @Duration
                OUTPUT INSERTED.*
                WHERE Id = @Id
            `);
            
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy video cần sửa' });
        }
        res.status(200).json({ message: 'Sửa video thành công', video: result.recordset[0] });
    } catch (err) {
        console.error('Lỗi API PUT Videos: ', err);
        res.status(500).json({ error: 'Lỗi hệ thống máy chủ' });
    }
});

// ===== API Xóa Video =====
app.delete('/api/videos/:id', async (req, res) => {
    try {
        const videoId = req.params.id;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Id', sql.Int, videoId)
            .query('DELETE FROM Videos WHERE Id = @Id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Không tìm thấy video cần xóa' });
        }
        res.status(200).json({ message: 'Xóa video thành công' });
    } catch (err) {
        console.error('Lỗi API DELETE Videos: ', err);
        res.status(500).json({ error: 'Lỗi hệ thống máy chủ' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Backend Server đang chạy tại http://localhost:${PORT}`);
});
