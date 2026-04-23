-- Khởi tạo Database nếu chưa có
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'NhimStudyDB')
BEGIN
    CREATE DATABASE NhimStudyDB;
END
GO

USE NhimStudyDB;
GO

-- Vô hiệu hóa/Xoá bảng cũ nếu đã tồn tại để tránh lỗi
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.Users;
END
GO

-- Tạo bảng tài khoản người dùng
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    University NVARCHAR(150) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    HskLevel NVARCHAR(50) DEFAULT N'⭐ HSK Sơ cấp'
);
GO

-- Thêm một tài khoản admin mặc định để test (Mật khẩu: Admin123)
-- Hash bằng bcrypt 10 rounds của 'Admin123' 
INSERT INTO Users (FullName, Email, PasswordHash, University)
VALUES (N'Quản Trị Viên', 'admin@nhimstudy.com', '$2b$10$wT2B1y6VxyrE/QkX8s8gIebZ9P/M5aD0Hj6U9SId/3h1G1U9GqO9e', N'Đại học Ngôn ngữ');
GO
