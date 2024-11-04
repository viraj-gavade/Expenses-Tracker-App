const express = require('express')
const UserRouter = express.Router()


UserRouter.route('/signup').get((req,res)=>{
    res.render('signup')
})
UserRouter.route('/signin').get((req,res)=>{
    res.render('signin')
})




module.exports = UserRouter