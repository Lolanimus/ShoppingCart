import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { addToCart, clearCart } from '../shoppingCartApi'
import * as data from "../__mocks__/data";
import { cartItemsLoader, cartLoader, catalogItemLoader, catalogLoader } from '../routerMethods';
import { Params } from 'react-router-dom';

const url = "https://fakestoreapi.com/products";

function mockCart() {
    addToCart(data.contents[0], "s");
    addToCart(data.contents[1], "s");
    addToCart(data.contents[2], "s");
}

describe("routerMethods", () => {
    const params = {
        itemId: 1,
        sex: "men"
    }

    beforeEach(() => {
        mockCart();
    })

    afterEach(() => {
        clearCart();
    })

    describe("cartLoader", () => {
        it("cart.length > 0", () => {
            expect(cartLoader()).toStrictEqual({total: 861.94, buyDisabled: false});
        })
        it("cart.length === 0", () => {
            clearCart();
            expect(cartLoader()).toStrictEqual({total: 0, buyDisabled: true});
        })
    })

    describe("cartItemsLoader", () => {
        it("returns the cart", () => {
            expect(cartItemsLoader()).toStrictEqual([{...data.contents[0], quantity: 1, size: "s"}, {...data.contents[1], quantity: 1, size: "s"}, {...data.contents[2], quantity: 1, size: "s"}])
        })
    })

    describe("catalogItemLoader", () => {
        it("returns the item", async () => {
            expect(await catalogItemLoader(params as unknown as Params<string>, url)).toStrictEqual(data.contents[0]);
        })
    })

    describe("catalogLoader", () => {
        it("returns the catalog of a specified gender", async () => {
            const { returnCatalog } = await catalogLoader({ sex: params.sex } as unknown as Params<string>, url);
            expect(returnCatalog.slice(0, 1)).toStrictEqual([data.contents[0]]);
        })
    })
})