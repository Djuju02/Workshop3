INSERT INTO products (name, description, price, stockquantity) VALUES
('T-shirt', 'T-shirt en coton de haute qualité', 19.99, 100),
('Jeans', 'Jeans décontractés pour hommes', 29.99, 50),
('Robe', 'Robe élégante pour femmes', 39.99, 30),
('Chaussures de sport', 'Chaussures de course légères', 49.99, 80);


INSERT INTO customers (FirstName, LastName, Email, Address, City, PostalCode, Country) VALUES
('Jean', 'Dupont', 'jean.dupont@example.com', '123 rue de la République', 'Paris', '75001', 'France'),
('Marie', 'Dubois', 'marie.dubois@example.com', '456 avenue des Champs-Élysées', 'Paris', '75008', 'France'),
('John', 'Smith', 'john.smith@example.com', '789 Main Street', 'New York', '10001', 'USA'),
('Emma', 'Johnson', 'emma.johnson@example.com', '456 Elm Street', 'Los Angeles', '90001', 'USA');


INSERT INTO orders (CustomerID, TotalAmount) VALUES
(1, 79.97),
(2, 109.97),
(3, 99.98),
(4, 69.98);


INSERT INTO orderdetails (OrderID, ProductID, Quantity, Price) VALUES
(1, 1, 2, 39.98),
(2, 2, 3, 89.97),
(3, 3, 1, 39.99),
(4, 4, 1, 49.99),
(4, 1, 1, 19.99);