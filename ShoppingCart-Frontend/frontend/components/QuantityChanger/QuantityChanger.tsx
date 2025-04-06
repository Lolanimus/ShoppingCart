import styles from "./QuantityChanger.module.scss";

const QuantityChanger = (props: { product: CartObj }) => {
    const { product } = props;
    return (
        <div className={styles.quantityChanger} data-testid="quantityDiv" >
            <button type="submit" name="decrease" value={JSON.stringify({productId: product.productId, productSize: product.productSize})}>-</button>
            <span data-testid="quantity">{product.quantity}</span>
            <button type="submit" name="increase" value={JSON.stringify({productId: product.productId, productSize: product.productSize})}>+</button>
        </div>
    )
}

export default QuantityChanger;
