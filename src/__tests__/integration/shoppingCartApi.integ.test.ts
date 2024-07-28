import { getCatalog, fetchData, CatalogArr } from "../../shoppingCartApi";
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe("fetching an item", async () => {
    const data = await fetchData("https://fakestoreapi.com/products");
    console.log(data);
    it("getting catalog and item from fetched data(women)", () => {
        const catalogMen = getCatalog("men", data);
        expect(catalogMen[0].id).toBe(1);
    })
    it("getting catalog and item from fetched data(women)", () => {
        const catalogWomen = getCatalog("women", data);
        expect(catalogWomen[0].id).toBe(15);
    })
})