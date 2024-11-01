const express  = require('express')
const { GetAllExpenses, DeleteAllExpenses, AddExpenses, GetSingleExpenses, DeleteSingleExpenses, SortExpenses } = require('../database')

const ExpenseRouter = express.Router()

ExpenseRouter.route('/expenses')
.get(GetAllExpenses)
.delete(DeleteAllExpenses)
.post(AddExpenses)


ExpenseRouter.route('/expenses/:id').get(GetSingleExpenses).delete(DeleteSingleExpenses)

ExpenseRouter.route('/expenses/sorted').get(SortExpenses)


module.exports = ExpenseRouter