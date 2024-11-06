const express = require('express'); // Importing the express framework
const UserRouter = express.Router(); // Create a new router instance for user-related routes

// Importing the controller functions for handling user actions
const { loginuser, signupuser, SignOut } = require('../Controllers/users.controller');

// Route for user signup
UserRouter.route('/signup')
  .post(signupuser) // Handle POST request for signup, using the signupuser controller function
  .get((req, res) => { 
    res.render('signup'); // Render the signup page for GET requests
  });

// Route for user signin
UserRouter.route('/signin')
  .post(loginuser) // Handle POST request for login, using the loginuser controller function
  .get((req, res) => { 
    res.render('signin'); // Render the signin page for GET requests
  });

// Route for user signout
UserRouter.route('/signout')
  .get(SignOut); // Handle GET request for signout, using the SignOut controller function

module.exports = UserRouter; // Export the UserRouter for use in the main app
