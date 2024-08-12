import store from "../../store";

const QuantityChanger = (props: {storeHook: CartObj}) => {
    return (
        <div data-testid="quantityDiv">
            <button onClick={() => store.incrementQuantityCart(props.storeHook.id, false)}>-</button>
            <span data-testid="quantity">{props.storeHook.quantity}</span>
            <button onClick={() => store.incrementQuantityCart(props.storeHook.id, true)}>+</button>
        </div>
    )
}

export default QuantityChanger;