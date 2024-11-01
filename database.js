require('dotenv').config()
const mysql = require('mysql2')
console.log('Database Host:', process.env.DATABASE_HOST);
console.log('Database User:', process.env.DATABASE_USER);
console.log('Database Password:', process.env.DATABASE_PASSWORD);
console.log('Database Name:', process.env.DB_NAME);
const pool = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DB_NAME
}).promise()


const GetAllExpenses = async()=>{
    const [rows] = await pool.query('SELECT * FROM expenses')
    console.log(rows)
    return rows
}


GetAllExpenses()