CREATE DATABASE GroceryApp;

use GroceryApp;

CREATE TABLE GroceryApp.Product(
   id int not null auto_increment primary key,
   name varchar(255) not null,
   brand varchar(100) not null,
   barcode BIGINT(12),
   currency varchar(3),
   price decimal(10,2),
   created_by varchar(100) not null,
   created_at TIMESTAMP not null,
   last_updated_by varchar(100),
   last_updated_at TIMESTAMP
);

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Electronic Piano Keyboard with AC Adaptor','Yamaha',123456789101,'USD', 1223.95,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('61-Key Digital Piano','Yamaha',123456789102,'MYR', 2526.42,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('2 Tier Door Rack','Fujicom',123456789103,'USD', 83.32,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Height Adjustable Double Garment Rack','Fujicom',123456789104,'MYR', 42.82,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Cooler Bag','Fujicom',123456789105,'USD', 24.28,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Power Banks','Xiaomi',123456789106,'MYR', 35.82,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('MacBook Air','Apple',123456789107,'USD', 2247.74,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Air Cooler(15L)','Midea',123456789108,'MYR', 1042.86,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Phone Wall Chargers','Lenovo',123456789109,'USD', 23.73,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('OnePlus 5T 8GB RAM','Oneplus',123456789110,'MYR', 2693.82,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Monitor','Samsung',123456789111,'USD', 500.72,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Router','Tp-Link',123456789112,'MYR', 13.26,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Original car charger','Oneplus',123456789113,'USD', 23.83,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Electric Guitar','Yamaha',123456789114,'MYR', 2351.86,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Airconditioner','Panasonic',123456789115,'USD', 925.67,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Phonecase','Samsung',123456789116,'MYR', 23.54,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Drum set Kit','Sonor',123456789117,'USD', 723.52,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Guitar Effects Processor','Boss',123456789118,'MYR', 152.95,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Dell Latitude E5420 Intel core i5','Dell',123456789119,'USD', 532.43,'admin', now());

insert into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES ('Foldable Keyboards MIDI 88 Key','OEM',123456789120,'MYR', 142.54,'admin', now());