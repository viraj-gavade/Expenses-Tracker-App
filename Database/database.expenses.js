require('dotenv').config();
const mysql = require('mysql2');

// Creating a MySQL connection pool for efficient query handling
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// Retrieves all expenses associated with a specific user by user ID
const GetAllExpenses = async (id) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM expenses WHERE user_id = ?`, [id]);
        return rows;
    } catch (error) {
        console.error(error); // Only logging errors
    }
};

// Retrieves a single expense by its unique ID
const GetSingleExpenses = async (id) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM expenses WHERE id = ?`, [id]);
        return rows[0];
    } catch (error) {
        console.error(error);
    }
};

// Adds a new expense to the database and returns the newly added expense
const AddExpenses = async (title, amount, category, user_id) => {
    try {
        const [rows] = await pool.query(`
            INSERT INTO expenses (title, amount, category, user_id)
            VALUES (?, ?, ?, ?)`, [title, amount, category, user_id]);
        
        const { insertId } = rows;
        const result = await GetSingleExpenses(insertId);
        return result;
    } catch (error) {
        console.error(error);
    }
};

// Deletes all expenses from the database (use with caution)
const DeleteAllExpenses = async () => {
    try {
        const [rows] = await pool.query(`DELETE FROM expenses`);
        return rows;
    } catch (error) {
        console.error(error);
    }
};

// Deletes a single expense by its ID
const DeleteSingleExpenses = async (id) => {
    try {
        const [rows] = await pool.query(`DELETE FROM expenses WHERE id = ?`, [id]);
        return rows;
    } catch (error) {
        console.error(error);
    }
};

// Calculates the total expenses for the current month for a specific user
const TotalExpenses = async (id) => {
    try {
        const [rows] = await pool.query(`
            SELECT SUM(amount) AS total_expenses
            FROM expenses
            WHERE YEAR(date) = YEAR(CURDATE()) AND MONTH(date) = MONTH(CURDATE()) AND user_id = ?;
        `, [id]);
        return rows[0].total_expenses || 0;
    } catch (error) {
        console.error(error);
    }
};

// Retrieves the total amount of expenses for the current month for a specific user
const MonthlyExpenses = async (id) => {
    try {
        const [rows] = await pool.query(`
            SELECT SUM(amount) AS total_expenses
            FROM expenses
            WHERE YEAR(date) = YEAR(CURDATE()) AND MONTH(date) = MONTH(CURDATE()) AND user_id = ?;
        `, [id]);
        return rows[0].total_expenses || 0;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    DeleteAllExpenses,
    DeleteSingleExpenses,
    AddExpenses,
    GetAllExpenses,
    GetSingleExpenses,
    TotalExpenses,
    MonthlyExpenses
};
