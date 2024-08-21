/* eslint-disable react-hooks/exhaustive-deps */
import { useLoaderData, useFetcher } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import QuantityChanger from "../../components/QuantityChanger/QuantityChanger";
import styles from "./CartItems.module.scss";
const CartItems = () => {
    const cart = useLoaderData() as CartArr;
    const fetcher = useFetcher();

    const result = (
        <ul data-testid="itemsList" >
            {cart.map(item => (
                <li className={styles.cartItem} key={`${item.id}-${item.size}`}>
                    <section id="itemImg">
                        <img src={item.image} alt={item.title} />
                    </section>
                    <aside id="itemSettings">
                        <ol>
                            <fetcher.Form method="POST">
                                <li className={styles.title}>
                                    <span data-testid="title">{item.title}</span>
                                </li>
                                <li className={styles.size}>
                                    <div>
                                        <span>Size: </span>
                                        { 
                                            item.size !== "" ? (
                                                <span data-testid="size">{item.size!.length < 3 ? item.size?.toUpperCase() : item.size}</span>
                                            ) : (
                                                <span data-testid="size">N/A</span>
                                            )
                                        }
                                    </div>
                                    
                                    <QuantityChanger item={item} itemInfo={{itemId: item.id, size: item.size}}/>
                                </li>
                                <li className={styles.itemCartSettings}>
                                    <button className={styles.deleteBtn} type="submit" name="delete" value={JSON.stringify({itemId: item.id, size: item.size})}>
                                        <Icon path={mdiDelete} size={1} color={"black"}/>
                                    </button>
                                    <div data-testid="price" className={styles.price}>
                                        <span>{`$${(item.price * item.quantity).toFixed(2)}`}</span>
                                    </div>
                                </li>
                            </fetcher.Form>
                        </ol>
                    </aside>
                </li>
            ))}
        </ul>
    )

    return (
        cart.length > 0 ? (
            result
        ) : (
            <span>There are no items in your cart yet...</span>
        )
    );
}

export default CartItems;