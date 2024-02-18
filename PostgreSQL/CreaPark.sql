DROP TABLE OrderDetails;
DROP TABLE Orders;
DROP TABLE Products;
DROP TABLE Customers;

CREATE TABLE Products (
    ProductID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description VARCHAR(500),
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT NOT NULL
);

CREATE TABLE Customers (
    CustomerID SERIAL PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Address VARCHAR(255),
    City VARCHAR(100),
    PostalCode VARCHAR(20),
    Country VARCHAR(100)
);

CREATE TABLE Orders (
    OrderID SERIAL PRIMARY KEY,
    CustomerID INT,
    OrderDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE OrderDetails (
    OrderDetailID SERIAL PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);