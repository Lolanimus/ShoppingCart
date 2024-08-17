import { ItemInfo } from "../../routerMethods";

const QuantityChanger = (props: { item: CartObj, itemInfo: ItemInfo}) => {
    const { item, itemInfo } = props;
    return (
        <div>
            <button type="submit" name="decrease" value={JSON.stringify({itemId: itemInfo.itemId, size: itemInfo.size})}>-</button>
            <span data-testid="quantity">{item.quantity}</span>
            <button type="submit" name="increase" value={JSON.stringify({itemId: itemInfo.itemId, size: itemInfo.size})}>+</button>
        </div>
    )
}

export default QuantityChanger;
