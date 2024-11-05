const express  = require('express')
const { getallexpenses, gettotalexpense,deleteallexpense, addexpense, getsingleexpense, deletesingleexpense, sortexpenses } = require('../Controllers/expenses.controllers')
const ExpenseRouter = express.Router()
const VerifyJwt = require('../Middlewares/Auth')


ExpenseRouter.route('/expenses')
.get(VerifyJwt,getallexpenses)
.delete(VerifyJwt,deleteallexpense)
.post(VerifyJwt,addexpense)


ExpenseRouter.route('/expenses/:id').get(getsingleexpense).delete(deletesingleexpense)
ExpenseRouter.route('/expenses/total').get(gettotalexpense)






module.exports = ExpenseRouter