require('dotenv').config();
const sql = require('mssql');
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, 
    database: process.env.DB_NAME,
    options: { encrypt: true, trustServerCertificate: true }
};
sql.connect(dbConfig).then(pool => {
    return pool.request().query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Videos' and xtype='U')
        CREATE TABLE Videos (
            Id INT PRIMARY KEY IDENTITY(1,1),
            YoutubeId NVARCHAR(100) NOT NULL,
            Title NVARCHAR(255) NOT NULL,
            Description NVARCHAR(MAX),
            Category NVARCHAR(100),
            Duration NVARCHAR(50),
            CreatedAt DATETIME DEFAULT GETDATE()
        )
    `);
}).then(() => {
    console.log('Videos table checked/created');
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
