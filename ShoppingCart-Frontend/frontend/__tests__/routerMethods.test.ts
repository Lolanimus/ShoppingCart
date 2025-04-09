import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { contents } from "../__mocks__/data";
import { cartLoader, cartItemsActions, catalogItemLoader, catalogItemAction, catalogLoader } from '../routerMethods';
import { deleteCartData, fetchCartData, postCartData } from '../shoppingCartApi';

const url = "http://localhost:5072/api";

async function postMock(index: number)
{
    await postCartData(
        { 
            productId: contents[index].productId,
            productSize: contents[index].productSize
        }, url + "/cart/add/");
}

async function clearCart()
{
    await deleteCartData(url + "/cart");
}

async function mockCart() {
    await postMock(0);
    await postMock(1);
    await postMock(2);
}

describe("routerMethods", async () => {
    // const params = {
    //     itemId: 1,
    //     sex: "men"
    // }

    beforeEach(async () => {
        await mockCart();
    })

    afterEach(async () => {
        await clearCart();
    })

    describe("cartLoader", async () => {
        it("cart.length > 0", async () => {
            const cart = await cartLoader(url + "/cart");
            expect(cart.length).toStrictEqual(3);
        })
        it("cart.length === 0", async () => {
            await clearCart();
            const cart = await cartLoader(url + "/cart");
            expect(cart.length).toStrictEqual(0);
        })
    });

    // describe("cartItemsLoader", () => {
    //     it("returns the cart", () => {
    //         expect(cartItemsLoader()).toStrictEqual([{...data.contents[0], quantity: 1, size: "s"}, {...data.contents[1], quantity: 1, size: "s"}, {...data.contents[2], quantity: 1, size: "s"}])
    //     })
    // })

    // describe("catalogItemLoader", () => {
    //     it("returns the item", async () => {
    //         expect(await catalogItemLoader(params as unknown as Params<string>, url)).toStrictEqual(data.contents[0]);
    //     })
    // })

    // describe("catalogLoader", () => {
    //     it("returns the catalog of a specified gender", async () => {
    //         const { returnCatalog } = await catalogLoader({ sex: params.sex } as unknown as Params<string>, url);
    //         expect(returnCatalog.slice(0, 1)).toStrictEqual([data.contents[0]]);
    //     })
    // })
})