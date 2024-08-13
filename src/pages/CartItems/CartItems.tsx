import { useSyncExternalStore } from "react";
import store from "../../store";
import QuantityChanger from "../../components/QuantityChanger/QuantityChanger";

const CartItems = () => {
    const storeHook = useSyncExternalStore(store.subscribe, store.getSnapshot);
    const result = storeHook.length > 0 ? (
        <ul>
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
                                <span data-testid="price">{item.price * item.quantity}</span>
                            </li>
                            <button>Delete</button>
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