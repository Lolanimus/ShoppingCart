import { http, HttpResponse } from "msw";

let cart = [] as CartObjDto[];
const url = "http://localhost:5072/api";

export default [
    http.get(`${url}/product/1`, () => {
        return HttpResponse.json({productName: 'Kesha'});
    }),
    http.get(`${url}/product/all/male`, () => {
        return HttpResponse.json([{}, {}, {}]);
    }),
    http.get(`${url}/product/all/female`, () => {
        return HttpResponse.json([{}, {}]);
    }),
    http.get(`${url}/cart`, () => {
        return HttpResponse.json(cart);
    }),
    http.delete(`${url}/cart`, () => {
        cart = [];
    }),
    http.post(`${url}/cart/add/`, ({params}) => {
        const cartObj = params as CartObjDto;
        cart.push(cartObj);
    })
];