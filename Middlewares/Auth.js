const CustomApiError = require("../utils/CustomApiError")
const jwt = require('jsonwebtoken')
const {findUser} = require('../Database/database.users')
const asyncHandler = require('../utils/asyncHandler')


const VerifyJwt = asyncHandler (async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ','')
        // console.log(token)

        if(!token){
            throw new CustomApiError(401,'Unauthorized Request')
        }

        const decodedtoken =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRETE)

        const user = await findUser(decodedtoken.id)

        if(!user){
            throw new CustomApiError(401,'Invalid Access Token!')
        }
        req.user = user
        // console.log(user)
        next()
        
    } catch (error) {
        console.log(error)
        throw new CustomApiError(401,error?.messsage || 'Invalid access')
    }
})


module.exports = VerifyJwt