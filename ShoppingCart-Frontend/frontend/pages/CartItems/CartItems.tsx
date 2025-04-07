/* eslint-disable react-hooks/exhaustive-deps */
import { useFetcher } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import styles from "./CartItems.module.scss";
import { useMediaQuery } from "react-responsive";
import QuantityChanger from "../../components/QuantityChanger/QuantityChanger";

const CartItems = (props: { context: CartArr }) => {
    const fetcher = useFetcher();
    const isPhone = useMediaQuery({maxWidth: 800});
    const cartProducts = props.context;

    const result = (
        <ul data-testid="itemsList" >
            {cartProducts.map(product => isPhone ? (
                    <li className={styles.cartItem} key={`${product.productId}-${product.productSize}`}>
                        <ol>
                            <fetcher.Form method="POST" >
                                <li>
                                    <img src={product.product.productImageUri} alt={product.product.productName} />
                                </li>
                                <li className={styles.title}>
                                    <span data-testid="title">{product.product.productName}</span>
                                </li>
                                <li className={styles.size}>
                                    <div>
                                        <span>Size: </span>
                                        { 
                                            product.productSize !== "" ? (
                                                <span data-testid="size">{product.productSize && (product.productSize!.length < 3 ? product.productSize?.toUpperCase() : product.productSize)}</span>
                                            ) : (
                                                <span data-testid="size">N/A</span>
                                            )
                                        }
                                    </div>
                                    <QuantityChanger context={product} key={`${product.productId}-${product.productSize}`}/>
                                </li>
                                <li className={styles.itemCartSettings}>
                                    <button className={styles.deleteBtn} type="submit" name="delete" value={JSON.stringify({productId: product.productId, productSize: product.productSize})}>
                                        <Icon path={mdiDelete} size={1} color={"black"} aria-label="delete"/>
                                    </button>
                                    <div data-testid="price" className={styles.price}>
                                        <span>{`$${(product.product.productPrice * product.quantity).toFixed(2)}`}</span>
                                    </div>
                                </li>
                            </fetcher.Form>
                        </ol>
                    </li>
                ) : (
                    <li className={styles.cartItem} key={`${product.productId}-${product.productSize}`}>
                        <section id="itemImg">
                            <img src={product.product.productImageUri} alt={product.product.productName} />
                        </section>
                        <aside id="itemSettings">
                            <ol>
                                <fetcher.Form method="POST">
                                    <li className={styles.title}>
                                        <span data-testid="title">{product.product.productName}</span>
                                    </li>
                                    <li className={styles.size}>
                                        <div>
                                            <span>Size: </span>
                                            { 
                                                product.productSize !== "" ? (
                                                    <span data-testid="size">{product.productSize && (product.productSize!.length < 3 ? product.productSize?.toUpperCase() : product.productSize)}</span>
                                                ) : (
                                                    <span data-testid="size">N/A</span>
                                                )
                                            }
                                        </div>
                                        <QuantityChanger context={product} key={`${product.productId}-${product.productSize}`} />
                                    </li>
                                    <li className={styles.itemCartSettings}>
                                        <button className={styles.deleteBtn} type="submit" name="delete" value={JSON.stringify({productId: product.productId, productSize: product.productSize})}>
                                            <Icon path={mdiDelete} size={1} color={"black"} aria-label="delete"/>
                                        </button>
                                        <div data-testid="price" className={styles.price}>
                                            <span>{`$${(product.product.productPrice * product.quantity).toFixed(2)}`}</span>
                                        </div>
                                    </li>
                                </fetcher.Form>
                            </ol>
                        </aside>
                    </li>
                )
            )}
        </ul>
    )

    return (
        cartProducts.length > 0 ? (
            result
        ) : (
            <span>There are no items in your cart yet...</span>
        )
    );
}

export default CartItems;