require("dotenv").config()

const path = require('path')
const express = require('express')
const ExpenseRouter = require("./Routes/expenses.routers")
const UserRouter = require("./Routes/users.routers")
const cookieParser = require('cookie-parser');
const cors = require('cors')


const app = express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('public'));
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))
app.use(cookieParser());
app.use(cors())


app.get('/',(req,res)=>{
    return res.render('home')
})

app.use('/api/v1',ExpenseRouter)
app.use('/api/v1/user', UserRouter);


const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log('Server is running on port:-',port)
})