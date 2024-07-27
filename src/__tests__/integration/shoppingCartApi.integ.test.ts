import { getCatalog, getItem, fetchData } from "../../shoppingCartApi";
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock("../../shoppingCartApi", async (importOriginal) => {
    return {
        ...await importOriginal<typeof import("../../shoppingCartApi")>(),
        fetchData: () => (
            {
                "0": {
                    category: "men's clothing",
                    id: 1,
                },
                "1": {
                    category: "women's clothing",
                    id: 15,
                },
                "2": {
                    category: "jewelry",
                    id: 1,
                }
            }
        )
    }
})

describe.only("fetching an item", async () => {
    const data = await fetchData("https://fakestoreapi.com/products");

    it("getting catalog and item from fetched data(women)", () => {
        const catalogMen = getCatalog("men", data);
        const item = getItem(catalogMen, 1);
        expect(item.id).toBe(1);
    })
    it("getting catalog and item from fetched data(women)", () => {
        const catalogWomen = getCatalog("women", data);
        const item = getItem(catalogWomen, 1);
        expect(item.id).toBe(15);
    })
})