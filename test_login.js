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

async function checkLogin() {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query("SELECT * FROM Users");
        console.log("Users in DB:", result.recordset);
        
        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const isMatch = await bcrypt.compare('Admin123', user.PasswordHash);
            console.log("Does Admin123 match hash in DB?", isMatch);
        }
        
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkLogin();
