import * as cartManipulations from "./cartManipulation";

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

// eslint-disable-next-line no-var
var cart: CartArr = [];

const updateCart = () => {
    cartManipulations.rewriteCart(cart);
}

const setCart = (updatedData: CartArr) => {
    cart = updatedData;
    updateCart();
}

const getCart = () => {
    return cart;
}

const fetchData = async (url: string) => {
    try {
        const data = await fetch(url);
        if(data.ok && data.status == 200) {
            const json = await data.json();
            return json;
        } else {
            throw { code: data.status, message: data.statusText };
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error: " + error);
    }

}

const getCatalog = (sex: string, catalog: CatalogArr) => {
    const returnedCatalog: CatalogArr = [];
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
    const tempCart = getCart();
    tempCart.push(cartItem);
    setCart(tempCart);
}

const deleteFromCart = (id: number) => {
    const tempCart = getCart();
    tempCart.splice(id, 1);
    setCart(tempCart);
}

const incrementQuantityCart = (id: number, isIncrement: boolean) => {
    const tempCart = getCart();
    isIncrement ? tempCart[id].quantity += 1 : (tempCart[id].quantity > 1 ? tempCart[id].quantity -= 1 : deleteFromCart(id));
    setCart(tempCart);
}

const clearCart = () => {
    setCart([]);
}

export { setCart, getCart, getCatalog, getTotalPrice, addToCart, updateCart, deleteFromCart, incrementQuantityCart, clearCart, fetchData };
export type { CatalogArr, CatalogObj, CartObj, CartArr };