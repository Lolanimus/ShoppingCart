import { setCart, getCart } from "./cart";

const fetchData = async (url: string): Promise<CatalogArr> => {
    let res: CatalogArr = [];
    
    try {
        const data = await fetch(url)!;
        if(data.ok && data.status == 200) {
            const json: CatalogArr | CatalogObj = await data.json()!;
            res = json !instanceof Array ? json : [json];
        } else {
            throw { code: data.status, message: data.statusText };
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error: " + error);
    }

    return res;
}

const getCatalog = (sex: string, catalog: CatalogArr) => {
    const returnedCatalog: CatalogArr = [];
    const category = sex + "'s clothing";
    catalog.forEach((obj) => {
        (obj.category === category || obj.category === "jewelery") ? returnedCatalog.push(obj) : null;
    });
    return returnedCatalog;
};

const getTotalPrice = () => {
    let totalPrice = 0;
    const cart = getCart();
    cart.forEach((item) => {
        totalPrice += item.quantity * item.price;
    })
    return parseFloat(totalPrice.toFixed(2));
}

const isInCart = (itemId: number, size?: string) => {
    let bool = false;

    getCart().forEach(obj => {
        if(obj.id === itemId) {
            if(obj.size === undefined)
                bool = true
            else {
                if(obj.size === size) {
                    bool = true
                } else {
                    bool = false
                }
            }
        } 
    });
        
    return bool;
}

const addToCart = (item: CatalogObj, size?: string) => {
    const cartItem = {
        ...item,
        quantity: 1,
        size,
    };
    const tempCart = getCart();
    const inCart = isInCart(item.id, size);
    if(inCart) incrementQuantityCart(item.id, true);
    else {
        tempCart.push(cartItem);
        setCart([...tempCart]);
    }
}

const deleteFromCart = (productId: number, size?: string) => {
    const tempCart = getCart();
    tempCart.forEach((product, i) => {
        (product.id === productId && product.size === size) && tempCart.splice(i, 1);
    })
    setCart([...tempCart]);
}

const incrementQuantityCart = (productId: number, isIncrement: boolean, size?: string) => {
    const tempCart = getCart();
    tempCart.forEach(product => {
        product.id === productId && product.size === size ? (isIncrement ? product.quantity += 1 : (product.quantity > 1 ? product.quantity -= 1 : deleteFromCart(productId))) : null;
    })
    setCart([...tempCart]);
}

const clearCart = () => {
    setCart([]);
}

export { getCatalog, getTotalPrice, addToCart, deleteFromCart, incrementQuantityCart, clearCart, fetchData };
