import { useLoaderData, Outlet } from "react-router-dom";
import { getCart } from "../../cart";
import { clearCart, getTotalPrice } from "../../shoppingCartApi";
import { useState } from "react";

const cartLoader = () => {
    const cart = getCart();
    return {
        cart,
        total: getTotalPrice(),
        buyDisabled: cart.length > 0 ? false : true,
    }
}

type CartLoader = ReturnType<typeof cartLoader>;

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
    const { total, buyDisabled } = useLoaderData() as CartLoader;
    const [open, setOpen] = useState(false);
    const toggleDialog = () => {
        setOpen(!open);
    };

    return (
        <div>
            <h1>Cart</h1>
            <div>
                <Outlet/>
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
            </div>
            <BuySuccess open={open} toggleDialog={toggleDialog}/>
        </div>
    )
}

export default Cart;
export { cartLoader };
export type { CartLoader };