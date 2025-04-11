import { http, HttpResponse } from "msw";
import { afterEach } from "node:test";

const url = "http://localhost:5072/api";

let wasIncremented = false;
const getWasIncremented = () => wasIncremented;
const setWasIncremented = (value: boolean) => wasIncremented = value;
let wasDecremented = false;
const getWasDecremented = () => wasDecremented;
const setWasDecremented = (value: boolean) => wasDecremented = value;
let wasItemDeleted = false;
const getWasItemDeleted = () => wasItemDeleted;
const setWasItemDeleted = (value: boolean) => wasItemDeleted = value;
let wasCartDeleted = false;
const getWasCartDeleted = () => wasCartDeleted;
const setWasCartDeleted = (value: boolean) => wasCartDeleted = value;

const resetItemActionsState = () => {
    afterEach(() => {
    setWasCartDeleted(false);
    setWasIncremented(false);
    setWasDecremented(false);
    setWasItemDeleted(false);
})};

export default [
    http.get(`${url}/product/all/:gender/:id`, async ({params}) => {
        const id = params.id as string;
        const gender = params.gender as string;
        return new HttpResponse(JSON.stringify({
            result: "quired the product",
            id: id,
            gender: gender
        }))
    }),
    http.get(`${url}/product/:id`, async params => {
        return new HttpResponse(JSON.stringify({
            result: "product",
            id: params.params.id
        }))
    }),
    http.get(`${url}/product/all/:gender`, ({params}) => {
        return new HttpResponse(JSON.stringify({
            result: "quired all products",
            gender: params.gender
        }))
    }),
    http.get(`${url}/cart`, () => {
        return new HttpResponse(JSON.stringify({
            result: "quired the cart"
        }))
    }),
    http.delete(`${url}/cart`, () => {
        setWasCartDeleted(true);
        return new HttpResponse(JSON.stringify({
            result: "deleted everything from cart"
        }))
    }),
    http.delete(`${url}/cart`, async params => {
        const id = params.params.id as string;
        const url = new URL(params.request.url);
        const size = url.searchParams.get("size");
        setWasItemDeleted(true);
        return new HttpResponse(JSON.stringify({
            result: "deleted",
            id: id,
            size: size
        }))
    }),
    http.post(`${url}/product/all/:gender/:itemId`, async params => {
        const url = new URL(params.request.url);
        const size = url.searchParams.get("size");
        return new HttpResponse(JSON.stringify({
            body: {
                id: params.params.productId,
                productSize: size
            }
        }))
    }),
    http.post(`${url}/cart/add`, async params => {
        const body: CartObjDto = JSON.parse(await params.request.text());
        return new HttpResponse(JSON.stringify({
            result: "add to cart",
            cartObj: body
        }))
    }),
    http.post(`${url}/cart/qIncrement/:id`, async () => {
        setWasIncremented(true);
    }),
    http.delete(`${url}/cart/qDecrement/:id`, async () => {
        setWasDecremented(true);
    }),
    http.delete(`${url}/cart/delete/:id`, () => {
        setWasItemDeleted(true);
    })
];

export { resetItemActionsState, getWasCartDeleted, getWasDecremented, getWasIncremented, getWasItemDeleted, setWasCartDeleted, setWasDecremented, setWasIncremented, setWasItemDeleted };