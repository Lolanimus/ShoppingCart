import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { rewriteCart } from '../../cartManipulation';
import { fetchData, CartArr, clearCart } from '../../shoppingCartApi';
import fs from "fs/promises";
import path from "path";

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

describe("rewrites the cart json file", () => {
    beforeEach(() => {
        clearCart();
    })

    afterEach(() => {
        clearCart();
    })

    it("rewrites with the fetch data", async () => {
        const cartMock: CartArr = await fetchData(url);
        rewriteCart(cartMock);
        const updatedCart: CartArr = JSON.parse(await fs.readFile(path.resolve(__dirname, "../../cart.json"), "utf-8"));
        expect(updatedCart).toStrictEqual(urlRes);
    })
})