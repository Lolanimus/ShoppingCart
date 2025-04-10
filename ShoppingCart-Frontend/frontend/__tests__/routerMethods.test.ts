import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { contents } from "../__mocks__/data";
import { cartLoader, cartItemsActions, catalogItemLoader, catalogItemAction, catalogLoader } from '../routerMethods';
import { deleteCartData, fetchCartData, postCartData } from '../shoppingCartApi';

const url = "http://localhost:5072/api";

async function postMock(index: number)
{
    try {
        const response = await fetch(`${url}/cart/add`, {
            mode: "no-cors",
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({
                productId: contents[index].productId,
                productSize: contents[index].productSize
            })
        })!;
        if(!response.ok) {
            throw { code: response.status, message: response.statusText };
        }
    } catch (error: unknown) {
        console.error("Error: " + error);
    }
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
            const index = 1;
            expect((
                await catalogItemLoader(url + `/product/${index}`)
            ).productName
            ).contains(contents[index].product!.productName);
        })
    })

    describe("catalogLoader", () => {
        it("returns the catalog of male clothing", async () => {
            expect((
                await catalogLoader({gender: "male"}, url + "/product/all/male")
            )).toStrictEqual({
                returnCatalog: [contents[0], contents[1]],
                gender: "male"
            });
        })
        it("returns the catalog of female clothing", async () => {
            expect((
                await catalogLoader({gender: "female"}, url + "/product/all/female")
            )).toStrictEqual({
                returnCatalog: [contents[0], contents[2]],
                gender: "female"
            });
        })
    })

    describe("catalogItemAction", () => {
        it("adds the product to the cart", async () => {
            const params = {
                index: '3'
            }
            const formData = new FormData();
            formData.append('productSize', "xl");
          
            const request = new Request(`${url}/product/${params.index}`, {
              method: 'POST',
              body: formData,
            });

            await catalogItemAction(
                params,
                request,
                url
            )

            expect((await cartLoader(`${url}/cart`)).length).toStrictEqual(4);
            const product = (await cartLoader(`${url}/cart`))[3];
            expect(product).toStrictEqual({
                productId: contents[Number.parseInt(params.index)].productId,
                productSize: contents[Number.parseInt(params.index)].productSize
            })
        })
    })
})