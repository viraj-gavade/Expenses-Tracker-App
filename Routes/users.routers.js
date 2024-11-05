const express = require('express')
const UserRouter = express.Router()

const { loginuser ,signupuser,SignOut}  = require('../Controllers/users.controller')


UserRouter.route('/signup').post(signupuser).get((req,res)=>{
    res.render('signup')
})
UserRouter.route('/signin').post(loginuser).get((req,res)=>{
    res.render('signin')
})
UserRouter.route('/signout').get(SignOut)




module.exports = UserRouter