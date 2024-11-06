
require('dotenv').config();
const express = require('express');
const OauthRouter = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const { AddUser, Existing_User, Existing_UserByemail, findUserByemail, findUser } = require('../Database/database.users');
const { GetAllExpenses,TotalExpenses ,MonthlyExpenses } = require('../Database/database.expenses')
const jwt = require('jsonwebtoken')

// Google OAuth strategy configuration
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  }, (accessToken, refreshToken, profile, done) => {
      console.log(accessToken)
    // Proceed with profile
    return done(null, profile);
  })
);
console.log('Client ID:', process.env.CLIENT_ID);
console.log('Client Secret:', process.env.CLIENT_SECRET);
console.log('Callback URL:', process.env.CALLBACK_URL);

// Serialize user info into session
passport.serializeUser((user, done) => {
  console.log('Serialize User:', user);
  done(null, user);
});

// Deserialize user info from session
passport.deserializeUser((user, done) => {
  console.log('Deserialize User:', user);
  done(null, user);
});

// Initiate Google OAuth flow
OauthRouter.get('/auth/google', async(req, res, next) => {
  console.log('Initiating Google OAuth flow');
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
OauthRouter.get('/auth/google/callback',async (req, res, next) => {

  console.log('Google OAuth callback triggered');
  next();
}, passport.authenticate('google', { failureRedirect: '/' }),
  async(req, res) => {
    console.log('Google OAuth Success - Redirecting to Profile');
    console.log('Logged In User Profile:', req.user);
     // Log profile after successful authentication
     const name = req.user.displayName; // You can also use profile.name.givenName for first name
     // Extract email from the _json property or emails array
     const Useremail = req.user._json.email; 
   
   console.log(`Name: ${name}`);
   console.log(`Email: ${Useremail}`); // Log user profile info
   const Existing_User = await findUserByemail(Useremail)
   console.log(Existing_User)
   if(Existing_User.length == 0 ){
    const user = await AddUser(name,Useremail)
    console.log(user)
    const {insertId} = user
    console.log(insertId)
    const GetUser = await findUser(insertId)
    console.log(GetUser.id)

    const id = GetUser.id;
  const username = GetUser.username;
  console.log(id,username)
    const refreshToken = jwt.sign({
        id:GetUser.id, 
        username:GetUser.username 
    },process.env.REFRESH_TOKEN_SECRETE,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
  
  const accessToken = jwt.sign({
    id:GetUser.id ,
    username:GetUser.username,
    email:GetUser.email
  },process.env.ACCESS_TOKEN_SECRETE,
  {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  }
  )
  
    return res.cookie('accessToken',accessToken).cookie('refreshToken',refreshToken).redirect('/api/v1/expenses')
   }
     const refreshToken = jwt.sign({
         id:Existing_User.id,
         username:Existing_User.name
     },process.env.REFRESH_TOKEN_SECRETE,
     {
         expiresIn:process.env.REFRESH_TOKEN_EXPIRY
     }
   )
   
   const accessToken = jwt.sign({
     id:Existing_User.id,
     username:Existing_User.username,
     email:Existing_User.email
   },process.env.ACCESS_TOKEN_SECRETE,
   {
     expiresIn:process.env.ACCESS_TOKEN_EXPIRY
   }
   )

     return res.cookie('accessToken',accessToken).cookie('refreshToken',refreshToken).redirect('/api/v1/expenses')

   
  }
     
);

// Debug route
OauthRouter.get('/signin', (req, res) => {
  res.send("Debug Statement");
});

// Protected profile route
OauthRouter.get('/profile', async (req, res) => {
  if (req.isAuthenticated()) {
    console.log('User is authenticated, rendering profile');
    console.log('Authenticated User Profile:', req.user);
    return res.status(200).render('home')

  } else {
    console.log('User is not authenticated, redirecting to home');
    res.redirect('');
  }
});

module.exports = OauthRouter;
