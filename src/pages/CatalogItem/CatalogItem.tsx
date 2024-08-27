import { Form, useLoaderData } from "react-router-dom";
import styles from "./CatalogItem.module.scss";
import stylesPopup from "../../popup/popup.module.scss";
import { successPopUp } from "../../popup/popup";
import { useRef } from "react";

function isGender(category: string) {
    return category === "men's clothing" || category === "women's clothing" ? true : false;
}

const CatalogItem = () => {
    const item = useLoaderData() as CatalogObj;
    const addToCartRef = useRef(null);
    const popUpRef = useRef(null);
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
                            const addToCartBtn = addToCartRef.current! as HTMLButtonElement;
                            const popUp = popUpRef.current! as HTMLElement;
                            addToCartBtn.disabled = true;
                            successPopUp();
                            popUp.addEventListener("animationend", () => {
                                addToCartBtn.disabled = false;
                            })
                        }}>
                            <p>Size: </p>
                            <div>
                                {isGender(item.category) ? (
                                    <>
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
                                        <div id={styles.radioBtn}>
                                            <input type="radio" id="noSize" name="size" value={undefined} checked={true} readOnly={true} />
                                            <label htmlFor="noSize">One size</label>
                                        </div>
                                    </>
                                )}

                            </div>
                            <button type="submit" id="addToCartBtn" ref={addToCartRef}>
                                Add to Cart
                            </button>
                            <div id={stylesPopup.popUpModule} ref={popUpRef}>Success</div>    
                        </Form>
                    </aside>
                </main>
            </div>
        </div>
    )
}

export default CatalogItem;
