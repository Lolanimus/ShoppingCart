import { CartItemProps } from "./CartItems.test";

const CartItems: React.FC<CartItemProps> = ({cartItems}) => {
    console.log(cartItems);
    const result = cartItems.length > 0 ? (
        <ul>
            {cartItems.map(item => (
                <li key={item.id}>
                    <section id="itemImg">
                        <img src={item.image} alt={item.title} />
                    </section>
                    <aside id="itemSettings">
                        <ul>
                            <li>
                                <span>{item.title}</span>
                            </li>
                            <li>
                                <span>{item.size}</span>
                            </li>
                            <li>
                                {/* <QuantityChanger /> */}
                            </li>
                            <li>
                                <span>{item.price}</span>
                            </li>
                            <button>delete</button>
                        </ul>
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