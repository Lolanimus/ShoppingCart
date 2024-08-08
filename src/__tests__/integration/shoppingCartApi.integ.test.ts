import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { rewriteCart, readCart } from '../../cartManipulation';
import { fetchData, clearCart } from '../../shoppingCartApi';

const url = "https://fakestoreapi.com/products/1";
const urlRes = {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  }

describe("manipulations with the cart json file", () => {
    beforeEach(() => {
        clearCart();
    })

    afterEach(() => {
        clearCart();
    })

    it("reads and rewrites the cart", async () => {
        // I've no idea why, but sometimes vitest just can't handle fetching
        // So, expect the test to time out a lot
        // Except that, test works perfectly fine
        const cartMock = await fetchData(url);
        rewriteCart(cartMock);
        const cart = readCart();
        expect(cart).toStrictEqual(urlRes);
    })
})