import { useEffect, useSyncExternalStore } from "react";
import store from "../../store";
import QuantityChanger from "../../components/QuantityChanger/QuantityChanger";
import { getTotalPrice } from "../../shoppingCartApi";

type CartItemsProps = {
    totalState: { 
        setTotal: React.Dispatch<React.SetStateAction<number>> 
    }, 
    
    buyState: {
        buyDisabled: boolean, 
        setBuyDisabled: React.Dispatch<React.SetStateAction<boolean>>
    }
};

const CartItems = (props: CartItemsProps) => {
    const { setTotal } = props.totalState;
    const { buyDisabled, setBuyDisabled } = props.buyState;
    const storeHook = useSyncExternalStore(store.subscribe, store.getSnapshot);
    useEffect(() => {
        setTotal(getTotalPrice());
    }, [storeHook]);

    useEffect(() => {
        storeHook.length > 0 ? setBuyDisabled(false) : setBuyDisabled(true);
    }, [storeHook.length, buyDisabled])

    
    const result = storeHook.length > 0 ? (
        <ul data-testid="itemsList">
            {storeHook.map(item => (
                <li key={item.id}>
                    <section id="itemImg">
                        <img src={item.image} alt={item.title} />
                    </section>
                    <aside id="itemSettings">
                        <ol>
                            <li>
                                <span data-testid="title">{item.title}</span>
                            </li>
                            <li>
                                { 
                                    item.size !== undefined ? (
                                        <span data-testid="size">{item.size}</span>
                                    ) : (
                                        <span data-testid="size">N/A</span>
                                    )
                                }
                            </li> 
                            <li>
                                <QuantityChanger storeHook={item} />
                            </li>
                            <li>
                                <span data-testid="price" >{item.price * item.quantity}</span>
                            </li>
                            <button onClick={() => store.deleteFromCart(item.id)}>Delete</button>
                        </ol>
                    </aside>
                </li>
            ))}
        </ul>
    ) : (
        <span>There are no items in your cart yet...</span>
    )

    return result;
}

export default CartItems;
export type { CartItemsProps };