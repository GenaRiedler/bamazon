create database bamazonDB;
use bamazonDB;

create table products (
    item_id int not null auto_increment primary key,
    product_name varchar(30),
    department_name varchar(30),
    price decimal(10,2) not null,
    stock_qty int not null
);

insert into products (product_name, department_name, price, stock_qty)
values ("Pixie Stix", "Candy Store", 10.99, 54),
("Gobstoppers", "Candy Store", 6.99, 36),
("Charleston Chew", "Candy Store", 8.89, 67),
("Chick-O-Stick", "Candy Store", 7.95, 43),
("Abba-Zaba", "Candy Store", 14.99, 78),
("Prismacolor Colored Pencils", "Art Store", 25.99, 85),
("Watercolor Paint Set", "Art Store", 19.99, 98),
("Oil Pastels", "Art Store", 15.99, 39),
("Canson Sketch Pad", "Art Store", 6.99, 26),
("8x10 Canvas Panels", "Art Store", 11.99, 56);
