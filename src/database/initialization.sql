DROP DATABASE IF EXISTS simli_test;

CREATE DATABASE simli_test;

USE simli_test;

CREATE TABLE user (
  id INT(10) UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  password_hash VARCHAR(500) NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone_number VARCHAR(50),
  birth VARCHAR(50),
  address VARCHAR(50)
);