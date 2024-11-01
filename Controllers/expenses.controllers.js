const { GetAllExpenses, DeleteAllExpenses, AddExpenses, GetSingleExpenses, DeleteSingleExpenses, SortExpenses } = require('../database')

const asyncHandler = require('../utils/asyncHandler')


const getallexpenses = asyncHandler(async (req,res)=>{
    const { sortBy , order } = req.query
    console.log(sortBy,order)
    const result = await GetAllExpenses(sortBy,order)
    res.status(200).json(result)
})

const getsingleexpense = asyncHandler(async (req,res)=>{
    const { id } = req.params
    const result = await GetSingleExpenses(id)
    res.status(200).json(result)
})


const addexpense = asyncHandler(async (req,res)=>{
    const { title , amount ,category } = req.body
    const result = await AddExpenses(title,amount,category)
    res.status(200).json(result)
})

const deleteallexpense = asyncHandler(async (req,res)=>{
    
    const result = await DeleteAllExpenses()
    res.status(200).json(result)
})

const deletesingleexpense = asyncHandler( async (req,res)=>{
    const { id } = req.params
    const result = await DeleteSingleExpenses(id)
    res.status(200).json(result)
})




module.exports = {
    getallexpenses,
    deletesingleexpense,
    deleteallexpense,
    addexpense,
    sortexpenses,
    getsingleexpense
}