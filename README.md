# BlogApi

#Articles table
CREATE TABLE IF NOT EXISTS articles ( id INT AUTO_INCREMENT PRIMARY KEY, author VARCHAR(50) NOT NULL, category VARCHAR(50) NOT NULL, title VARCHAR(50) NOT NULL, description text not null, userId INT NOT NULL, FOREIGN KEY (userId) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )
