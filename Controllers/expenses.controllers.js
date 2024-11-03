const { json } = require('express')
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
    //  return res.status(200).json(
    //     new ApiResponse(
    //         200,
    //         'Expenses fetched Sucessfully!',
    //         expenses
    //     )
    //  )
    return res.render('home.ejs',{
      expenses:expenses
    })
   } catch (error) {
     throw new Error(error)
   }
})

const getsingleexpense = asyncHandler(async (req,res)=>{
  try {
      const { id } = req.params
      if(!id){
          throw new 
          CustomApiError(
              404,
              'Id Not Found!'
          )
      }
      const expenses = await GetSingleExpenses(id)
      if(!expenses){
          throw new CustomApiError(
              404,
              `There is no such expense with Id:- ${id}`
          )
      }
      return res.status(200).json(
          new ApiResponse(
              200,
              'Single Expense fetched successfully!',
              expenses
          )
      )
  } catch (error) {
    throw new Error(error)
  }
    
})


const addexpense = asyncHandler(async (req,res)=>{
  try {
      const { title , amount ,category } = req.body
      if(!(title || amount || category)){
          throw new CustomApiError(
              400,
              'All fields must be provided!'
          )
      }
      const expense = await AddExpenses(title,amount,category)
      if(!expense){
          throw new 
          CustomApiError(
              404,
              'Something went wrong while adding the expense!'
          )
      }
      return res.status(200).json(
          new ApiResponse(
              200,
              'Expense added sucessfully!',
              expense
          )
      )
  } catch (error) {
    console.log(error)
    throw new CustomApiError(error)
  }
})

const deleteallexpense = asyncHandler(async (req,res)=>{
    
  try {
      const expense = await DeleteAllExpenses()
      if(!expense){
        throw new 
        CustomApiError(
            404,
            'Something went wrong while adding the expense!'
        )
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            "All expenses deleted successfully!"
        )
    )
  } catch (error) {
    throw new CustomApiError(error)
  }
})

const deletesingleexpense = asyncHandler( async (req,res)=>{
  try {
      const { id } = req.params
      if(!id){
        throw new CustomApiError(
            404,
            'Id not found!'
        )
      }
      const expense = await DeleteSingleExpenses(id)
      return res.status(200).json(
        new ApiResponse(
            200,
            'Expense deleted successfully!'
        )
      )
  } catch (error) {
    console.log(error)
    throw new CustomApiError(error)
  }
})




module.exports = {
    getallexpenses,
    deletesingleexpense,
    deleteallexpense,
    addexpense,
    getsingleexpense
}