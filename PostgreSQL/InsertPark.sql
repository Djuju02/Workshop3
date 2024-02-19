INSERT INTO products (name, description, price, stockquantity) VALUES
('T-shirt', 'T-shirt en coton de haute qualité', 19.99, 100),
('Jeans', 'Jeans décontractés pour hommes', 29.99, 50),
('Robe', 'Robe élégante pour femmes', 39.99, 30),
('Pantalon', 'Pantalon noir cargo', 59.99, 60),
('Chaussures de sport', 'Chaussures de course légères', 49.99, 80);


INSERT INTO customers (firstname, lastname, email, address, city, postalcode, country) VALUES
('Jean', 'Dupont', 'jean.dupont@example.com', '123 rue de la République', 'Paris', '75001', 'France'),
('Marie', 'Dubois', 'marie.dubois@example.com', '456 avenue des Champs-Élysées', 'Paris', '75008', 'France'),
('John', 'Smith', 'john.smith@example.com', '789 Main Street', 'New York', '10001', 'USA'),
('Emma', 'Johnson', 'emma.johnson@example.com', '456 Elm Street', 'Los Angeles', '90001', 'USA');


INSERT INTO orders (customerid, products) VALUES
(1, '[{"productid": 1, "quantity": 2}, {"productid": 2, "quantity": 5}]'),
(2, '[{"productid": 3, "quantity": 1}, {"productid": 4, "quantity": 6}]'),
(3, '[{"productid": 2, "quantity": 3}]'),
(4, '[{"productid": 1, "quantity": 1}, {"productid": 2, "quantity": 3}, {"productid": 4, "quantity": 6}]');

INSERT INTO cart (customerid, sel_product, total) VALUES
(1, '[{"productid": 5, "quantity": 1}, {"productid": 1, "quantity": 2}]', 89.97),
(2, '[{"productid": 2, "quantity": 1}, {"productid": 3, "quantity": 1}]', 69.98),
(3, '[{"productid": 4, "quantity": 1}, {"productid": 1, "quantity": 3}]', 119.96),
(4, '[{"productid": 2, "quantity": 2}, {"productid": 5, "quantity": 2}]', 179.96),
(3, '[{"productid": 3, "quantity": 1}, {"productid": 4, "quantity": 1}]', 89.98);