-- Tasks Table
CREATE TABLE tasks(
  id integer primary key autoincrement,
  title varchar(255) NOT NULL,
  completed boolean DEFAULT 0
);

-- Users Table
CREATE TABLE users(
  id integer PRIMARY KEY autoincrement,
  email varchar(255) NOT NULL,
  encrypted_password varchar(255) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);

-- UNIQUE INDEX ON users.email
CREATE UNIQUE INDEX idx_email ON users (email);
