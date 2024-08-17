/* eslint-disable react-hooks/exhaustive-deps */
import { useLoaderData, useFetcher } from "react-router-dom";
import QuantityChanger from "../../components/QuantityChanger/QuantityChanger";
import { deleteFromCart, incrementQuantityCart } from "../../shoppingCartApi";
import { getCart } from "../../cart";

type ItemInfo = {
    itemId: number,
    size?: string
}

async function cartItemsActions(request: Request) {
    const formData = await request.formData();
    const increaseQuantity: ItemInfo = JSON.parse(formData.get("increase") as string);
    const decreaseQuantity: ItemInfo = JSON.parse(formData.get("decrease") as string);
    const deleteItem: ItemInfo = JSON.parse(formData.get("delete") as string);
    if(deleteItem) deleteFromCart(deleteItem.itemId, deleteItem.size);
    if(increaseQuantity) incrementQuantityCart(increaseQuantity.itemId, true, increaseQuantity.size);
    else if(decreaseQuantity) incrementQuantityCart(decreaseQuantity.itemId, false, decreaseQuantity.size);
    return null
}

function cartItemsLoader() {
    return getCart();
}

const CartItems = () => {
    const cart = useLoaderData() as CartArr;
    const fetcher = useFetcher();

    const result = (
        <ul data-testid="itemsList" >
            {cart.map(item => (
                <li  key={`${item.id}-${item.size}`}>
                    <section id="itemImg">
                        <img src={item.image} alt={item.title} />
                    </section>
                    <aside id="itemSettings">
                        <ol>
                            <fetcher.Form method="POST">
                                <li>
                                    <span data-testid="title">{item.title}</span>
                                </li>
                                <li>
                                    <div>
                                        Size
                                    </div>
                                    <div>
                                        { 
                                            item.size !== "" ? (
                                                <span data-testid="size">{item.size}</span>
                                            ) : (
                                                <span data-testid="size">N/A</span>
                                            )
                                        }
                                    </div>
                                </li> 
                                <li>
                                    <QuantityChanger item={item} itemInfo={{itemId: item.id, size: item.size}}/>
                                </li>
                                <li>
                                    <div>
                                        Price
                                    </div>
                                    <div data-testid="price">
                                        <span>{`$${(item.price * item.quantity).toFixed(2)}`}</span>
                                    </div>
                                </li>
                                <button type="submit" name="delete" value={JSON.stringify({itemId: item.id, size: item.size})}>Delete</button>
                            </fetcher.Form>
                        </ol>
                    </aside>
                </li>
            ))}
        </ul>
    )

    return (
        cart.length > 0 ? (
            result
        ) : (
            <span>There are no items in your cart yet...</span>
        )
    );
}

export default CartItems;
export { cartItemsLoader, cartItemsActions };
export type { ItemInfo };