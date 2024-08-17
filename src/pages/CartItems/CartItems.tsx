/* eslint-disable react-hooks/exhaustive-deps */
import { useLoaderData, useFetcher } from "react-router-dom";
import QuantityChanger from "../../components/QuantityChanger/QuantityChanger";

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