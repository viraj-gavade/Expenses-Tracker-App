const express  = require('express')
const { getallexpenses, deleteallexpense, addexpense, getsingleexpense, deletesingleexpense, sortexpenses } = require('../Controllers/expenses.controllers')
const ExpenseRouter = express.Router()

ExpenseRouter.route('/expenses')
.get(getallexpenses)
.delete(deleteallexpense)
.post(addexpense)


ExpenseRouter.route('/expenses/:id').get(getsingleexpense).delete(deletesingleexpense)

ExpenseRouter.route('/expenses/sorted').get(sortexpenses)


module.exports = ExpenseRouter