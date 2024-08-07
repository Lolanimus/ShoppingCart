import { getCart, getCatalog, addToCart, incrementQuantityCart, clearCart, deleteFromCart, getTotalPrice } from "../../shoppingCartApi";
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// basically mocking
const catalog = [
    {
        id: 1,
        title: "kesha",
        price: 100,
        description: "kesha",
        category: "men's clothing",
        image: "cla",
        rating: { rate: 2, count: 5}
    },
    {
        id: 15,
        title: "kesha",
        price: 100,
        description: "kesha",
        category: "women's clothing",
        image: "cla",
        rating: { rate: 2, count: 5}
    },
    {
        id: 2,
        title: "kesha",
        price: 100,
        description: "kesha",
        category: "jewelry",
        image: "cla",
        rating: { rate: 2, count: 5}
    }
]

vi.mock("../../cartManipulation");

describe("getCatalog", () => {
    it(("gets the men's catalog"), () => {
        expect(getCatalog("men", catalog)).toStrictEqual([catalog[0], catalog[2]]);
    })
    it(("gets the women's catalog"), () => {
        expect(getCatalog("women", catalog)).toStrictEqual([catalog[1], catalog[2]]);
    })
})

describe("addToCart", () => {
    beforeEach(() => {
        vi.resetModules();
        clearCart();
    })

    afterEach(() => {
        clearCart();
    })

    const catalogMen = getCatalog("men", catalog);
    const catalogWomen = getCatalog("women", catalog);

    it("adds an item(s) to cart", () => {
        addToCart(catalogMen[0], 's');
        addToCart(catalogWomen[0], 'm');
        addToCart(catalogWomen[1]);
        expect(getCart()).toStrictEqual([{...catalog[0], quantity: 1, size: 's'}, {...catalog[1], quantity: 1, size: 'm'}, {...catalog[2], quantity: 1, size: undefined}]);
    })

    it("changes the quantity", () => {
        addToCart(catalogMen[0], 's');
        addToCart(catalogWomen[0], 'm');
        addToCart(catalogWomen[1]);
        incrementQuantityCart(0, true);
        incrementQuantityCart(2, false);
        expect(getCart()).toStrictEqual([{...catalog[0], quantity: 2, size: 's'}, {...catalog[1], quantity: 1, size: 'm'}]);
    })

    it("deletes an entry", () => {
        addToCart(catalogMen[0], 's');
        addToCart(catalogWomen[0], 'm');
        addToCart(catalogWomen[1]);
        deleteFromCart(2);
        expect(getCart()).toStrictEqual([{...catalog[0], quantity: 1, size: 's'}, {...catalog[1], quantity: 1, size: 'm'}]);
    })

    it("gets the total price of a cart", () => {
        addToCart(catalogMen[0], 's');
        addToCart(catalogWomen[0], 'm');
        addToCart(catalogWomen[1]);
        incrementQuantityCart(0, true);
        incrementQuantityCart(0, true);
        expect(getTotalPrice()).toBe(500);
    })
})