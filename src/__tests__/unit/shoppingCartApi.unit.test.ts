import { getCatalog, getItem, addToCart, CatalogArr } from "../../shoppingCartApi";
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import data from '../../cart.json';
// basically mocking
const catalog = [
    {
        id: 1,
        title: "kesha",
        price: 100,
        description: "kesha",
        category: "men's clothing",
        image: "cla",
        rating: { rate: 2, count: 5},
    },
    {
        id: 15,
        title: "kesha",
        price: 100,
        description: "kesha",
        category: "women's clothing",
        image: "cla",
        rating: { rate: 2, count: 5},
    },
    {
        id: 2,
        title: "kesha",
        price: 100,
        description: "kesha",
        category: "jewelry",
        image: "cla",
        rating: { rate: 2, count: 5},
    }
]

type CatalogObj<T> = T extends readonly (infer U)[] ? U : never;


vi.mock("../../cart.json", () => {
    return {
        default: []
    }
})

vi.mock("../../shoppingCartApi.ts", async (originalImport) => {
    return {
        ...await originalImport<typeof import("../../shoppingCartApi.ts")>(),
        addToCart: (item: CatalogObj<CatalogArr>) => data.push(item),
    }
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
    const catalogMen = getCatalog("men", catalog);
    const catalogWomen = getCatalog("women", catalog);
    it("adds an item(s) to cart", () => {
        addToCart(catalogMen[0]);
        addToCart(catalogWomen[0]);
        addToCart(catalogWomen[1]);
        expect(data).toStrictEqual([catalog[0], catalog[1], catalog[2]]);
    })
})