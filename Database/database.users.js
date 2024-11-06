require('dotenv').config();
const mysql = require('mysql2');
const bcryptjs = require('bcryptjs');
const { GetAllExpenses } = require('./database.expenses');

// Setting up a MySQL connection pool for optimized database interactions
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// Function to handle user login by validating credentials
const LoginUser = async (username, Userpassword, email = '') => {
    const [user] = await pool.query(`
        SELECT * FROM users
        WHERE username = ? OR email = ?`, [username, email]);
    
    if (user.length === 0) {
        return null; // Return null if user does not exist
    }
    
    const [{ password }] = user; // Extracts the stored password
    const is_Match = await bcryptjs.compare(Userpassword, password); // Validates the password
    
    if (!is_Match) {
        return null; // Return null if password does not match
    }

    return user[0]; // Returns the user data if login is successful
};

// Function to handle user registration by hashing the password and storing user info
const SignUpUser = async (username, email, password) => {
    const salt = await bcryptjs.genSalt(16); // Generate a salt for hashing
    const Hashed_Password = await bcryptjs.hash(password, salt); // Hash the password with the salt
    const [user] = await pool.query(`
        INSERT INTO users (username, email, password) 
        VALUES (?, ?, ?)`, [username, email, Hashed_Password]);

    return user[0]; // Returns newly created user data
};

// Function to find a user by their unique ID
const findUser = async (id) => {
    const [user] = await pool.query(`
        SELECT * FROM users
        WHERE id = ?`, [id]);

    return user[0]; // Returns the user data if found
};

// Function to find a user by their email
const findUserByemail = async (name) => {
    const [user] = await pool.query(`
        SELECT * FROM users
        WHERE username = ?`, [name]);

        return user.length > 0 ? user[0] : null;  // Returns the user data if found
};

// Function to add a new user with a username and email (for cases where password is not required)
const AddUser = async (username, email) => {
    const [user] = await pool.query(`
        INSERT INTO users (username, email) 
        VALUES (?, ?)`, [username, email]);

    return user; // Returns the user data after insertion
};

module.exports = {
    LoginUser,
    SignUpUser,
    findUser,
    AddUser,
    findUserByemail
};
