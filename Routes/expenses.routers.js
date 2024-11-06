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
            console.log('Req user id ',req.user.id)
            // const [{id}] = req.user
            //  const { sortBy , order } = req.query
             const expenses = await GetAllExpenses(req.user.id)
             const total_expenses = await TotalExpenses(req.user.id)
             const monthly_expenses = await MonthlyExpenses(req.user.id)
             const user = await findUser(req.user.id)
            return res.render('home', { expenses ,total_expenses,monthly_expenses,user});
           } catch (error) {
             throw new Error(error)
           } // Assuming you have user ID from the JWT
        // Render the home page with the expenses data
    } catch (error) {
        console.error('Error fetching expenses:', error);
       return res.status(500).send('Internal Server Error');
    }
   return res.render('home')
})
.delete(VerifyJwt,deleteallexpense)
.post(VerifyJwt,addexpense)


ExpenseRouter.route('/expenses/:id').get(getsingleexpense).delete(deletesingleexpense)
ExpenseRouter.route('/expenses/total').get(gettotalexpense)






module.exports = ExpenseRouter