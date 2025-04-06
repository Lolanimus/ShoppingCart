import { useFetcher } from "react-router-dom";
import styles from "./QuantityChanger.module.scss";

const QuantityChanger = (props: { product: CartObj }) => {
    const { product } = props;
    const fetcher = useFetcher();

    const handleQuantityChange = (type: "increase" | "decrease") => {
        const formData = new FormData();
        formData.append(type, JSON.stringify({
          productId: product.productId,
          productSize: product.productSize,
        }));
        fetcher.submit(formData, { method: "POST", action: "/cart" });
    };

    return (
        <div className={styles.quantityChanger} data-testid="quantityDiv" >
            <button onClick={() => handleQuantityChange("decrease")}>-</button>
            <span data-testid="quantity">{product.quantity}</span>
            <button  onClick={() => handleQuantityChange("increase")}>+</button>
        </div>
    )
}

export default QuantityChanger;
