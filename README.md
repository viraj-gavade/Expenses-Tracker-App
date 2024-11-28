# Expense Tracker App

## Overview

Expense Tracker is a comprehensive web application designed to help users manage their personal finances effectively. Built with Node.js and MySQL, the application provides a robust and user-friendly platform for tracking income and expenses.

## 🌟 Features

### User Authentication
- Secure login via Google OAuth2
- Protected routes and user-specific data management

### Transaction Management
- Add, edit, and delete income/expense records
- Categorize transactions (e.g., groceries, rent, entertainment)
- Add detailed notes and descriptions
- Comprehensive transaction history with filtering and sorting options

### Financial Insights
- Generate monthly and yearly financial summaries
- Analyze spending patterns
- Visual representations of financial data

## 🛠 Technologies Used

### Backend
- Node.js
- Express.js
- MySQL
- Sequelize ORM
- Google OAuth2

## 🚀 Getting Started

### Prerequisites
- Node.js
- MySQL
- Google OAuth2 Credentials

### Installation

1. Clone the repository
```bash
git clone https://github.com/viraj-gavade/Expenses-Tracker-App.git
cd Expenses-Tracker-App
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file with the following variables:
```
DB_HOST=your_mysql_host
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=expense_tracker
GOOGLE_CLIENT_ID=your_google_oauth2_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth2_client_secret
```

4. Set up MySQL database
```bash
mysql -u root -p
CREATE DATABASE expense_tracker;
USE expense_tracker;
```

5. Start the development server
```bash
npm start
```

Access the application at `http://localhost:PORT`

## 📦 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type ENUM('income', 'expense') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🌐 API Endpoints

### Authentication
- `POST /login`: Authenticate via Google OAuth2
- `GET /auth/google/callback`: OAuth2 callback handler
- `POST /logout`: End user session

### Transactions
- `GET /transactions`: Retrieve all user transactions
- `POST /add-expense`: Add new expense/income
- `PUT /update-expense/:id`: Update existing transaction
- `DELETE /delete-expense/:id`: Delete transaction
- `GET /report`: Generate financial reports

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📧 Contact

Viraj Gavade
- Email: vrajgavade17@gmail.com
- GitHub: [@viraj-gavade](https://github.com/viraj-gavade)
