require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const sql     = require('mssql');
const bcrypt  = require('bcrypt');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ===== Cấu hình DB =====
const dbConfig = {
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server:   process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: { encrypt: true, trustServerCertificate: true }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => { console.log('✅ Đã kết nối MS SQL Server'); return pool; })
    .catch(err  => { console.error('❌ Lỗi kết nối CSDL:', err); process.exit(1); });

// ===== Cấu hình Nodemailer (Gmail SMTP) =====
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

// Hàm gửi email OTP
async function sendOTPEmail(toEmail, otp, purpose = 'verify') {
    const isRegister = purpose === 'register';
    const subject    = isRegister ? '🎉 Mã xác nhận đăng ký – Trung 你好' : '🔐 Mã đặt lại mật khẩu – Trung 你好';
    const action     = isRegister ? 'xác nhận đăng ký tài khoản' : 'đặt lại mật khẩu';

    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:0;background:#fdf2f8;font-family:'Segoe UI',Arial,sans-serif;">
      <div style="max-width:520px;margin:40px auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(236,72,153,0.12);">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#db2777,#fb7185);padding:32px 28px;text-align:center;">
          <div style="font-size:40px;margin-bottom:8px;">🈳</div>
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Trung 你好</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">Nền tảng học Tiếng Trung AI</p>
        </div>
        <!-- Body -->
        <div style="padding:36px 32px;">
          <p style="margin:0 0 10px;font-size:15px;color:#374151;">Xin chào,</p>
          <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;">
            Chúng tôi nhận được yêu cầu <strong>${action}</strong> của bạn. Vui lòng sử dụng mã OTP dưới đây:
          </p>
          <!-- OTP Box -->
          <div style="background:linear-gradient(135deg,rgba(219,39,119,0.06),rgba(251,113,133,0.04));border:2px dashed rgba(219,39,119,0.3);border-radius:16px;padding:28px;text-align:center;margin-bottom:24px;">
            <p style="margin:0 0 8px;font-size:12px;color:#9ca3af;font-weight:600;letter-spacing:2px;text-transform:uppercase;">MÃ XÁC NHẬN</p>
            <div style="font-size:48px;font-weight:900;letter-spacing:12px;color:#db2777;font-family:'Courier New',monospace;">${otp}</div>
            <p style="margin:12px 0 0;font-size:12px;color:#6b7280;">⏱ Mã có hiệu lực trong <strong>10 phút</strong></p>
          </div>
          <p style="margin:0 0 16px;font-size:13px;color:#9ca3af;line-height:1.7;">
            Nếu bạn không thực hiện yêu cầu này, hãy bỏ qua email này. Tài khoản của bạn vẫn an toàn.
          </p>
          <hr style="border:none;border-top:1px solid #fce7f3;margin:24px 0;">
          <p style="margin:0;font-size:12px;color:#d1d5db;text-align:center;">© 2026 Trung 你好 · Nền tảng học Tiếng Trung AI</p>
        </div>
      </div>
    </body>
    </html>`;

    await transporter.sendMail({
        from: `"Trung 你好" <${process.env.MAIL_USER}>`,
        to:   toEmail,
        subject,
        html
    });
}

// ===== Map lưu OTP tạm thời =====
// Format: email -> { otp, expiresAt, data? (cho register) }
const otpMap = new Map();

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// ====================================================
// ===== API ĐĂNG KÝ – Bước 1: Gửi OTP xác minh email
// ====================================================
app.post('/api/auth/send-register-otp', async (req, res) => {
    try {
        const { fullName, email, password, university } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ error: 'Vui lòng điền đầy đủ Tên, Email và Mật khẩu.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Mật khẩu phải từ 6 ký tự trở lên.' });
        }

        const pool = await poolPromise;
        const check = await pool.request()
            .input('Email', sql.NVarChar, email)
            .query('SELECT Email FROM Users WHERE Email = @Email');

        if (check.recordset.length > 0) {
            return res.status(400).json({ error: 'Email này đã được sử dụng!' });
        }

        const otp = generateOTP();
        otpMap.set(`reg_${email}`, {
            otp,
            expiresAt: Date.now() + 10 * 60 * 1000,
            data: { fullName, email, password, university }
        });

        await sendOTPEmail(email, otp, 'register');

        res.status(200).json({ message: `Đã gửi mã xác nhận tới ${email}. Vui lòng kiểm tra hộp thư.` });

    } catch (err) {
        console.error('Lỗi send-register-otp:', err);
        if (err.code === 'EAUTH') {
            return res.status(500).json({ error: 'Cấu hình email chưa đúng. Vui lòng liên hệ Admin.' });
        }
        res.status(500).json({ error: 'Lỗi hệ thống, không thể gửi email.' });
    }
});

// ====================================================
// ===== API ĐĂNG KÝ – Bước 2: Xác minh OTP → Tạo TK
// ====================================================
app.post('/api/auth/verify-register-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ error: 'Thiếu Email hoặc mã OTP.' });
        }

        const entry = otpMap.get(`reg_${email}`);
        if (!entry) {
            return res.status(400).json({ error: 'Mã OTP không hợp lệ hoặc bạn chưa yêu cầu đăng ký.' });
        }
        if (Date.now() > entry.expiresAt) {
            otpMap.delete(`reg_${email}`);
            return res.status(400).json({ error: 'Mã OTP đã hết hạn. Vui lòng thử lại từ đầu.' });
        }
        if (entry.otp !== otp.trim()) {
            return res.status(400).json({ error: 'Mã OTP không chính xác.' });
        }

        // OTP đúng → Tạo tài khoản
        const { fullName, password, university } = entry.data;
        const passwordHash = await bcrypt.hash(password, 10);

        const pool = await poolPromise;

        // Kiểm tra lại phòng race condition
        const check = await pool.request()
            .input('Email', sql.NVarChar, email)
            .query('SELECT Email FROM Users WHERE Email = @Email');
        if (check.recordset.length > 0) {
            otpMap.delete(`reg_${email}`);
            return res.status(400).json({ error: 'Email này đã được sử dụng!' });
        }

        const result = await pool.request()
            .input('FullName',     sql.NVarChar, fullName)
            .input('Email',        sql.NVarChar, email)
            .input('PasswordHash', sql.NVarChar, passwordHash)
            .input('University',   sql.NVarChar, university || '')
            .input('HskLevel',     sql.NVarChar, ' HSK Sơ cấp')
            .query(`
                INSERT INTO Users (FullName, Email, PasswordHash, University, HskLevel)
                OUTPUT INSERTED.Id, INSERTED.FullName, INSERTED.Email, INSERTED.University, INSERTED.HskLevel, INSERTED.CreatedAt
                VALUES (@FullName, @Email, @PasswordHash, @University, @HskLevel)
            `);

        otpMap.delete(`reg_${email}`);
        const user = result.recordset[0];
        user.Role = 'User';

        res.status(201).json({ message: 'Tạo tài khoản thành công!', user });

    } catch (err) {
        console.error('Lỗi verify-register-otp:', err);
        res.status(500).json({ error: 'Lỗi hệ thống máy chủ.' });
    }
});

// ====================================================
// ===== API Đăng nhập
// ====================================================
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Vui lòng nhập Email và Mật khẩu.' });
        }

        const pool   = await poolPromise;
        const result = await pool.request()
            .input('Email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE Email = @Email');

        const user = result.recordset[0];
        if (!user) return res.status(401).json({ error: 'Email hoặc mật khẩu không chính xác.' });

        const isMatch = await bcrypt.compare(password, user.PasswordHash);
        if (!isMatch) return res.status(401).json({ error: 'Email hoặc mật khẩu không chính xác.' });

        delete user.PasswordHash;

        const ADMIN_EMAIL = 'trungho20050@gmail.com';
        user.Role = email.toLowerCase() === ADMIN_EMAIL ? 'Admin' : 'User';

        res.status(200).json({ message: 'Đăng nhập thành công', user });

    } catch (err) {
        console.error('Lỗi Login:', err);
        res.status(500).json({ error: 'Lỗi hệ thống máy chủ.' });
    }
});

// ====================================================
// ===== API QUÊN MẬT KHẨU – Gửi OTP
// ====================================================
app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Vui lòng cung cấp Email.' });

        const pool   = await poolPromise;
        const result = await pool.request()
            .input('Email', sql.NVarChar, email)
            .query('SELECT Id FROM Users WHERE Email = @Email');

        if (result.recordset.length === 0) {
            return res.status(400).json({ error: 'Email không tồn tại trong hệ thống.' });
        }

        const otp = generateOTP();
        otpMap.set(`pwd_${email}`, {
            otp,
            expiresAt: Date.now() + 10 * 60 * 1000
        });

        await sendOTPEmail(email, otp, 'reset');

        res.status(200).json({ message: `Đã gửi mã xác nhận tới ${email}. Vui lòng kiểm tra hộp thư (cả mục Spam).` });

    } catch (err) {
        console.error('Lỗi forgot-password:', err);
        if (err.code === 'EAUTH') {
            return res.status(500).json({ error: 'Cấu hình email chưa đúng. Vui lòng liên hệ Admin.' });
        }
        res.status(500).json({ error: 'Lỗi hệ thống, không thể gửi email.' });
    }
});

// ====================================================
// ===== API QUÊN MẬT KHẨU – Reset mật khẩu
// ====================================================
app.post('/api/auth/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ error: 'Vui lòng điền đủ mã OTP và Mật khẩu mới.' });
        }

        const entry = otpMap.get(`pwd_${email}`);
        if (!entry) {
            return res.status(400).json({ error: 'Mã OTP không hợp lệ hoặc bạn chưa yêu cầu cấp mã.' });
        }
        if (Date.now() > entry.expiresAt) {
            otpMap.delete(`pwd_${email}`);
            return res.status(400).json({ error: 'Mã OTP đã hết hạn (chỉ tồn tại trong 10 phút).' });
        }
        if (entry.otp !== otp.trim()) {
            return res.status(400).json({ error: 'Mã OTP không chính xác.' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'Mật khẩu phải từ 6 ký tự trở lên.' });
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);
        const pool = await poolPromise;
        await pool.request()
            .input('Email',        sql.NVarChar, email)
            .input('PasswordHash', sql.NVarChar, passwordHash)
            .query('UPDATE Users SET PasswordHash = @PasswordHash WHERE Email = @Email');

        otpMap.delete(`pwd_${email}`);
        res.status(200).json({ message: 'Đổi mật khẩu thành công!' });

    } catch (err) {
        console.error('Lỗi reset-password:', err);
        res.status(500).json({ error: 'Lỗi hệ thống máy chủ.' });
    }
});

// ====================================================
// ===== API register cũ (giữ lại cho tương thích)
// ====================================================
app.post('/api/auth/register', async (req, res) => {
    return res.status(400).json({ error: 'Vui lòng dùng luồng đăng ký mới có xác minh email.' });
});

// ====================================================
// ===== API Video
// ====================================================
app.get('/api/videos', async (req, res) => {
    try {
        const pool   = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Videos ORDER BY Category, CreatedAt DESC');
        res.status(200).json(result.recordset);
    } catch (err) { res.status(500).json({ error: 'Lỗi hệ thống.' }); }
});

app.post('/api/videos', async (req, res) => {
    try {
        const { youtubeId, title, desc, category, duration } = req.body;
        if (!youtubeId || !title || !category) {
            return res.status(400).json({ error: 'Vui lòng điền đủ YoutubeId, Tiêu đề và Danh mục.' });
        }
        const pool   = await poolPromise;
        const result = await pool.request()
            .input('YoutubeId',   sql.NVarChar, youtubeId)
            .input('Title',       sql.NVarChar, title)
            .input('Description', sql.NVarChar, desc || '')
            .input('Category',    sql.NVarChar, category)
            .input('Duration',    sql.NVarChar, duration || '')
            .query(`INSERT INTO Videos (YoutubeId,Title,Description,Category,Duration)
                    OUTPUT INSERTED.*
                    VALUES (@YoutubeId,@Title,@Description,@Category,@Duration)`);
        res.status(201).json({ message: 'Thêm video thành công', video: result.recordset[0] });
    } catch (err) { res.status(500).json({ error: 'Lỗi hệ thống.' }); }
});

app.put('/api/videos/:id', async (req, res) => {
    try {
        const { youtubeId, title, desc, category, duration } = req.body;
        const pool   = await poolPromise;
        const result = await pool.request()
            .input('Id',          sql.Int,      req.params.id)
            .input('YoutubeId',   sql.NVarChar, youtubeId)
            .input('Title',       sql.NVarChar, title)
            .input('Description', sql.NVarChar, desc || '')
            .input('Category',    sql.NVarChar, category)
            .input('Duration',    sql.NVarChar, duration || '')
            .query(`UPDATE Videos SET YoutubeId=@YoutubeId,Title=@Title,Description=@Description,Category=@Category,Duration=@Duration
                    OUTPUT INSERTED.* WHERE Id=@Id`);
        if (!result.recordset.length) return res.status(404).json({ error: 'Không tìm thấy video.' });
        res.status(200).json({ message: 'Sửa video thành công', video: result.recordset[0] });
    } catch (err) { res.status(500).json({ error: 'Lỗi hệ thống.' }); }
});

app.delete('/api/videos/:id', async (req, res) => {
    try {
        const pool   = await poolPromise;
        const result = await pool.request()
            .input('Id', sql.Int, req.params.id)
            .query('DELETE FROM Videos WHERE Id=@Id');
        if (!result.rowsAffected[0]) return res.status(404).json({ error: 'Không tìm thấy video.' });
        res.status(200).json({ message: 'Xóa video thành công' });
    } catch (err) { res.status(500).json({ error: 'Lỗi hệ thống.' }); }
});

// ====================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server tại http://localhost:${PORT}`));
