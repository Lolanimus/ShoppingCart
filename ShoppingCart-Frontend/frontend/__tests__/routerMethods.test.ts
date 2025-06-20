import { describe, expect, it } from 'vitest'
import { cartItemsActions, cartLoader, catalogItemAction } from '../routerMethods';
import { getWasCartDeleted, getWasDecremented, getWasIncremented, getWasItemDeleted } from '../__mocks__/handlers';

const url = "https://localhost:8081";

describe("routerMethods", async () => {
    describe("cartLoader", async () => {
        it("loads the cart", async () => {
            expect(await cartLoader(`${url}/cart`))
            .toStrictEqual({
                result: "quired the cart"
            })
        })
    });

    describe("catalogItemLoader", () => {
        it("loads the item from a cart", async () => {
            expect(await cartLoader(`${url}/product/all/male/suka`))
            .toStrictEqual({                
                result: "quired the product",
                id: "suka",
                gender: "male"
            })
        })
    })

    describe("catalogLoader", () => {
        it("loads the catalog", async () => {
            expect(await cartLoader(`${url}/product/all/male`))
            .toStrictEqual({                
                result: "quired all products",
                gender: "male"
            })
        })
    })

    describe("catalogItemAction", () => {
        it("adds the product to the cart", async () => {
            const params = {
                itemId: '3',
                gender: 'male'
            }
            const formData = new FormData();
            formData.append('productSize', "xl");
          
            const request = new Request(`${url}`, {
              method: 'POST',
              body: formData,
            });

            
            expect(JSON.parse(await (await catalogItemAction(
                params,
                request,
                url
            ))!.text())).toStrictEqual({
                result: "add to cart",
                cartObj: {
                    productId: params.itemId,
                    productSize: "xl"
                }
            })
        })
    })

    describe("cartItemActions", () => {
        it("increase quantity", async () => {
            const body = {
                productId: '3',
                productSize: 'xl'
            }
            const formData = new FormData();
            formData.append('increase', JSON.stringify(body));
          
            const request = new Request(`${url}`, {
              method: 'POST',
              body: formData,
            });
            
            const action = await cartItemsActions(
                request,
                url
            );
            expect(getWasIncremented()).toBeTruthy();
            expect(action.status).toBe(302);
        });

        it("decrease quantity", async () => {
            const body = {
                productId: '3',
                productSize: 'xl'
            }
            const formData = new FormData();
            formData.append('decrease', JSON.stringify(body));
          
            const request = new Request(`${url}`, {
              method: 'POST',
              body: formData,
            });
            
            const action = await cartItemsActions(
                request,
                url
            );
            expect(getWasDecremented()).toBeTruthy();
            expect(action.status).toBe(302);
        });

        it("delete item", async () => {
            const body = {
                productId: '3',
                productSize: 'xl'
            }
            const formData = new FormData();
            formData.append('delete', JSON.stringify(body));
          
            const request = new Request(`${url}`, {
              method: 'POST',
              body: formData,
            });
            
            const action = await cartItemsActions(
                request,
                url
            );
            expect(getWasItemDeleted()).toBeTruthy();
            expect(action.status).toBe(302);
        });

        it("delete all items", async () => {
            const body = {
                productId: '3',
                productSize: 'xl'
            }
            const formData = new FormData();
            formData.append('deleteAll', JSON.stringify(body));
          
            const request = new Request(`${url}`, {
              method: 'POST',
              body: formData,
            });
            
            const action = await cartItemsActions(
                request,
                url
            );
            expect(getWasCartDeleted()).toBeTruthy();
            expect(action.status).toBe(302);
        })
    })
})