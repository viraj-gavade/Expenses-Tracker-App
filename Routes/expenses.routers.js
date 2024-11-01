const express  = require('express')
const { getallexpenses } = require('../Controllers/expenses.controllers')
const ExpenseRouter = express.Router()

ExpenseRouter.route('/expenses')
.get(getallexpenses)
// .delete(DeleteAllExpenses)
// .post(AddExpenses)


// ExpenseRouter.route('/expenses/:id').get(GetSingleExpenses).delete(DeleteSingleExpenses)

// ExpenseRouter.route('/expenses/sorted').get(SortExpenses)


module.exports = ExpenseRouter