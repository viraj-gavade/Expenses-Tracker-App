const express = require('express')
const UserRouter = express.Router()

const { loginuser ,signupuser}  = require('../Controllers/users.controller')


UserRouter.route('/signup').post(signupuser).get((req,res)=>{
    res.render('signup')
})
UserRouter.route('/signin').post(loginuser).get((req,res)=>{
    res.render('signin')
})




module.exports = UserRouter