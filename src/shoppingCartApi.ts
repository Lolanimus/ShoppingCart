import fs from 'fs';
import path from 'path';
import data from './cart.json';

type CatalogObj = { 
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number,
    },
};
type CatalogArr = CatalogObj[];
const cart: CatalogArr = data;

const fetchData = async (url: string) => {
    const data = await fetch(url);
    const json = await data.json();
    return json;
}

const getCatalog = (sex: string, catalog: CatalogArr) => {
    const returnedCatalog: CatalogObj[] = [];
    const category = sex + "'s clothing";
    catalog.forEach((obj) => {
        obj.category === category || obj.category === "jewelry" ? returnedCatalog.push(obj) : null;
    });
    return returnedCatalog;
};

const addToCart = (item: CatalogObj) => {
    cart.push(item);
    const updatedData = JSON.stringify(cart, null, 2);
    fs.writeFileSync(path.resolve(__dirname, "./cart.json"), updatedData);
}

export { getCatalog, addToCart, fetchData };
export type { CatalogArr };