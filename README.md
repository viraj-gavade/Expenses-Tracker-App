<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expenses Tracker App</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        header {
            background-color: #333;
            color: white;
            padding: 1rem;
            text-align: center;
        }
        .container {
            padding: 2rem;
        }
        h1, h2 {
            color: #333;
        }
        ul {
            list-style-type: none;
        }
        li {
            margin: 0.5rem 0;
        }
        code {
            font-family: 'Courier New', monospace;
        }
        .feature-list, .tech-list {
            padding-left: 20px;
        }
        footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 1rem;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
        a {
            color: #0066cc;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

<header>
    <h1>Expenses Tracker App</h1>
</header>

<div class="container">
    <h2>Description</h2>
    <p>The **Expenses Tracker App** helps users track and manage their daily expenses. It offers features like expense categorization, budget management, and user authentication, all built using SQL for data storage and Node.js for backend services.</p>

    <h2>Features</h2>
    <ul class="feature-list">
        <li>User authentication and authorization</li>
        <li>Add, update, delete, and view expenses</li>
        <li>Expense categorization (e.g., food, transport)</li>
        <li>Budget tracking and management</li>
    </ul>

    <h2>Technologies Used</h2>
    <ul class="tech-list">
        <li>Node.js</li>
        <li>Express.js</li>
        <li>MySQL</li>
        <li>JWT for secure authentication</li>
        <li>Sequelize ORM</li>
    </ul>

    <h2>Installation</h2>
    <ol>
        <li>Clone the repository:
            <code>git clone https://github.com/viraj-gavade/Expenses-Tracker-App.git</code>
        </li>
        <li>Navigate to the project directory:
            <code>cd Expenses-Tracker-App</code>
        </li>
        <li>Install dependencies:
            <code>npm install</code>
        </li>
        <li>Set up environment variables:
            <pre>
            DB_HOST=your_database_host
            DB_USER=your_database_user
            DB_PASS=your_database_password
            DB_NAME=your_database_name
            JWT_SECRET=your_jwt_secret
            </pre>
        </li>
    </ol>

    <h2>Usage</h2>
    <ol>
        <li>Start the server:
            <code>npm start</code>
        </li>
        <li>Access the app at <code>http://localhost:PORT</code></li>
    </ol>

    <h2>API Documentation</h2>
    <p>For detailed API documentation, refer to the official API docs.</p>

    <h2>Contributing</h2>
    <p>Contributions are welcome! Please follow these steps:</p>
    <ol>
        <li>Fork the repository.</li>
        <li>Create a new branch.</li>
        <li>Make your changes and commit them.</li>
        <li>Push to your fork and create a pull request.</li>
    </ol>

    <h2>License</h2>
    <p>This project is licensed under the MIT License.</p>

    <h2>Contact</h2>
    <p>Viraj Gavade<br>
       Email: <a href="mailto:vrajgavade17@gmail.com">vrajgavade17@gmail.com</a><br>
       GitHub: <a href="https://github.com/viraj-gavade">viraj-gavade</a>
    </p>
</div>

<footer>
    <p>&copy; 2024 Viraj Gavade</p>
</footer>

</body>
</html>
