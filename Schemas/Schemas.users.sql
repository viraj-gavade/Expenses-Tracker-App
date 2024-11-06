CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    date DATE DEFAULT CURDATE(),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
