DROP TABLE orderdetails;
DROP TABLE cart;
DROP TABLE orders;
DROP TABLE products;
DROP TABLE customers;

CREATE TABLE products (
    productid SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    price DECIMAL(10, 2) NOT NULL,
    stockquantity INT NOT NULL
);

CREATE TABLE customers (
    customerid SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    postalcode VARCHAR(20),
    country VARCHAR(100)
);

CREATE TABLE orders (
    orderid SERIAL PRIMARY KEY,
    customerid INT,
    orderdate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    totalamount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customerid) REFERENCES customers(customerid)
);

CREATE TABLE orderdetails (
    orderdetailid SERIAL PRIMARY KEY,
    orderid INT,
    productid INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (orderid) REFERENCES orders(orderid),
    FOREIGN KEY (productid) REFERENCES products(productid)
);

CREATE TABLE cart (
    cartid SERIAL PRIMARY KEY,
    customerid INT,
    productid INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customerid) REFERENCES customers(customerid),
    FOREIGN KEY (productid) REFERENCES products(productid)
);