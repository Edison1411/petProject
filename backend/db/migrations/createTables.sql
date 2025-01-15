-- Categories
CREATE TABLE IF NOT EXISTS category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Pets
CREATE TABLE IF NOT EXISTS pet (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES category(id),
  name VARCHAR(100) NOT NULL,
  status VARCHAR(50),
  photoUrls TEXT[]
);

-- Tags
CREATE TABLE IF NOT EXISTS tag (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  firstName VARCHAR(50),
  lastName VARCHAR(50),
  email VARCHAR(100),
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  userStatus INT DEFAULT 0
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  petId INT REFERENCES pet(id),
  quantity INT,
  shipDate TIMESTAMP,
  status VARCHAR(50),
  complete BOOLEAN DEFAULT FALSE
);
