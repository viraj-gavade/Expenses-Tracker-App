require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import express framework
const OauthRouter = express.Router(); // Create a new router for OAuth routes
const passport = require('passport'); // Import Passport.js for authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Import Google OAuth2 strategy from Passport
const session = require('express-session'); // Import session middleware
const { AddUser, Existing_User, Existing_UserByemail, findUserByemail, findUser } = require('../Database/database.users'); // Import database functions for user management
const { GetAllExpenses, TotalExpenses, MonthlyExpenses } = require('../Database/database.expenses'); // Import expense-related functions
const jwt = require('jsonwebtoken'); // Import JWT for generating access tokens

// Google OAuth strategy configuration
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID, // Client ID from Google Developer Console
    clientSecret: process.env.CLIENT_SECRET, // Client Secret from Google Developer Console
    callbackURL: process.env.CALLBACK_URL // URL to redirect to after Google authentication
  }, (accessToken, refreshToken, profile, done) => {
      console.log(accessToken); // Log access token received from Google
    // Proceed with profile
    return done(null, profile); // Pass the profile information to done() to continue authentication
  })
);

console.log('Client ID:', process.env.CLIENT_ID); // Log the client ID (for debugging)
console.log('Client Secret:', process.env.CLIENT_SECRET); // Log the client secret (for debugging)
console.log('Callback URL:', process.env.CALLBACK_URL); // Log the callback URL (for debugging)

// Serialize user info into session
passport.serializeUser((user, done) => {
  console.log('Serialize User:', user); // Log the user being serialized
  done(null, user); // Store the user in the session
});

// Deserialize user info from session
passport.deserializeUser((user, done) => {
  console.log('Deserialize User:', user); // Log the user being deserialized
  done(null, user); // Fetch user information from session
});

// Initiate Google OAuth flow
OauthRouter.get('/auth/google', async (req, res, next) => {
  console.log('Initiating Google OAuth flow'); // Log that OAuth flow is starting
  next(); // Proceed to the next middleware (passport.authenticate)
}, passport.authenticate('google', { scope: ['profile', 'email'] })); // Request Google OAuth with profile and email permissions

// Google OAuth callback route
OauthRouter.get('/auth/google/callback', async (req, res, next) => {
  console.log('Google OAuth callback triggered'); // Log that the callback route was triggered
  next(); // Proceed to the next middleware
}, passport.authenticate('google', { failureRedirect: '/' }), async (req, res) => {
    console.log('Google OAuth Success - Redirecting to Profile'); // Log success after OAuth
    console.log('Logged In User Profile:', req.user); // Log the authenticated user's profile

    const name = req.user.displayName; // Extract the user's display name
    const Useremail = req.user._json.email; // Extract the user's email

    console.log(`Name: ${name}`); // Log the user's name
    console.log(`Email: ${Useremail}`); // Log the user's email

    const Existing_User = await findUserByemail(name); // Check if the user already exists in the database
    console.log(Existing_User); // Log existing user details

    if (Existing_User===null) {
        // If the user does not exist, add them to the database
        const user = await AddUser(name, Useremail); 
        console.log(user); // Log the result of the user addition
        const { insertId } = user;
        console.log(insertId); // Log the new user's ID

        const GetUser = await findUser(insertId); // Fetch the user from the database
        console.log(GetUser.id); // Log the user's ID

        const id = GetUser.id;
        const username = GetUser.username;
        console.log(id, username); // Log the user ID and username

        // Generate refresh and access tokens
        const refreshToken = jwt.sign({
            id: GetUser.id,
            username: GetUser.username
        }, process.env.REFRESH_TOKEN_SECRETE, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        });

        const accessToken = jwt.sign({
            id: GetUser.id,
            username: GetUser.username,
            email: GetUser.email
        }, process.env.ACCESS_TOKEN_SECRETE, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        });

        // Set the cookies and redirect to the expenses page
        return res.cookie('accessToken', accessToken).cookie('refreshToken', refreshToken).redirect('/api/v1/expenses');
    }

    // If the user exists, generate tokens and log them in
    const refreshToken = jwt.sign({
        id: Existing_User.id,
        username: Existing_User.name
    }, process.env.REFRESH_TOKEN_SECRETE, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });

    const accessToken = jwt.sign({
        id: Existing_User.id,
        username: Existing_User.username,
        email: Existing_User.email
    }, process.env.ACCESS_TOKEN_SECRETE, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });

    // Set the cookies and redirect to the expenses page
    return res.cookie('accessToken', accessToken).cookie('refreshToken', refreshToken).redirect('/api/v1/expenses');
});



module.exports = OauthRouter; // Export the router
