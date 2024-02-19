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
	products JSONB,
	total_price DECIMAL(10, 2),
    orderdate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	status VARCHAR(50) DEFAULT 'Waiting for delivery',
    FOREIGN KEY (customerid) REFERENCES customers(customerid)
);

CREATE TABLE cart (
    cartid SERIAL PRIMARY KEY,
    customerid INT,
    sel_product JSONB,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customerid) REFERENCES customers(customerid)
);