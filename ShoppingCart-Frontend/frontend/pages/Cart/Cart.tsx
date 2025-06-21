import { useLoaderData, Form } from "react-router-dom";
import { successPopUp } from "../../popup/popup";
import stylesPopup from "../../popup/popup.module.scss";
import styles from "./Cart.module.scss";
import CartItems from "../CartItems/CartItems";

function buyBtnOnClick(totalVal: number) {
    const buyBtn = document.getElementById("buyBtn") as HTMLButtonElement;
    totalVal === 0 ? buyBtn.disabled = true : buyBtn.disabled = false;
    successPopUp();
}

const Cart = () => {
    const { viewModelArr, total } = useLoaderData() as Cart;
    return (
        <div className={styles.cart}>
            <h1>Cart</h1>
            <div>
                <CartItems context={viewModelArr}/>
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
                    <Form method="DELETE" onSubmit={() => buyBtnOnClick(total)} action="/cart">
                        <button id="buyBtn" disabled={total == 0} name={"deleteAll"} value={"true"}>Buy</button>
                        <div id={stylesPopup.popUpModule}>Success</div>    
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Cart;