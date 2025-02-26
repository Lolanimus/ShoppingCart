import { getCart } from "./cart";
import * as api from "./shoppingCartApi";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let listeners: any = [];

const store = {
    subscribe: (listener: unknown) => {
        listeners = [...listeners, listener];
        return () => {
            listeners = listeners.filter((l: unknown) => l !== listener);
        };
    },

    getSnapshot: () => {
        return getCart();
    },

    addToCart: (item: CatalogObj, size?: string) => {
        api.addToCart(item, size);
        emitChange();
    },

    incrementQuantityCart: (id: number, isIncrement: boolean) => {
        api.incrementQuantityCart(id, isIncrement);
        emitChange();
    },

    deleteFromCart: (id: number) => {
        api.deleteFromCart(id);
        emitChange();
    },

    clearCart: () => {
        api.clearCart();
        emitChange()
    }
}

function emitChange() {
    for (const listener of listeners) {
      listener();
    }
}

export default store;