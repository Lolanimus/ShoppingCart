import {getCatalog} from "../shoppingCartApi";
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe.only("unit tests", () => {
    const catalog = {
        "0": {
            category: "men's clothing",
        },
        "1": {
            category: "women's clothing",
        },
        "2": {
            category: "jewelry",
        }
    }
    it(("gets the men's catalog"), () => {
        expect(getCatalog("men", catalog)).toStrictEqual({"0": catalog["0"], "2": catalog["2"]});
    })
    it(("gets the women's catalog"), () => {
        expect(getCatalog("women", catalog)).toStrictEqual({"1": catalog["1"], "2": catalog["2"]});
    })
})

describe("integration tests", () => {
    
})