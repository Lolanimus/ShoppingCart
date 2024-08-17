import { useLoaderData, Outlet, Form } from "react-router-dom";
import { clearCart } from "../../shoppingCartApi";
import { useState } from "react";
import { CartLoader } from "../../routerMethods";

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
                <Outlet />
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
                    <Form method="get" onClick={() => clearCart()}>
                        <button disabled={buyDisabled} onClick={toggleDialog}>Buy</button>
                    </Form>
                </div>
            </div>
            <BuySuccess open={open} toggleDialog={toggleDialog}/>
        </div>
    )
}

export default Cart;