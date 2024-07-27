import { getCatalog, getItem } from "../../shoppingCartApi";
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const catalog = {
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

describe("getCatalog", () => {
    it(("gets the men's catalog"), () => {
        expect(getCatalog("men", catalog)).toStrictEqual({"1": catalog["0"], "2": catalog["2"]});
    })
    it(("gets the women's catalog"), () => {
        expect(getCatalog("women", catalog)).toStrictEqual({"1": catalog["1"], "2": catalog["2"]});
    })

})

describe("getItem", () => {
    it(("gets the item from the specified catalog(men)"), () => {
        const catalogMen = getCatalog("men", catalog);
        expect(getItem(catalogMen, 1)).toStrictEqual(catalog["0"]);
    })
    it(("gets the item from the specified catalog(women)"), () => {
        const catalogWomen = getCatalog("women", catalog);
        expect(getItem(catalogWomen, 1)).toStrictEqual(catalog["1"]);
    })
    it(("gets the item from the specified catalog(women)"), () => {
        const catalogWomen = getCatalog("women", catalog);
        expect(getItem(catalogWomen, 2)).toStrictEqual(catalog["2"]);
    })
})