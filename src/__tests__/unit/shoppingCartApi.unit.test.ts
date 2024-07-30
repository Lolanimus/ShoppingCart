import { getCatalog} from "../../shoppingCartApi";
import { describe, expect, it } from 'vitest';

// basically mocking
const catalog = [
    {
        id: 1,
        title: "kesha",
        price: 100,
        description: "kesha",
        category: "men's clothing",
        image: "cla",
        rating: { rate: 2, count: 5},
    },
    {
        id: 15,
        title: "kesha",
        price: 100,
        description: "kesha",
        category: "women's clothing",
        image: "cla",
        rating: { rate: 2, count: 5},
    },
    {
        id: 2,
        title: "kesha",
        price: 100,
        description: "kesha",
        category: "jewelry",
        image: "cla",
        rating: { rate: 2, count: 5},
    }
]

describe("getCatalog", () => {
    it(("gets the men's catalog"), () => {
        expect(getCatalog("men", catalog)).toStrictEqual([catalog[0], catalog[2]]);
    })
    it(("gets the women's catalog"), () => {
        expect(getCatalog("women", catalog)).toStrictEqual([catalog[1], catalog[2]]);
    })

})

// describe("manipulations with cart", () => {
//     const catalogMen = getCatalog("men", catalog);
//     const catalogWomen = getCatalog("women", catalog);
//     it("adds an item(s) to cart", () => {
//         addToCart(catalogMen[0]);
//         addToCart(catalogWomen[0]);
//         addToCart(catalogWomen[1]);
//         expect(cart).toStrictEqual([{...catalog[0], quantity: 1}, {...catalog[1], quantity: 1}, {...catalog[2], quantity: 1}]);
//     })

//     it("deletes an item from a cart", () => {
//         console.log(cart);
//         deleteFromCart(0);
//         expect(cart).toStrictEqual([{...catalog[1], quantity: 1}, {...catalog[2], quantity: 1}]);
//     })

//     it("increments/decrements the quantity on a cart's item", () => {
//         incrementQuantityCart(1, false);
//         incrementQuantityCart(0, true);
//         expect(cart).toStrictEqual([{...catalog[1], quantity: 2}]);
//     })

//     it("gets the total price of all the items in the cart", () => {
//         addToCart(catalogWomen[0]);
//         addToCart(catalogWomen[1]);
//         incrementQuantityCart(2, true);
//         incrementQuantityCart(1, false);
//         const totalPrice = getTotalPrice();
//         expect(totalPrice).toBe(400);
//     })
// })