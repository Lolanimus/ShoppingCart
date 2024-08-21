import { Form, useLoaderData } from "react-router-dom";
import styles from "./CatalogItem.module.scss";

function isGender(category: string) {
    return category === "men's clothing" || category === "women's clothing" ? true : false;
}

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

    return (
        <div className={styles.catalogItem}>
            <header>
                <h1>{item.title}</h1>
            </header>
            <div>
                <div>
                    <img src={item.image} alt={item.title} />
                </div>
                <main>
                    <section aria-label="region">
                        <p>{item.description}</p>
                    </section>
                    <aside>
                        <Form method="POST" onSubmit={() => {
                            successPopUp();
                        }}>
                            <div>
                                {isGender(item.category) ? (
                                    <>
                                        <p>Size: </p>
                                        <div id={styles.radioBtn}>
                                            <input type="radio" id="s" name="size" value="s" defaultChecked={true}/>
                                            <label htmlFor="s">S</label>
                                        </div>
                                        <div id={styles.radioBtn}>
                                            <input type="radio" id="m" name="size" value="m"/>
                                            <label htmlFor="m">M</label>
                                        </div>
                                        <div id={styles.radioBtn}>
                                            <input type="radio" id="l" name="size" value="l"/>
                                            <label htmlFor="l">L</label>
                                        </div>
                                        <div id={styles.radioBtn}>
                                            <input type="radio" id="xl" name="size" value="xl"/>
                                            <label htmlFor="xl">XL</label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p>Size: </p>
                                        <div id={styles.radioBtn}>
                                            <input type="radio" id="noSize" name="size" value={undefined} checked={true} readOnly={true} />
                                            <label htmlFor="noSize">One size</label>
                                        </div>
                                    </>
                                )}

                            </div>
                            <button type="submit" id="addToCartBtn">
                                Add to Cart
                            </button>
                            <div id={styles.popUp}>Success</div>    
                        </Form>
                    </aside>
                </main>
            </div>
        </div>
    )
}

export default CatalogItem;
