import { useSyncExternalStore } from "react";
import store from "../../store";

const QuantityChanger = (props: {id: number}) => {
    const id = props.id;
    const storeHook = useSyncExternalStore(store.subscribe, store.getSnapshot);
    return (
        storeHook[id] && (
            <div data-testid="quantityDiv">
                <button onClick={() => store.incrementQuantityCart(id, false)}>-</button>
                <span data-testid="quantity">{storeHook[id].quantity}</span>
                <button onClick={() => store.incrementQuantityCart(id, true)}>+</button>
            </div>
        )
    )
}

export default QuantityChanger;