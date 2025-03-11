import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { fetchData, clearCart, addToCart } from '../../shoppingCartApi';
import { getCart } from "../../cart";
import * as data from "../../__mocks__/data";

describe("manipulations with the cart json file", () => {
    beforeEach(() => {
        clearCart();
    })

    afterEach(() => {
        clearCart();
    })

    it("reads and rewrites the cart", async () => {
        const cartMock: CatalogArr = await fetchData(data.urls[0]);
        cartMock.forEach(obj => {
            addToCart(obj, 'm');
        })
        const cart = getCart();
        expect(cart).toStrictEqual([{...data.contents[0], quantity: 1, size: 'm'}]);
    })
})