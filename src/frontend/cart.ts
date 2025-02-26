// eslint-disable-next-line no-var
var cart: CartArr = [];

const getCart = () => {
    return cart;
}

const setCart = (obj: CartArr) => {
    cart = obj;
}

export {
    getCart,
    setCart
};