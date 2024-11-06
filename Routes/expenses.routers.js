const express = require('express'); // Import the express library
const { 
    getallexpenses, 
    gettotalexpense, 
    deleteallexpense, 
    addexpense, 
    getsingleexpense, 
    deletesingleexpense, 
    sortexpenses 
} = require('../Controllers/expenses.controllers'); // Import controller functions for handling expenses
const ExpenseRouter = express.Router(); // Create a new Router instance for the expenses routes
const VerifyJwt = require('../Middlewares/Auth'); // Import middleware to verify JWT tokens
const { GetAllExpenses, TotalExpenses, MonthlyExpenses } = require('../Database/database.expenses'); // Import database functions to interact with the expenses table
const { findUser } = require('../Database/database.users'); // Import function to find a user in the database

// Route to handle fetching all expenses, adding an expense, and deleting all expenses
ExpenseRouter.route('/expenses')
    .get(VerifyJwt, async (req, res) => {
        try {
            // Fetching expenses data for the logged-in user (from the JWT token)
            console.log('Req user id ', req.user.id); // Log the user's ID (for debugging)
            
            // Fetch all expenses, total expenses, and monthly expenses
            const expenses = await GetAllExpenses(req.user.id); // Get all expenses for the user
            const total_expenses = await TotalExpenses(req.user.id); // Get total expenses for the current year and month
            const monthly_expenses = await MonthlyExpenses(req.user.id); // Get the monthly expenses for the user
            const user = await findUser(req.user.id); // Get the user details

            // Render the 'home' page with the fetched data
            return res.render('home', { expenses, total_expenses, monthly_expenses, user });
        } catch (error) {
            // Catch and log errors during the process
            console.error('Error fetching expenses:', error);
            return res.status(500).send('Internal Server Error'); // Respond with a 500 error if something goes wrong
        }
    })
    .delete(VerifyJwt, deleteallexpense) // Route for deleting all expenses, protected by JWT verification
    .post(VerifyJwt, addexpense); // Route for adding a new expense, protected by JWT verification

// Route for handling a single expense: fetch a specific expense or delete it
ExpenseRouter.route('/expenses/:id')
    .get(getsingleexpense) // Get a single expense by ID
    .delete(deletesingleexpense); // Delete a single expense by ID

// Export the ExpenseRouter for use in the main app
module.exports = ExpenseRouter;
