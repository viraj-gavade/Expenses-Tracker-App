require('dotenv').config()
const mysql = require('mysql2')
const pool = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DB_NAME
}).promise()



const GetAllExpenses = async(id)=>{
    // const validSortFields = ['title', 'amount', 'category', 'date'];
    // if (!validSortFields.includes(sortBy)) {
    //     throw new Error('Invalid sort field');
    // }

    // // Validate the order
    // const validOrders = ['ASC', 'DESC'];
    // if (!validOrders.includes(order)) {
    //     throw new Error('Invalid order');
    // }
    const [rows] = await pool.query(`SELECT * FROM expenses
        WHERE user_id = ? `,[id])
    console.log(rows)
    return rows
}


const GetSingleExpenses = async( id )=>{
    const [rows] = await pool.query(`
        SELECT * FROM expenses
        WHERE id =?`,[id])
    console.log(rows)
    return rows[0]
}

const AddExpenses = async( title,amount ,category,user_id)=>{
    const [rows] = await pool.query(`
        INSERT INTO expenses(title,amount,category,user_id)
        VALUES(?,?,?,?) `,[title,amount,category,user_id])
    // console.log(rows)

        const { insertId } = rows
        const result = await GetSingleExpenses(insertId)

    return result
}



const DeleteAllExpenses = async()=>{
    const [rows] = await pool.query(`DELETE FROM expenses `)
    console.log(rows)
    return rows[0]
}

const DeleteSingleExpenses = async(id)=>{
    const [rows] = await pool.query(`DELETE FROM expenses 
        WHERE id = ?`,[id])
    console.log(rows)
    return rows[0]
}

const TotalExpenses = async ( id )=>{
    const [rows] = await pool.query(`SELECT 
    SUM(amount) AS total_expenses
FROM 
    expenses
WHERE 
    YEAR(date) = YEAR(CURDATE()) AND MONTH(date) = MONTH(CURDATE()) AND user_id = ?;
`,[id])
    console.log(rows)
    return rows[0].total_expenses || 0
}

const MonthlyExpenses = async (id)=>{
    const [rows] = await pool.query(`SELECT 
    SUM(amount) AS total_expenses
FROM 
    expenses
WHERE 
    YEAR(date) = YEAR(CURDATE()) 
    AND MONTH(date) = MONTH(CURDATE()) AND user_id = ?;
`,[id])
    console.log(rows)
    return rows[0].total_expenses || 0
}

module.exports ={
    DeleteAllExpenses,
    DeleteAllExpenses,
    AddExpenses,
    GetAllExpenses,
    GetSingleExpenses,
    DeleteSingleExpenses,
    TotalExpenses,
    MonthlyExpenses


}