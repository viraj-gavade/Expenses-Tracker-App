require('dotenv').config()
const mysql = require('mysql2')
const bcryptjs  = require('bcryptjs');
const { GetAllExpenses } = require('./database.expenses');
console.log('Database Host:', process.env.DATABASE_HOST);
console.log('Database User:', process.env.DATABASE_USER);
console.log('Database Password:', process.env.DATABASE_PASSWORD);
console.log('Database Name:', process.env.DB_NAME);
const pool = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT

}).promise()



const LoginUser = async (username , Userpassword ,email='') =>{

    const [user] = await pool.query(`SELECT * FROM users
        WHERE username =? OR email = ?`,[username,email])
        // console.log(user)
        const [{ password }] = user
        // console.log(password)
        console.log(Userpassword)
    const is_Match =await bcryptjs.compare(Userpassword,password)
    console.log(is_Match)
    if(!is_Match){
        console.log('incorrect password')
    }
    // console.log(user)
    return user[0]
    
}

const SignUpUser = async ( username , email , password )=>{
    const salt = await bcryptjs.genSalt(16)
    const Hashed_Password = await bcryptjs.hash(password,salt)
    const [user] = await pool.query(`INSERT INTO users (username, email, password) VALUES 
(?, ?, ?);
`,[username,email,Hashed_Password])
        console.log(user)
    return user[0]
}

const findUser = async (id ) =>{
    
    const [user] =  await pool.query(`
        SELECT * FROM users
        Where id =?

        `,[id])
        // console.log(user)
        return user[0]
}

const findUserByemail = async (username ) =>{
    const [user] =  await pool.query(`
        SELECT * FROM users
        Where username =?
        `,[username])
        // console.log(user)
        return user[0]
}

const AddUser = async ( username , email) =>{
    const [user]= await pool.query(`INSERT INTO users (username, email) VALUES 
(?, ?);
`,[username,email])
        console.log(user)
    return user
}
findUserByemail('gavadeviraj9@gmail.com')
module.exports ={
    LoginUser,
    SignUpUser,
    findUser,
    AddUser,
    findUserByemail

}
