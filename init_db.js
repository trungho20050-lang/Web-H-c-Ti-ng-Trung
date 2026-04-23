require('dotenv').config();
const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, 
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const query = `
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.Users;
END

CREATE TABLE Users (
    Id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    University NVARCHAR(150) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    HskLevel NVARCHAR(50) DEFAULT N' HSK Sơ cấp'
);

INSERT INTO Users (FullName, Email, PasswordHash, University)
VALUES (N'Quản Trị Viên', 'admin@trungnihao.com', '$2b$10$wT2B1y6VxyrE/QkX8s8gIebZ9P/M5aD0Hj6U9SId/3h1G1U9GqO9e', N'Đại học Ngôn ngữ');
`;

async function run() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to Somee DB. Creating tables...');
        await pool.request().query(query);
        console.log('Tables created successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

run();
