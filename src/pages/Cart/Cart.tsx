import CartItems from "../CartItems/CartItems";
import store from "../../store";
import { getTotalPrice } from "../../shoppingCartApi";

const Cart = () => {
    return (
        <div>
            <h1>Cart</h1>
            <form>
                <CartItems />
                <div>
                    <div>
                        <span>Total</span>
                    </div>
                    <div>
                        {
                            store.getSnapshot().length > 0 ? (
                                <span data-testid="total">{getTotalPrice()}</span>
                            ) : (
                                <span data-testid="total">N/A</span>
                            )
                        }
                    </div>
                    <button disabled={store.getSnapshot().length === 0}>Buy</button>
                </div>
            </form>
        </div>
    )
}

export default Cart;