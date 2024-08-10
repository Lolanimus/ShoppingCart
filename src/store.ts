import { CartArr, getCart, setCart } from "./shoppingCartApi";

const subscribers = new Set<typeof setCart>();

const store = {
    subscribe: (cb: typeof setCart) => {
        subscribers.add(cb);
        return () => subscribers.delete(cb);
    },
    getSnapshot: () => {
        return getCart();
    },
    setCart: (cart: CartArr) => {
        setCart(cart);
        subscribers.forEach(cb => cb());
    }
}

export default store;