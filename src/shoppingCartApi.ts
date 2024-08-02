import fs from 'fs';
import path from 'path';

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
type CartObj = CatalogObj & { quantity: number, size?: string };
type CatalogArr = CatalogObj[];
type CartArr = CartObj[];

const cart: CartArr = [];

const updateCart = (updatedData: object[]) => {
    fs.writeFileSync(path.resolve(__dirname, "./cart.json"), JSON.stringify(updatedData, null, 2));
}

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

const getTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
        totalPrice += item.quantity * item.price;
    })
    return totalPrice;
}

const addToCart = (item: CatalogObj, size?: string) => {
    const cartItem = {
        ...item,
        quantity: 1,
        size,
    };
    cart.push(cartItem);
    updateCart(cart);
}

const deleteFromCart = (id: number) => {
    cart.splice(id, 1);
    updateCart(cart);
}

const incrementQuantityCart = (id: number, isIncrement: boolean) => {
    isIncrement ? cart[id].quantity += 1 : (cart[id].quantity > 1 ? cart[id].quantity -= 1 : deleteFromCart(id));
    updateCart(cart);
}

const clearCart = () => {
    updateCart([]);
}

export { getCatalog, getTotalPrice, addToCart, updateCart, deleteFromCart, incrementQuantityCart, clearCart, fetchData };
export type { CatalogArr, CatalogObj, CartObj, CartArr };