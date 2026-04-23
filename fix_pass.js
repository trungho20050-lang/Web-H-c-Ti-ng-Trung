require('dotenv').config();
const sql = require('mssql');
const bcrypt = require('bcrypt');

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

async function fixPassword() {
    try {
        const pool = await sql.connect(dbConfig);
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash('Admin123', saltRounds);
        
        await pool.request()
            .input('Email', sql.NVarChar, 'admin@nhimstudy.com')
            .input('PasswordHash', sql.NVarChar, passwordHash)
            .query('UPDATE Users SET PasswordHash = @PasswordHash WHERE Email = @Email');
            
        console.log("Password fixed!");
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

fixPassword();
