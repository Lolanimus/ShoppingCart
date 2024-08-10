import { useSyncExternalStore } from "react";
import store from "../../store";
import { incrementQuantityCart } from "../../shoppingCartApi";

const QuantityChanger = (props: {id: number}) => {
    const id = props.id;
    const storeHook = useSyncExternalStore(store.subscribe, store.getSnapshot);
    return(
        <>
            <button>-</button>
            <span data-testid="quantity">{storeHook[id].quantity}</span>
            <button onClick={() => incrementQuantityCart(id, true)}>+</button>
        </>
    )
}

export default QuantityChanger;