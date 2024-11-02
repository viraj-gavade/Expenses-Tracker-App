const { GetAllExpenses, DeleteAllExpenses, AddExpenses, GetSingleExpenses, DeleteSingleExpenses, SortExpenses } = require('../Database/database.expenses')

const asyncHandler = require('../utils/asyncHandler')

const CustomApiError = require('../utils/CustomApiError')

const ApiResponse = require('../utils/CustomApiResponse')



const getallexpenses = asyncHandler(async (req,res)=>{
   try {
     const { sortBy , order } = req.query
     console.log(sortBy,order)
     const expenses = await GetAllExpenses(sortBy,order)
     if(!expenses){
        throw new CustomApiError(
            404,
            'Expenses Not Found!'
        )
     }
     return res.status(200).json(
        new ApiResponse(
            200,
            'Expenses fetched Sucessfully!',
            expenses
        )
     )
   } catch (error) {
     throw new Error(error)
   }
})

const getsingleexpense = asyncHandler(async (req,res)=>{
    const { id } = req.params
    if(!id){
        throw CustomApiError(
            404,
            'Id Not Found!'
        )
    }
    const expenses = await GetSingleExpenses(id)
    if(!expenses){
        throw CustomApiError(
            404,
            'There is no such expense with Id:-',id
        )
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            'Single Expense fetched successfully!',
            expenses
        )
    )
    
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
    getsingleexpense
}