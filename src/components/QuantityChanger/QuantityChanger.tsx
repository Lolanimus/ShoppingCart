const QuantityChanger = (props: { cart: CartArr, itemId: number }) => {
    const item = props.cart.find((obj) => obj.id === props.itemId)!;
    console.log(item.quantity);
    return (
        <div>
            <button type="submit" name="decrease" value={props.itemId}>-</button>
            <span data-testid="quantity">{item.quantity}</span>
            <button type="submit" name="increase" value={props.itemId}>+</button>
        </div>
    )
}

export default QuantityChanger;
