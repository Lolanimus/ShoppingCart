import { clearCart } from "../../shoppingCartApi";
import CartItems from "../CartItems/CartItems";
import { useState } from "react";

function BuySuccess(props: {toggleDialog: () => void, open: boolean}) {
    const { toggleDialog, open } = props;
    return (
        <dialog open={open} data-testid={`dialog-${open}`}>
            <p>The purchase was successful</p>
            <button onClick={() => {
                toggleDialog();
                clearCart();
            }}>Close</button>
        </dialog>
    )
}

const Cart = () => {
    const [open, setOpen] = useState(false)
    const [total, setTotal] = useState(0);
    const [buyDisabled, setBuyDisabled] = useState(true);
    const toggleDialog = () => {
        setOpen(!open);
    };

    return (
        <div>
            <h1>Cart</h1>
            <form onSubmit={e => e.preventDefault()}>
                <CartItems totalState={{setTotal}} buyState={{buyDisabled, setBuyDisabled}}/>
                <div>
                    <div>
                        <span>Total</span>
                    </div>
                    <div>
                        {
                            total > 0 ? (
                                <span data-testid="total">{`$${total}`}</span>
                            ) : (
                                <span data-testid="total">N/A</span>
                            )
                        }
                    </div>
                    <button disabled={buyDisabled} onClick={toggleDialog}>Buy</button>
                </div>
            </form>
            <BuySuccess open={open} toggleDialog={toggleDialog}/>
        </div>
    )
}

export default Cart;