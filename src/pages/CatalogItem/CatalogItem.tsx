import { Form, useLoaderData, useSubmit } from "react-router-dom";
import styles from "./CatalogItem.module.scss";

async function successPopUp() {
    const popup = document.getElementById(styles.popUp)!;
    const button = document.getElementById("addToCartBtn")! as HTMLButtonElement;
    popup.classList.add(styles.popUpOn);
    button.disabled = true;
    popup.addEventListener("animationend", () => {
        popup.classList.remove(styles.popUpOn);
        button.disabled = false;
    });
}

const CatalogItem = () => {
    const item = useLoaderData() as CatalogObj;
    const submit = useSubmit();

    return (
        <div className={styles.catalogItem}>
            <header>
                <h1>{item.title}</h1>
            </header>
            <div>
                <img src={item.image} alt={item.title} />
            </div>
            <main>
                <section aria-label="region">
                    <p>Description...</p>
                </section>
                <aside>
                    <Form method="POST" onSubmit={(event) => {
                        successPopUp();
                        submit(event.currentTarget);
                    }}>
                        <div>
                            <p>Size: </p>
                            <label htmlFor="s">S</label>
                            <input type="radio" id="s" name="size" value="s" defaultChecked={true}/>
                            <label htmlFor="m">M</label>
                            <input type="radio" id="m" name="size" value="m"/>
                            <label htmlFor="l">L</label>
                            <input type="radio" id="l" name="size" value="l"/>
                            <label htmlFor="xl">XL</label>
                            <input type="radio" id="xl" name="size" value="xl"/>
                        </div>
                        <button type="submit" id="addToCartBtn">
                            Add to Cart
                        </button>
                        <div id={styles.popUp}>Success</div>    
                    </Form>
                </aside>
            </main>
        </div>
    )
}

export default CatalogItem;