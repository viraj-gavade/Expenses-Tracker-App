const {LoginUser,SignUpUser } = require('../Database/database.users')

const asyncHandler = require('../utils/asyncHandler')

const CustomApiError = require('../utils/CustomApiError')

const ApiResponse = require('../utils/CustomApiResponse')

const loginuser = asyncHandler(async(req,res)=>{
    const { username , password,email } = req.body

    const user = await LoginUser(username,password,email)
    console.log(user)

})

const signupuser = asyncHandler(async(req,res)=>{
    const { username , password , email } = req.body
    const user = await SignUpUser(username,email,password)
    console.log(user)
})


module.exports ={
    loginuser
}
