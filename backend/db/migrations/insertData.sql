-- Insert initial categories
INSERT INTO category (name) VALUES ('Dogs'), ('Cats'), ('Birds')
ON CONFLICT DO NOTHING;

-- Insert a test pet
INSERT INTO pet (category_id, name, status, photoUrls) VALUES
(1, 'Buddy', 'available', '{"/uploads/buddy1.jpg","/uploads/buddy2.png"}')
ON CONFLICT DO NOTHING;

-- Insert a test user
INSERT INTO users (username, firstName, lastName, email, password, phone)
VALUES ('john_doe', 'John', 'Doe', 'john@example.com', '123456', '123456789')
ON CONFLICT DO NOTHING;
