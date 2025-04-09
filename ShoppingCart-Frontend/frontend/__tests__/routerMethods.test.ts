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

    describe("catalogItemLoader", () => {
        it("returns the item", async () => {
            expect((
                await catalogItemLoader(url + "/product/1")
            ).productName
            ).contains("Kesha");
        })
    })

    describe("catalogLoader", () => {
        it("returns the catalog of male clothing", async () => {
            expect((
                await catalogLoader({gender: "male"}, url + "/product/all/male")
            )).toStrictEqual({
                returnCatalog: [{}, {}, {}],
                gender: "male"
            });
        })
        it("returns the catalog of female clothing", async () => {
            expect((
                await catalogLoader({gender: "female"}, url + "/product/all/female")
            )).toStrictEqual({
                returnCatalog: [{}, {}],
                gender: "female"
            });
        })
    })
})