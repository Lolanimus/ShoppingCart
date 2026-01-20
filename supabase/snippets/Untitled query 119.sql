-- 1. Ensure the schema exists
CREATE SCHEMA IF NOT EXISTS project_shoppingcart;
CREATE TABLE IF NOT EXISTS project_shoppingcart."Product" (
    "Id" UUID PRIMARY KEY,
    "ProductName" VARCHAR(100) NOT NULL,
    "ProductGender" VARCHAR(50),
    "ProductImageUri" VARCHAR(256) NOT NULL,
    "ProductPrice" NUMERIC(19, 4) NOT NULL,
    "ProductDesc" VARCHAR(1024),
    "CreatedAt" TIMESTAMPTZ DEFAULT NOW()
);
-- 2. Use the full path with quotes to avoid "relation does not exist"
INSERT INTO project_shoppingcart."Product" (
    "Id", 
    "ProductName", 
    "ProductGender", 
    "ProductImageUri", 
    "ProductPrice", 
    "ProductDesc"
) VALUES
('5ec01827-05f5-4b2e-8182-0df0237f7123', 'Mens Cotton Jacket', 'Male', 'https://storage.googleapis.com/shopping-cart-bucket/images/71li-ujtlUL._AC_UX679_.jpg', 55.99, 'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.'),
('b0fc5f90-8d19-4a76-82af-18a2e62ee7c9', 'Mens Casual Slim Fit', 'Male', 'https://storage.googleapis.com/shopping-cart-bucket/images/71YXzeOuslL._AC_UY879_.jpg', 15.99, 'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.'),
('c627d933-4e99-4e71-bef8-1b98fa4ed3a3', 'John Hardy Women''s Legends Naga Gold & Silver Dragon Station Chain Bracelet', 'Female', 'https://storage.googleapis.com/shopping-cart-bucket/images/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg', 695.00, 'From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean''s pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.'),
('8290e499-3620-4ddd-b35a-1d14622e9408', 'Solid Gold Petite Micropave', 'Uni', 'https://storage.googleapis.com/shopping-cart-bucket/images/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg', 168.00, 'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.'),
('f1521477-e014-4a72-886b-2e6177a292a9', 'White Gold Plated Princess', 'Uni', 'https://storage.googleapis.com/shopping-cart-bucket/images/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg', 9.99, 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine''s Day...'),
('9fc8fdb0-f6e9-41a1-930e-6b44d88f4d40', 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 'Uni', 'https://storage.googleapis.com/shopping-cart-bucket/images/81fPKd-2AYL._AC_SL1500_.jpg', 109.95, 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday'),
('48049677-934f-43cc-889e-6ebc302da66c', 'Mens Casual Premium Slim Fit T-Shirts', 'Male', 'https://storage.googleapis.com/shopping-cart-bucket/images/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', 22.30, 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.'),
('259788bc-670b-4237-98d4-88d3d6865071', 'BIYLACLESEN Women''s 3-in-1 Snowboard Jacket Winter Coats', 'Female', 'https://storage.googleapis.com/shopping-cart-bucket/images/51Y5NI-I5jL._AC_UX679_.jpg', 56.99, 'Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates'),
('af5e0d86-b194-442b-8eb6-8ca8b45e7333', 'Lock and Love Women''s Removable Hooded Faux Leather Moto Biker Jacket', 'Female', 'https://storage.googleapis.com/shopping-cart-bucket/images/81XH0e8fefL._AC_UY879_.jpg', 29.95, 'cool jacket'),
('2734fd4e-8e98-4be1-8e5a-9a7e9904d7af', 'Rain Jacket Women Windbreaker Striped Climbing Raincoats', 'Female', 'https://storage.googleapis.com/shopping-cart-bucket/images/71HblAHs5xL._AC_UY879_-2.jpg', 39.99, 'cool jacket as well'),
('ebb2c9fa-65a3-4167-bd49-a563490f4569', 'MBJ Women''s Solid Short Sleeve Boat Neck V', 'Female', 'https://storage.googleapis.com/shopping-cart-bucket/images/71z3kpMAYsL._AC_UY879_.jpg', 9.85, 'badass t-shirt'),
('2f0e43f7-739a-4366-b85e-a79bd5755d55', 'Pierced Owl Rose Gold Plated Stainless Steel Double', 'Uni', 'https://storage.googleapis.com/shopping-cart-bucket/images/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg', 10.99, 'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel'),
('1ae71303-dd3c-414d-91ae-b606d2019d97', 'Opna Women''s Short Sleeve Moisture', 'Female', 'https://storage.googleapis.com/shopping-cart-bucket/images/51eg55uWmdL._AC_UX679_.jpg', 9.95, '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort.'),
('ff2181da-dde9-4e5e-8dd6-c6c571831063', 'DANVOUY Womens T Shirt Casual Cotton Short', 'Female', 'https://storage.googleapis.com/shopping-cart-bucket/images/61pHAEJ4NML._AC_UX679_.jpg', 12.99, '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.');