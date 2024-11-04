const express = require('express')
const UserRouter = express.Router()

const { loginuser }  = require('../Controllers/users.controller')


UserRouter.route('/signup').get((req,res)=>{
    res.render('signup')
})
UserRouter.route('/signin').post(loginuser).get((req,res)=>{
    res.render('signin')
})




module.exports = UserRouter