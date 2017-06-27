bamazonSeeds

create database bamazon;

USE bamazon;

create table products(
id INTEGER(11)AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NULL,
department_name VARCHAR (100) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INTEGER(11) NULL,
PRIMARY KEY(id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE("apples", "produce", 0.50, 10000), ("toothpaste", "healthcare", 1.00, 400),
("candles", "household supplies", 4.50, 2000), ("firestick", "electronics", 45.00, 85),
("bluetooth_speakers", "electronics", 50.00, 900), ("4k_tv", "electronics", 788.98, 300),
("dog_bowl", "pet_care", 5.15, 2000), ("dog_bed", "pet_care", 22.55, 700),
("dog_chew_toy", "pet_care", 11.35, 00), ("bamazon_beckon", "electronics", 149.98, 5000);

