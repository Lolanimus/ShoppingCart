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
import data from './cart.json';


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


export { getCatalog, addToCart, fetchData };
export type { CatalogArr };