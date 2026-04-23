require('dotenv').config();
const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, 
    database: process.env.DB_NAME,
    options: { encrypt: true, trustServerCertificate: true }
};

const videos = [
    { title: "Giáo trình chuẩn HSK 1_Bài 1 你好_Phần 1", youtubeId: "FmldJqW1Hd4", category: "Giáo trình HSK 1" },
    { title: "Giáo trình chuẩn HSK 1_Bài 1 你好_Phần 2", youtubeId: "zkFTZ8pQUOc", category: "Giáo trình HSK 1" },
    { title: "Giáo trình chuẩn HSK 1 - BÀI TẬP 1", youtubeId: "x9zr05_7he0", category: "Giáo trình HSK 1" },
    { title: "Giáo trình HSK chuẩn 1 - Bài 2 谢谢你", youtubeId: "GcEZ8V5R9P4", category: "Giáo trình HSK 1" },
    { title: "Giáo trình chuẩn HSK 1 - BÀI TẬP 2", youtubeId: "jytXobwM2Ig", category: "Giáo trình HSK 1" },
    { title: "Giáo trình HSK chuẩn 1 - Bài 3 你叫什么名字？", youtubeId: "o8iWpMtGBpY", category: "Giáo trình HSK 1" },
    { title: "Giáo trình chuẩn HSK 1 - Bài 4 她是我的汉语老师", youtubeId: "7T--sDZ662Q", category: "Giáo trình HSK 1" }
];

async function insertVideos() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to SQL Server');
        
        for (const v of videos) {
            // Check if exists
            const check = await pool.request()
                .input('YoutubeId', sql.NVarChar, v.youtubeId)
                .query('SELECT Id FROM Videos WHERE YoutubeId = @YoutubeId');
            
            if (check.recordset.length === 0) {
                await pool.request()
                    .input('YoutubeId', sql.NVarChar, v.youtubeId)
                    .input('Title', sql.NVarChar, v.title)
                    .input('Description', sql.NVarChar, '')
                    .input('Category', sql.NVarChar, v.category)
                    .input('Duration', sql.NVarChar, '')
                    .query(`
                        INSERT INTO Videos (YoutubeId, Title, Description, Category, Duration)
                        VALUES (@YoutubeId, @Title, @Description, @Category, @Duration)
                    `);
                console.log('Inserted: ' + v.title);
            } else {
                console.log('Already exists: ' + v.title);
            }
        }
        
        console.log('Finished inserting videos');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

insertVideos();
