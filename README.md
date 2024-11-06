<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>Expense-Tracker-App</title>
    <style>
        html {
            scroll-behavior: smooth;
        }
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 4px;
        }
        .code-block {
            background-color: #f4f4f4;
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
        }
    </style>
</head>
<body>

<h1 style="color: #333;">Expense-Tracker-App</h1>

<h2 style="color: #555;">Overview</h2>
<p>The Expense Tracker is a comprehensive web application designed to help users manage their personal finances effectively. It provides a simple yet powerful interface for recording and analyzing both income and expenses, making financial management accessible to everyone. Built with Node.js and MySQL, it offers robust data management and reliable performance.</p>

<h2 style="color: #555;">Table of Contents</h2>
<ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#technologies-used">Technologies Used</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#api-documentation">API Documentation</a></li>
    <li><a href="#database-schema">Database Schema</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
</ul>

<h2 id="features" style="color: #555;">Features</h2>
<ul>
    <li><strong>User Authentication</strong>
        <ul>
            <li>Secure login via Google OAuth2</li>
            <li>Protected routes and user-specific data</li>
        </ul>
    </li>
    <li><strong>Transaction Management</strong>
        <ul>
            <li>Add, edit, and delete income/expense records</li>
            <li>Categorize transactions (groceries, rent, entertainment, etc.)</li>
            <li>Add notes and descriptions to transactions</li>
        </ul>
    </li>
    <li><strong>Transaction History</strong>
        <ul>
            <li>Comprehensive list of all transactions</li>
            <li>Filter by category, date range, and transaction type</li>
            <li>Sort transactions by amount, date, or category</li>
        </ul>
    </li>
    <li><strong>Financial Reports</strong>
        <ul>
            <li>Generate monthly and yearly summaries</li>
            <li>Analyze spending patterns</li>
            <li>Visual representations of financial data</li>
        </ul>
    </li>
</ul>

<h2 id="technologies-used" style="color: #555;">Technologies Used</h2>
<h3>Backend</h3>
<ul>
    <li>Node.js and Express for server-side development</li>
    <li>MySQL for database management</li>
    <li>Sequelize ORM for database operations</li>
    <li>Google OAuth2 for authentication</li>
</ul>

<h2 id="installation" style="color: #555;">Installation</h2>
<ol>
    <li>Clone the repository:<br>
        <div class="code-block">git clone https://github.com/viraj-gavade/Expenses-Tracker-App.git</div>
    </li>
    <li>Navigate to the project directory:<br>
        <div class="code-block">cd Expenses-Tracker-App</div>
    </li>
    <li>Install dependencies:<br>
        <div class="code-block">npm install</div>
    </li>
    <li>Set up environment variables (create a <code>.env</code> file):<br>
        <div class="code-block">
        DB_HOST=your_mysql_host<br>
        DB_USER=your_mysql_username<br>
        DB_PASSWORD=your_mysql_password<br>
        DB_NAME=expense_tracker<br>
        GOOGLE_CLIENT_ID=your_google_oauth2_client_id<br>
        GOOGLE_CLIENT_SECRET=your_google_oauth2_client_secret
        </div>
    </li>
    <li>Set up the MySQL database:<br>
        <div class="code-block">
        mysql -u root -p<br>
        CREATE DATABASE expense_tracker;<br>
        USE expense_tracker;
        </div>
    </li>
</ol>

<h2 id="database-schema" style="color: #555;">Database Schema</h2>
<h3>Users Table</h3>
<div class="code-block">
CREATE TABLE users (<br>
    id INT PRIMARY KEY AUTO_INCREMENT,<br>
    google_id VARCHAR(255) UNIQUE NOT NULL,<br>
    name VARCHAR(255) NOT NULL,<br>
    email VARCHAR(255) UNIQUE NOT NULL,<br>
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP<br>
);
</div>

<h3>Transactions Table</h3>
<div class="code-block">
CREATE TABLE transactions (<br>
    id INT PRIMARY KEY AUTO_INCREMENT,<br>
    user_id INT NOT NULL,<br>
    type ENUM('income', 'expense') NOT NULL,<br>
    amount DECIMAL(10,2) NOT NULL,<br>
    category VARCHAR(100) NOT NULL,<br>
    description TEXT,<br>
    date DATE NOT NULL,<br>
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,<br>
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE<br>
);
</div>

<h2 id="usage" style="color: #555;">Usage</h2>
<ol>
    <li>Start the development server:<br>
        <div class="code-block">npm start</div>
    </li>
    <li>Access the application at <code>http://localhost:PORT</code></li>
</ol>

<h2 id="api-documentation" style="color: #555;">API Documentation</h2>
<h3>Authentication Endpoints</h3>
<ul>
    <li><code>POST /login</code> - Authenticate user via Google OAuth2</li>
    <li><code>GET /auth/google/callback</code> - OAuth2 callback handler</li>
    <li><code>POST /logout</code> - End user session</li>
</ul>

<h3>Transaction Endpoints</h3>
<ul>
    <li><code>GET /transactions</code> - Retrieve all user transactions</li>
    <li><code>POST /add-expense</code> - Add new expense/income</li>
    <li><code>PUT /update-expense/:id</code> - Update existing transaction</li>
    <li><code>DELETE /delete-expense/:id</code> - Delete transaction</li>
    <li><code>GET /report</code> - Generate financial reports</li>
</ul>

<h2 id="contributing" style="color: #555;">Contributing</h2>
<p>Contributions are welcome! Please follow these steps:</p>
<ol>
    <li>Fork the repository</li>
    <li>Create a feature branch:<br>
        <div class="code-block">git checkout -b feature/your-feature-name</div>
    </li>
    <li>Commit your changes:<br>
        <div class="code-block">git commit -m 'Add some feature'</div>
    </li>
    <li>Push to your fork:<br>
        <div class="code-block">git push origin feature/your-feature-name</div>
    </li>
    <li>Create a Pull Request</li>
</ol>

<h2 id="license" style="color: #555;">License</h2>
<p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

<h2 id="contact" style="color: #555;">Contact</h2>
<p>Viraj Gavade<br>
Email: <a href="mailto:vrajgavade17@gmail.com">vrajgavade17@gmail.com</a><br>
GitHub: <a href="https://github.com/viraj-gavade"><i class="fab fa-github"></i> viraj-gavade</a></p>

</body>
</html>
