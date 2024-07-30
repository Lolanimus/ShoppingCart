import { getCatalog, getTotalPrice, fetchData, addToCart, deleteFromCart, incrementQuantityCart, CartArr, clearCart } from "../../shoppingCartApi";
import { describe, expect, it } from 'vitest'
import fs from "fs/promises";
import path from "path";
const data: CartArr = await fetchData("https://fakestoreapi.com/products");

describe("fetching an item", async () => {
    it("getting catalog and item from fetched data(women)", () => {
        const catalogMen = getCatalog("men", data);
        expect(catalogMen[0].id).toBe(1);
    })
    it("getting catalog and item from fetched data(women)", () => {
        const catalogWomen = getCatalog("women", data);
        expect(catalogWomen[0].id).toBe(15);
    })
})

// use only for each it you wanna call
describe("manipulating data", async () => {
    const catalogMen = getCatalog("men", data);
    const catalogWomen = getCatalog("women", data);
    const checkCart = (expected: object[]) => {
        const file = path.resolve(__dirname, "../../cart.json");
        (async () => await fs.readFile(file))()
        .then(res => {
            expect(JSON.parse(res.toString())).toStrictEqual(expected);
        })
        .then(() => clearCart());
    }
    
    it("adds items to a cart", async () => {
        addToCart(catalogMen[0]);
        addToCart(catalogWomen[2]);
        checkCart([{...catalogMen[0], quantity: 1}, {...catalogWomen[2], quantity: 1}]);
    })
    it("adds and deletes items from a cart", async () => {
        addToCart(catalogWomen[1]);
        addToCart(catalogWomen[2]);
        deleteFromCart(0);
        checkCart([{...catalogWomen[2], quantity: 1}]);
    })
    it.only("increments/decrements quantity of an item in a cart, checks for a total price", () => {
        addToCart(catalogWomen[2]);
        incrementQuantityCart(0, true);
        expect(getTotalPrice()).toBe(79.98);
        checkCart([{...catalogWomen[2], quantity: 2}]);
    })
})