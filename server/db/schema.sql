-- Tasks Table
CREATE TABLE tasks(
  id integer primary key autoincrement,
  title text NOT NULL,
  completed boolean DEFAULT 0,
  created_at text NOT NULL,
  updated_at text,
  due_at text
);

-- Users Table
CREATE TABLE users(
  id integer PRIMARY KEY autoincrement,
  email text NOT NULL,
  encrypted_password text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  session_token text,
  reset_password_token text,
  created_at text NOT NULL,
  updated_at text
);

-- UNIQUE INDEX ON users.email
CREATE UNIQUE INDEX idx_email ON users (email);
CREATE UNIQUE INDEX idx_session_token ON users (email);
