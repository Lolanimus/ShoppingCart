import { getCatalog, addToCart, CatalogArr, CartObj, CartArr, incrementQuantityCart, clearCart, deleteFromCart, getTotalPrice } from "../../shoppingCartApi";
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
let data: CartArr = [];
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

const temporaryCart: CartArr = [];

type CatalogObj<T> = T extends readonly (infer U)[] ? U : never;

vi.mock("../../shoppingCartApi.ts", async (originalImport) => {
    const originalModule = await originalImport<typeof import("../../shoppingCartApi.ts")>();

    const updateCart = (updatedData: CartArr) => {
        data = updatedData;
    };

    const addToCart = (item: CatalogObj<CatalogArr>, size: string) => {
        const cartItem: CartObj = {
            ...item,
            quantity: 1,
            size,
        };
        temporaryCart.push(cartItem);
        updateCart(temporaryCart);
    };

    const incrementQuantityCart = async (id: number, isIncrement: boolean) => {
        isIncrement ? temporaryCart[id].quantity += 1 : (temporaryCart[id].quantity > 1 ? temporaryCart[id].quantity -= 1 : deleteFromCart(id));
        updateCart(temporaryCart);
    }

    const deleteFromCart = (id: number) => {
        temporaryCart.splice(id, 1);
        updateCart(temporaryCart);
    }

    const clearCart = () => {
        data = [];
        temporaryCart.splice(0, temporaryCart.length);
    }

    const getTotalPrice = () => {
        let totalPrice = 0;
        data.forEach((item) => {
            totalPrice += item.quantity * item.price;
        })
        return totalPrice;
    }

    return ({
        ...originalModule,
        updateCart,
        addToCart,
        incrementQuantityCart,
        deleteFromCart,
        clearCart,
        getTotalPrice
    });
})

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
        vi.resetAllMocks();
        clearCart();
    })

    afterEach(() => {
        vi.resetAllMocks();
    })
    
    const catalogMen = getCatalog("men", catalog);
    const catalogWomen = getCatalog("women", catalog);

    it("adds an item(s) to cart", () => {
        addToCart(catalogMen[0], 's');
        addToCart(catalogWomen[0], 'm');
        addToCart(catalogWomen[1]);
        expect(data).toStrictEqual([{...catalog[0], quantity: 1, size: 's'}, {...catalog[1], quantity: 1, size: 'm'}, {...catalog[2], quantity: 1, size: undefined}]);
    })

    it("changes the quantity", () => {
        addToCart(catalogMen[0], 's');
        addToCart(catalogWomen[0], 'm');
        addToCart(catalogWomen[1]);
        console.log(catalogWomen);
        incrementQuantityCart(0, true);
        incrementQuantityCart(2, false);
        expect(data).toStrictEqual([{...catalog[0], quantity: 2, size: 's'}, {...catalog[1], quantity: 1, size: 'm'}]);
    })

    it("deletes an entry", () => {
        addToCart(catalogMen[0], 's');
        addToCart(catalogWomen[0], 'm');
        addToCart(catalogWomen[1]);
        deleteFromCart(data.length - 1);
        expect(data).toStrictEqual([{...catalog[0], quantity: 1, size: 's'}, {...catalog[1], quantity: 1, size: 'm'}]);
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