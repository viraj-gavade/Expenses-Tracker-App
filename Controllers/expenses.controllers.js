const {
  DeleteAllExpenses, 
  AddExpenses, 
  GetSingleExpenses, 
  DeleteSingleExpenses, 
  TotalExpenses 
} = require('../Database/database.expenses');  // Importing expense-related query functions from the database

const asyncHandler = require('../utils/asyncHandler'); // AsyncHandler to manage errors in asynchronous operations
const CustomApiError = require('../utils/CustomApiError'); // Custom API Error for consistent error handling
const ApiResponse = require('../utils/CustomApiResponse'); // Custom API Response for standardized API responses

// Controller function to fetch a single expense by ExpenseId for a specific user
const getsingleexpense = asyncHandler(async (req, res) => {
  try {
      const { id } = req.params;

      // Validate if the ExpenseId is provided
      if (!id) {
          throw new CustomApiError(404, 'Id Not Found!');
      }

      // Retrieve the expense from the database
      const expenses = await GetSingleExpenses(id);
      if (!expenses) {
          throw new CustomApiError(404, `There is no expense with Id: ${id}`);
      }

      // Respond with the retrieved expense data
      return res.status(200).json(
          new ApiResponse(200, 'Single Expense fetched successfully!', expenses)
      );
  } catch (error) {
    throw new Error(error.message);
  }
});

// Controller function to add an expense to the database for a specific user
const addexpense = asyncHandler(async (req, res) => {
  try {
      console.log(req.user);

      const id = req.user.id;
      const { title, amount, category } = req.body;

      // Validate that all fields are provided
      if (!(title && amount && category)) {
          throw new CustomApiError(400, 'All fields must be provided!');
      }

      // Add the expense to the database
      const expense = await AddExpenses(title, amount, category, id);
      if (!expense) {
          throw new CustomApiError(404, 'Error adding the expense!');
      }

      // Respond with success message and expense details
      return res.status(200).json(
          new ApiResponse(200, 'Expense added successfully!', expense)
      );
  } catch (error) {
    console.log(error);
    throw new CustomApiError(error);
  }
});

// Controller function to delete all expenses for a specific user
const deleteallexpense = asyncHandler(async (req, res) => {
  try {
      const expense = await DeleteAllExpenses();

      // Respond with success message after deleting all expenses
      return res.status(200).json(
          new ApiResponse(200, 'All expenses deleted successfully!')
      );
  } catch (error) {
    console.log(error);
    throw new CustomApiError(error);
  }
});

// Controller function to delete a single expense by ExpenseId for a specific user
const deletesingleexpense = asyncHandler(async (req, res) => {
  try {
      const { id } = req.params;

      // Validate if the ExpenseId is provided
      if (!id) {
        throw new CustomApiError(404, 'Id not found!');
      }

      // Delete the specified expense from the database
      const expense = await DeleteSingleExpenses(id);

      // Respond with success message after deleting the expense
      return res.status(200).json(
        new ApiResponse(200, 'Expense deleted successfully!')
      );
  } catch (error) {
    console.log(error);
    throw new CustomApiError(error);
  }
});

// Exporting all the functions
module.exports = {
    deletesingleexpense,
    deleteallexpense,
    addexpense,
    getsingleexpense,
};
