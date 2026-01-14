-- 1. Create the schema
CREATE SCHEMA IF NOT EXISTS project_shoppingcart;

-- 2. Enable UUID extension (required for the 'newid()' equivalent)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. Create the Product table
CREATE TABLE project_shoppingcart."Product" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "ProductName" VARCHAR(100) NOT NULL,
    "ProductGender" VARCHAR(50),
    "ProductImageUri" VARCHAR(256) NOT NULL,
    "ProductPrice" NUMERIC(19,4) NOT NULL,
    "ProductDesc" VARCHAR(1024),
    "TimeStamp" BYTEA -- PostgreSQL equivalent for rowversion/timestamp
);

-- 4. Create the WebUser table
CREATE TABLE project_shoppingcart."WebUser" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "UserEmail" VARCHAR(100) NOT NULL,
    "UserName" VARCHAR(100) NOT NULL,
    "UserPassword" VARCHAR(100) NOT NULL,
    "UserFirstName" VARCHAR(100),
    "UserLastName" VARCHAR(100),
    "UserCity" VARCHAR(100),
    "UserStreet" VARCHAR(256),
    "UserNumber" INT,
    "UserZip" VARCHAR(6),
    "UserPhone" VARCHAR(12),
    "TimeStamp" BYTEA
);

-- 5. Insert data into Product table from JSON
INSERT INTO project_shoppingcart."Product" 
    ("Id", "ProductName", "ProductGender", "ProductImageUri", "ProductPrice", "ProductDesc")
VALUES
    ('5ec01827-05f5-4b2e-8182-0df0237f7123', 'Mens Cotton Jacket', 'Male', 'https://storage.googleapis.com/shopping-cart-bucket/images/71li-ujtlUL._AC_UX679_.jpg', 55.9900, 'great outerwear jackets for Spring/Autumn/Winter...'),
    ('b0fc5f90-8d19-4a76-82af-18a2e62ee7c9', 'Mens Casual Slim Fit', 'Male', 'https://storage.googleapis.com/shopping-cart-bucket/images/71YXzeOuslL._AC_UY879_.jpg', 15.9900, 'The color could be slightly different between on the screen and in practice...'),
    ('c627d933-4e99-4e71-bef8-1b98fa4ed3a3', 'John Hardy Women''s Legends Naga Gold & Silver Dragon Station Chain Bracelet', 'Female', 'https://storage.googleapis.com/shopping-cart-bucket/images/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg', 695.0000, 'From our Legends Collection, the Naga was inspired by the mythical water dragon...'),
    ('8290e499-3620-4ddd-b35a-1d14622e9408', 'Solid Gold Petite Micropave', 'Uni', 'https://storage.googleapis.com/shopping-cart-bucket/images/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg', 168.0000, 'Satisfaction Guaranteed. Return or exchange any order within 30 days...'),
    ('f1521477-e014-4a72-886b-2e6177a292a9', 'White Gold Plated Princess', 'Uni', 'https://storage.googleapis.com/shopping-cart-bucket/images/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg', 9.9900, 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her...'),
    ('9fc8fdb0-f6e9-41a1-930e-6b44d88f4d40', 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 'Uni', 'https://storage.googleapis.com/shopping-cart-bucket/images/81fPKd-2AYL._AC_SL1500_.jpg', 109.9500, 'Your perfect pack for everyday use and walks in the forest...'),
    ('48049677-934f-43cc-889e-6ebc302da66c', 'Mens Casual Premium Slim Fit T-Shirts', 'Male', 'https://storage.googleapis.com/shopping-cart-bucket/images/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', 22.3000, 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket...'),
    ('259788bc-670b-4237-98d4-88d3d6865071', 'BIYLACLESEN Women''s 3-in-1 Snowboard Jacket Winter Coats', 'Female', 'https://storage.googleapis.com/shopping-cart-bucket/images/51Y5NI-I5jL._AC_UX679_.jpg', 56.9900, 'Note:The Jackets is US standard size, Please choose size as your usual wear...'),
    ('af5e0d86-b194-442b-8eb6-8ca8b45e7333', 'Lock and Love Women''s Removable Hooded Faux Leather Moto Biker Jacket', 'Female', 'https://storage.googleapis.com/shopping-cart-bucket/images/81XH0e8fefL._AC_UY879_.jpg', 29.9500, 'cool jacket'),
    ('2734fd4e-8e98-4be1-8e5a-9a7e9904d7af', 'Rain Jacket Women Windbreaker Striped Climbing Raincoats', 'Female', 'https://storage.googleapis.com/shopping-cart-bucket/images/71HblAHs5xL._AC_UY879_-2.jpg', 39.9900, 'cool jacket as well'),
    ('ebb2c9fa-65a3-4167-bd49-a563490f4569', 'MBJ Women''s Solid Short Sleeve Boat Neck V', 'Female', 'https://storage.googleapis.com/shopping-cart-bucket/images/71z3kpMAYsL._AC_UY879_.jpg', 9.8500, 'badass t-shirt'),
    ('2f0e43f7-739a-4366-b85e-a79bd5755d55', 'Pierced Owl Rose Gold Plated Stainless Steel Double', 'Uni', 'https://storage.googleapis.com/shopping-cart-bucket/images/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg', 10.9900, 'Rose Gold Plated Double Flared Tunnel Plug Earrings.'),
    ('1ae71303-dd3c-414d-91ae-b606d2019d97', 'Opna Women''s Short Sleeve Moisture', 'Female', 'https://storage.googleapis.com/shopping-cart-bucket/images/51eg55uWmdL._AC_UX679_.jpg', 9.9500, '100% Polyester, Machine wash, 100% cationic polyester interlock...'),
    ('ff2181da-dde9-4e5e-8dd6-c6c571831063', 'DANVOUY Womens T Shirt Casual Cotton Short', 'Female', 'https://storage.googleapis.com/shopping-cart-bucket/images/61pHAEJ4NML._AC_UX679_.jpg', 12.9900, '95%Cotton,5%Spandex, Features: Casual, Short Sleeve...');