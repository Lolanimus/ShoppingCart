import { http, HttpResponse } from "msw";
import { contents } from "./data";

let cart = [] as CartObjDto[];
const url = "http://localhost:5072/api";

export default [
    http.get(`${url}/product/:index`, async ({params}) => {
        const index = Number.parseInt(params.index as string);
        return HttpResponse.json(contents[index].product);
    }),
    http.get(`${url}/product/all/male`, () => {
        return HttpResponse.json([contents[0], contents[1]]);
    }),
    http.get(`${url}/product/all/female`, () => {
        return HttpResponse.json([contents[0], contents[2]]);
    }),
    http.get(`${url}/cart`, () => {
        return HttpResponse.json(cart);
    }),
    http.delete(`${url}/cart`, () => {
        cart = [];
    }),
    http.post(`${url}/cart/add`, async params => {
        const body = JSON.parse(await params.request.text()) as CartObjDto;
        cart.push(body);
    })
];