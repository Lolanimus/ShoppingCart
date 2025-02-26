import { useLoaderData, Outlet, Form } from "react-router-dom";
import { clearCart } from "../../shoppingCartApi";
import { CartLoader } from "../../routerMethods";
import { successPopUp } from "../../popup/popup";
import stylesPopup from "../../popup/popup.module.scss";
import styles from "./Cart.module.scss";

function buyBtnOnClick(totalVal: number) {
    const buyBtn = document.getElementById("buyBtn") as HTMLButtonElement;
    clearCart();
    totalVal === 0 ? buyBtn.disabled = true : buyBtn.disabled = false;
    successPopUp();
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
                    <Form method="get" onSubmit={() => buyBtnOnClick(total)}>
                        <button id="buyBtn" disabled={total == 0}>Buy</button>
                        <div id={stylesPopup.popUpModule}>Success</div>    
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Cart;