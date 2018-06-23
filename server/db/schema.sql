-- Tasks
CREATE TABLE tasks(
  id integer primary key autoincrement,
  title varchar(255) NOT NULL,
  completed boolean DEFAULT 0
);

-- Users
-- CREATE TABLE users(
--   id: int,
--   email: varchar(255),
--   encrypted_password: varchar(255)
-- )
