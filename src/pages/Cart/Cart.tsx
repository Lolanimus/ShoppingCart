import CartItems from "../CartItems/CartItems";
import store from "../../store";
import { getTotalPrice } from "../../shoppingCartApi";
import { useState } from "react";

function BuySuccess(props: {toggleDialog: () => void, open: boolean}) {
    const { toggleDialog, open } = props;
    return (
        <dialog open={open}>
            <p>The purchase was successful</p>
            <form method="dialog">
                <button onClick={toggleDialog}>Close</button>
            </form>
        </dialog>
    )
}

const Cart = () => {
    const [open, setOpen] = useState(false)
    
    const toggleDialog = () => {
        setOpen(!open);
    };

    return (
        <div>
            <h1>Cart</h1>
            <form onSubmit={e => e.preventDefault()}>
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
                    <button disabled={store.getSnapshot().length === 0} onClick={toggleDialog}>Buy</button>
                </div>
            </form>
            <BuySuccess open={open} toggleDialog={toggleDialog}/>
        </div>
    )
}

export default Cart;