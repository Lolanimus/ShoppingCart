/* eslint-disable react-hooks/exhaustive-deps */
import { Form, useLoaderData } from "react-router-dom";
import QuantityChanger from "../../components/QuantityChanger/QuantityChanger";
import { CartLoader } from "../Cart/Cart";
import { deleteFromCart, incrementQuantityCart } from "../../shoppingCartApi";

async function cartItemsAction(request: Request) {
    const formData = await request.formData();
    const increaseQuantity = parseInt(formData.get("increase") as string);
    const decreaseQuantity = parseInt(formData.get("decrease") as string);
    const deleteItem = parseInt(formData.get("delete") as string);
    if(deleteItem) deleteFromCart(deleteItem);
    if(increaseQuantity) incrementQuantityCart(increaseQuantity, true);
    else if(decreaseQuantity) incrementQuantityCart(decreaseQuantity, false);
    return null;
}

const CartItems = () => {
    const { cart } = useLoaderData() as CartLoader;
    const result = cart.length > 0 ? (
        <ul data-testid="itemsList">
            {cart.map(item => (
                <li key={`${item.id}${item.size}`}>
                    <section id="itemImg">
                        <img src={item.image} alt={item.title} />
                    </section>
                    <aside id="itemSettings">
                        <ol>
                            <Form method="POST">
                                <li>
                                    <span data-testid="title">{item.title}</span>
                                </li>
                                <li>
                                    <div>
                                        Size
                                    </div>
                                    <div>
                                        { 
                                            item.size !== undefined ? (
                                                <span data-testid="size">{item.size}</span>
                                            ) : (
                                                <span data-testid="size">N/A</span>
                                            )
                                        }
                                    </div>
                                </li> 
                                <li>
                                    <QuantityChanger itemId={item.id} cart={cart}/>
                                </li>
                                <li>
                                    <div>
                                        Price
                                    </div>
                                    <div data-testid="price">
                                        <span>{`$${(item.price * item.quantity).toFixed(2)}`}</span>
                                    </div>
                                </li>
                                <button type="submit" name="delete" value={item.id}>Delete</button>
                            </Form>
                        </ol>
                    </aside>
                </li>
            ))}
        </ul>
    ) : (
        <span>There are no items in your cart yet...</span>
    )

    return result;
}

export default CartItems;
export { cartItemsAction };