-- Tasks Table
CREATE TABLE tasks(
  id integer primary key autoincrement,
  title varchar(255) NOT NULL,
  completed boolean DEFAULT 0,
  created_at VARCHAR(255) NOT NULL,
  updated_at VARCHAR(255),
  due_at VARCHAR(255)
);

-- Users Table
CREATE TABLE users(
  id integer PRIMARY KEY autoincrement,
  email varchar(255) NOT NULL,
  encrypted_password varchar(255) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  session_token varchar(255),
  reset_password_token varchar(255),
  created_at VARCHAR(255) NOT NULL,
  updated_at VARCHAR(255)
);

-- UNIQUE INDEX ON users.email
CREATE UNIQUE INDEX idx_email ON users (email);
CREATE UNIQUE INDEX idx_session_token ON users (email);
