import { getCatalog, addToCart, incrementQuantityCart, clearCart, deleteFromCart, getTotalPrice } from "../../shoppingCartApi";
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getCart } from "../../cart";
import * as data from "../../__mocks__/data";

describe("getCatalog", () => {
    it(("gets the men's catalog"), () => {
        expect(getCatalog("men", data.contents)).toStrictEqual([data.contents[0], data.contents[1]]);
    })
    it(("gets the women's catalog"), () => {
        expect(getCatalog("women", data.contents)).toStrictEqual([data.contents[1], data.contents[2]]);
    })
})

describe("addToCart", () => {
    beforeEach(() => {
        clearCart();
    })

    afterEach(() => {
        clearCart();
    })

    // 0(men), 1(jewelery)
    const catalogMen = getCatalog("men", data.contents);
    // 1(jewelery), 2(women)
    const catalogWomen = getCatalog("women", data.contents);

    it("adds an item(s) to cart", () => {
        addToCart(catalogMen[0], 's');
        addToCart(catalogWomen[0]);
        addToCart(catalogWomen[1], 'm');
        expect(getCart()).toStrictEqual([{...data.contents[0], quantity: 1, size: 's'}, {...data.contents[1], quantity: 1, size: undefined}, {...data.contents[2], quantity: 1, size: 'm'}]);
    })

    it("changes the quantity", () => {
        addToCart(catalogMen[0], 's');
        addToCart(catalogWomen[0]);
        addToCart(catalogWomen[1], 'm');
        incrementQuantityCart(data.contents[0].id, true, 's');
        incrementQuantityCart(data.contents[2].id, false, 'm');
        expect(getCart()).toStrictEqual([{...data.contents[0], quantity: 2, size: 's'}, {...data.contents[1], quantity: 1, size: undefined}]);
    })

    it("deletes an entry", () => {
        addToCart(catalogMen[0], 's');
        addToCart(catalogWomen[0]);
        addToCart(catalogWomen[1], 'm');
        deleteFromCart(data.contents[2].id, 'm');
        expect(getCart()).toStrictEqual([{...data.contents[0], quantity: 1, size: 's'}, {...data.contents[1], quantity: 1, size: undefined}]);
    })

    it("gets the total price of a cart", () => {
        addToCart(catalogMen[0], 's');
        addToCart(catalogWomen[0]);
        addToCart(catalogWomen[1], 'm');
        incrementQuantityCart(data.contents[0].id, true, 's');
        incrementQuantityCart(data.contents[0].id, true, 's');
        expect(getCart()[0].quantity).toBe(3);
        expect(getTotalPrice()).toBe(1081.84);
    })
})