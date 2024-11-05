const express  = require('express')
const { getallexpenses, gettotalexpense,deleteallexpense, addexpense, getsingleexpense, deletesingleexpense, sortexpenses } = require('../Controllers/expenses.controllers')
const ExpenseRouter = express.Router()
const VerifyJwt = require('../Middlewares/Auth')
const { GetAllExpenses,TotalExpenses,MonthlyExpenses }  = require('../Database/database.expenses')
const { findUser } = require('../Database/database.users')

ExpenseRouter.route('/expenses',).get(VerifyJwt,async(req,res)=>{
    try {

        // Fetch all expenses from the database
        try {
            console.log(req.user)
            const [{id}] = req.user
             const { sortBy , order } = req.query
             const expenses = await GetAllExpenses(sortBy,order)
             const total_expenses = await TotalExpenses()
             const monthly_expenses = await MonthlyExpenses()
             const user = await findUser(req.user.id)
             if(!expenses){
                throw new CustomApiError(
                    404,
                    'Expenses Not Found!'
                )
             }
            
             res.render('home', { expenses ,total_expenses,monthly_expenses,user});
           } catch (error) {
             throw new Error(error)
           } // Assuming you have user ID from the JWT
        // Render the home page with the expenses data
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).send('Internal Server Error');
    }
    res.render('home')
})
.delete(VerifyJwt,deleteallexpense)
.post(VerifyJwt,addexpense)


ExpenseRouter.route('/expenses/:id').get(getsingleexpense).delete(deletesingleexpense)
ExpenseRouter.route('/expenses/total').get(gettotalexpense)






module.exports = ExpenseRouter