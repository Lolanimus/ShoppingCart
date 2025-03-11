/// <reference types="vite/client" />

declare type CatalogObj = { 
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
declare type CartObj = CatalogObj & { quantity: number, size?: string };
declare type CatalogArr = CatalogObj[];
declare type CartArr = CartObj[];
