require("dotenv").config(); // Loads environment variables from a .env file
const path = require('path'); // Module to work with file and directory paths
const express = require('express'); // Express framework for building the server
const ExpenseRouter = require("./Routes/expenses.routers"); // Import Expense routes
const UserRouter = require("./Routes/users.routers"); // Import User routes
const cookieParser = require('cookie-parser'); // Middleware to parse cookies
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const passport = require('passport'); // Passport for handling authentication
const session = require('express-session'); // Middleware to handle sessions
const OauthRouter = require('./Routes/Oauth2.routers'); // Import OAuth routes
const { ApolloServer } = require('@apollo/server'); // Apollo Server for GraphQL
const { expressMiddleware } = require('@apollo/server/express4'); // Express middleware for Apollo Server

const app = express(); // Initialize express app

// Middleware to parse URL-encoded bodies (form submissions) and JSON requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files (e.g., images, stylesheets) from the "public" folder
app.use(express.static('public'));

// Set EJS as the template engine for rendering views
app.set('view engine', 'ejs');

// Set the views directory for EJS to use
app.set('views', path.resolve('./views'));

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Enable CORS for cross-origin requests (needed if frontend and backend are on different domains)
app.use(cors());

// Session configuration for maintaining user sessions
app.use(session({
    secret: process.env.SECRETE, // Secret key for encrypting session data
    resave: false, // Don't save session if it's not modified
    saveUninitialized: true // Save a session even if it's uninitialized (for new users)
}));

// Default route for the home page
app.get('/', (req, res) => {
    return res.render('home'); // Render the "home" EJS template
});

// Use routers for handling requests to the API
app.use('/api/v1', ExpenseRouter); // Expense-related routes
app.use('/api/v1/user', UserRouter); // User-related routes

// Initialize Passport.js for user authentication
app.use(passport.initialize());
app.use(passport.session());

// Use OAuth routes for handling third-party authentication (e.g., Google)
app.use('/', OauthRouter);

const port = process.env.PORT || 3000; // Use port from environment variable or default to 3000

// Start the Express server
app.listen(port, () => {
    console.log('Server is running on port:', port); // Log when the server is running
});
