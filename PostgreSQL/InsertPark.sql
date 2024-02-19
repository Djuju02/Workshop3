INSERT INTO products (name, description, price, stockquantity) VALUES
('T-shirt', 'T-shirt en coton de haute qualité', 19.99, 100),
('Jeans', 'Jeans décontractés pour hommes', 29.99, 50),
('Robe', 'Robe élégante pour femmes', 39.99, 30),
('Chaussures de sport', 'Chaussures de course légères', 49.99, 80);


INSERT INTO customers (firstname, lastname, email, address, city, postalcode, country) VALUES
('Jean', 'Dupont', 'jean.dupont@example.com', '123 rue de la République', 'Paris', '75001', 'France'),
('Marie', 'Dubois', 'marie.dubois@example.com', '456 avenue des Champs-Élysées', 'Paris', '75008', 'France'),
('John', 'Smith', 'john.smith@example.com', '789 Main Street', 'New York', '10001', 'USA'),
('Emma', 'Johnson', 'emma.johnson@example.com', '456 Elm Street', 'Los Angeles', '90001', 'USA');


INSERT INTO orders (customerid) VALUES
(1),
(2),
(3),
(4);


INSERT INTO orderdetails (orderid, productid, quantity, price) VALUES
(1, 1, 2, 39.98),
(2, 2, 3, 89.97),
(3, 3, 1, 39.99),
(4, 4, 1, 49.99),
(4, 1, 1, 19.99);

INSERT INTO cart (customerid, productid, quantity, price) VALUES
(1, 1, 2, 39.98),
(2, 2, 3, 89.97),
(3, 3, 1, 39.99),
(4, 4, 1, 49.99),
(1, 2, 1, 29.99);