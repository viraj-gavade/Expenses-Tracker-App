const {LoginUser,SignUpUser } = require('../Database/database.users')
const { GetAllExpenses,TotalExpenses ,MonthlyExpenses } = require('../Database/database.expenses')

const asyncHandler = require('../utils/asyncHandler')

const CustomApiError = require('../utils/CustomApiError')

const ApiResponse = require('../utils/CustomApiResponse')



const loginuser = asyncHandler(async(req,res)=>{
    const { username , password,email } = req.body
    if((!(username || email) || !password)){
        
          throw new CustomApiError(
                400,
                'Please provide all the required field'
            )
        
    }
    const user = await LoginUser(username,password,email)
    if(!user){
        throw new CustomApiError(
            400,
            'Incorrect Username and Password Combination!'
        )
    }
    console.log(user.id)
    const expenses = await GetAllExpenses(user.id)
    const total_expenses = await TotalExpenses()
    const monthly_expenses = await MonthlyExpenses()
    console.log(user)
    return res.render('home',{
        user:user,
        expenses:expenses,
      total_expenses:total_expenses,
      monthly_expenses:monthly_expenses
    })
})

const signupuser = asyncHandler(async(req,res)=>{
    const { username , password , email } = req.body
    const user = await SignUpUser(username,email,password)
})


module.exports ={
    loginuser,
    signupuser
}
