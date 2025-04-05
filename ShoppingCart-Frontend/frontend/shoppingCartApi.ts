import { setCart, getCart } from "./cart";

const fetchProductData = async (url: string): Promise<CatalogArr> => {
    let res: CatalogArr = [];
    
    try {
        const data = await fetch(url, {
            mode: "cors",
            method: "GET"
        })!;
        if(data.ok && data.status == 200) {
            const json: CatalogArr | CatalogObj = await data.json()!;
            res = json !instanceof Array ? json : [json];
        } else {
            throw { code: data.status, message: data.statusText };
        }
    } catch (error: unknown) {
        console.error("Error: " + error);
    }

    return res;
}

const fetchCartData = async (url: string): Promise<CartArr> => {
    let res: CartArr = [];
    
    try {
        const data = await fetch(url, {
            mode: "cors",
            method: "GET",
            credentials: "include"
        })!;
        if(data.ok && data.status == 200) {
            const json: CartArr | CartObj = await data.json()!;
            res = json !instanceof Array ? json : [json];
        } else {
            throw { code: data.status, message: data.statusText };
        }
    } catch (error: unknown) {
        console.error("Error: " + error);
    }

    return res;
}

const postCartData = async(data: CartObjDto, url: string): Promise<boolean> => {
    let result: boolean = false;

    try {
        const response = await fetch(url, {
            mode: "cors",
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(data)
        })!;
        if(response.ok && response.status == 200) {
            result = true;
        } else {
            throw { code: response.status, message: response.statusText };
        }
    } catch (error: unknown) {
        console.error("Error: " + error);
    }

    return result;
} 

// const getCatalog = (sex: string, catalog: CatalogArr) => {
//     const returnedCatalog: CatalogArr = [];
//     const category = sex + "'s clothing";
//     catalog.forEach((obj) => {
//         (obj.category === category || obj.category === "jewelery") ? returnedCatalog.push(obj) : null;
//     });
//     return returnedCatalog;
// };

const getTotalPrice = (cart: CartArr) => {
    let totalPrice = 0;
    cart.forEach((item) => {
        totalPrice += item.quantity * item.product.productPrice;
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
    const inCart = isInCart(item.id, size);
    if(inCart) {
        incrementQuantityCart(item.id, true, size);
        return null;
    }
    const cartItem = {
        ...item,
        quantity: 1,
        size,
    };
    const tempCart = getCart();
    tempCart.push(cartItem);
    setCart([...tempCart]);
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
        product.id === productId && product.size === size ? (isIncrement ? product.quantity += 1 : (product.quantity > 1 ? product.quantity -= 1 : deleteFromCart(productId, size))) : null;
    })
    setCart([...tempCart]);
}

const clearCart = () => {
    setCart([]);
}

export { fetchCartData, postCartData, getTotalPrice, addToCart, deleteFromCart, incrementQuantityCart, clearCart, fetchProductData };
