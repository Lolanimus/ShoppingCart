const urls = ["https://fakestoreapi.com/products/1", "https://fakestoreapi.com/products/5", "https://fakestoreapi.com/products/15"];

const contents = [
    {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: {
            rate: 3.9,
            count: 120
        }
    },
    {
        id: 5,
        title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        price: 695,
        description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
        category: 'jewelery',
        image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
        rating: { 
            rate: 4.6, count: 400 
        }
    },
    {
        id: 15,
        title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
        price: 56.99,
        description: 'Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates',
        category: "women's clothing",
        image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
        rating: { 
            rate: 2.6, 
            count: 235 
        }
    }
];

export {
    urls,
    contents
}