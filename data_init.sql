/* Initialize DB*/
CREATE DATABASE florapro;

/* Connect to DB*/
\c florapro;

/* Make tables*/
CREATE TABLE users
(
  id SERIAL NOT NULL PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  username text NOT NULL unique,
  email text NOT NULL unique,
  password_digest text,
  birth_date date,
  date_registered datetime,
);

CREATE TABLE gut_data
(
  id SERIAL NOT NULL PRIMARY KEY,
  user_id integer REFERENCES users(id),
  test_data text,
)
