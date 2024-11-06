const {
    LoginUser,
    SignUpUser 
} = require('../Database/database.users'); // Importing user-related query functions from the database

const { 
    GetAllExpenses,
    TotalExpenses,
    MonthlyExpenses
} = require('../Database/database.expenses'); // Importing expense-related query functions for homepage data rendering

const asyncHandler = require('../utils/asyncHandler'); // AsyncHandler to manage errors in asynchronous operations
const CustomApiError = require('../utils/CustomApiError'); // Custom API Error for consistent error handling
const ApiResponse = require('../utils/CustomApiResponse'); // Custom API Response for standardized responses

const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for user authentication and token management

// The loginuser function handles user login by verifying credentials and generating JWT tokens. Upon successful login, it retrieves the user’s expenses, sets tokens as cookies, and redirects to the expenses page.
const loginuser = asyncHandler(async(req, res) => {
    const { username, password, email } = req.body;

    // Validate if either username or email and password are provided
    if (!(username || email) || !password) {
        throw new CustomApiError(400, 'Please provide all required fields');
    }

    // Verify user credentials
    const user = await LoginUser(username, password, email);
    if (!user) {
        throw new CustomApiError(400, 'Incorrect Username and Password Combination!');
    }

    // Generate JWT tokens for session management
    const refreshToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.REFRESH_TOKEN_SECRETE,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    const accessToken = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.ACCESS_TOKEN_SECRETE,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    // Retrieve user's expense details
    const expenses = await GetAllExpenses(user.id);
    const total_expenses = await TotalExpenses(user.id);
    const monthly_expenses = await MonthlyExpenses(user.id);

    // Set tokens as cookies and redirect to the expenses page
    return res
        .cookie('accessToken', accessToken)
        .cookie('refreshToken', refreshToken)
        .redirect('/api/v1/expenses');
});

// The signupuser function handles user registration by validating required fields. If successful, it creates a new user account and renders the sign-in page.
const signupuser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    // Ensure all required fields are present
    if (!username || !password || !email) {
        throw new CustomApiError(400, 'All fields must be provided!');
    }

    // Register a new user
    const user = await SignUpUser(username, email, password);

    // Redirect to sign-in page post successful signup
    return res.render('signin');
});

// The SignOut function clears authentication cookies and redirects the user to the sign-in page, ending the session.
const SignOut = asyncHandler(async (req, res) => {
    try {
        // Clear access and refresh token cookies
        res.clearCookie('accessToken', { path: '/' });
        res.clearCookie('refreshToken', { path: '/' });

        // Redirect to the sign-in page
        return res.status(303).redirect('http://localhost:3000/api/v1/user/signin');
    } catch (error) {
        console.error('Error signing out:', error);
        res.status(500).json({ message: 'Error signing out' });
    }
});

module.exports = {
    loginuser,
    signupuser,
    SignOut
};
