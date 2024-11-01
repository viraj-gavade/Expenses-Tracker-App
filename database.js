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

const SortExpenses = async( sortBy='amount',order='ASC' )=>{
    // const { sortBy , order } = req.query
    const validSortFields = ['title', 'amount', 'category', 'date'];
    if (!validSortFields.includes(sortBy)) {
        throw new Error('Invalid sort field');
    }

    // Validate the order
    const validOrders = ['ASC', 'DESC'];
    if (!validOrders.includes(order)) {
        throw new Error('Invalid order');
    }
    // const { sort } = req.params
    const [rows] = await pool.query(`SELECT * FROM expenses ORDER BY ${sortBy} ${order}`)
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

const AddExpenses = async()=>{
    const { title , amount ,category } = req.body
    const [rows] = await pool.query(`
        INSERT INTO expenses(title,amount,category)
        VALUES(?,?,?) `,[title,amount,category])
    console.log(rows)

        const { insertId } = rows
        const result = await GetSingleExpenses(insertId)

    return result
}



const DeleteAllExpenses = async()=>{
    const { title , amount ,category } = req.body
    const [rows] = await pool.query(`DELETE FROM expenses `)
    console.log(rows)
    return rows[0]
}

const DeleteSingleExpenses = async(id)=>{
    // const { id } = req.params
    const { title , amount ,category } = req.body
    const [rows] = await pool.query(`DELETE FROM expenses 
        WHERE id = ?`,[id])
    console.log(rows)
    return rows[0]
}

module.exports ={
    DeleteAllExpenses,
    DeleteAllExpenses,
    AddExpenses,
    GetAllExpenses,
    SortExpenses,
    GetSingleExpenses,
    DeleteSingleExpenses


}