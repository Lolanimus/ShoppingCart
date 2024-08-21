import { useLoaderData, Outlet, Form } from "react-router-dom";
import { clearCart } from "../../shoppingCartApi";
import { CartLoader } from "../../routerMethods";
import { successPopUp } from "../CatalogItem/CatalogItem";
import styles from "./Cart.module.scss";
import stylesCatalogItem from "../CatalogItem/CatalogItem.module.scss";

function buyBtnOnClick() {
    clearCart();
    successPopUp(document.getElementById("buyBtn") as HTMLButtonElement);
}

const Cart = () => {
    const { total } = useLoaderData() as CartLoader;

    return (
        <div className={styles.cart}>
            <h1>Cart</h1>
            <div>
                <Outlet />
                <div>
                    <div>
                        <span>Total</span>
                    </div>
                    <div>
                        {
                            total > 0 ? (
                                <span data-testid="total" className={styles.total}>{`$${total}`}</span>
                            ) : (
                                <span data-testid="total" className={styles.total}>N/A</span>
                            )
                        }
                    </div>
                    <Form method="get" onSubmit={() => buyBtnOnClick()}>
                        <button id="buyBtn">Buy</button>
                        <div id={stylesCatalogItem.popUp}>Success</div>    
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Cart;