import { Form, useLoaderData } from "react-router-dom";
import styles from "./CatalogItem.module.scss";
import stylesPopup from "../../popup/popup.module.scss";
import { successPopUp } from "../../popup/popup";
import { useRef } from "react";

function isGender(gender: string) {
    return gender === "male" || gender === "female" ? true : false;
}

const CatalogItem = () => {
    const item = useLoaderData() as CatalogObj;
    const addToCartRef = useRef(null);
    const popUpRef = useRef(null);
    return (
        <div className={styles.catalogItem}>
            <header>
                <h1>{item.productName}</h1>
            </header>
            <div>
                <div>
                    <img src={item.productImageUri} alt={item.productName} />
                </div>
                <main>
                    <section aria-label="region">
                        <p>{item.productDesc}</p>
                    </section>
                    <aside>
                        <Form method="POST" onSubmit={() => {
                            const addToCartBtn = addToCartRef.current! as HTMLButtonElement;
                            const popUp = popUpRef.current! as HTMLElement;
                            popUp.classList.add("success_popup");
                            addToCartBtn.disabled = true;
                            successPopUp();
                            popUp.addEventListener("animationend", () => {
                                addToCartBtn.disabled = false;
                            })
                        }}>
                            <p>Size: </p>
                            <div>
                                {isGender(item.productGender) ? (
                                    <>
                                        <div id={styles.radioBtn}>
                                            <input type="radio" id="s" name="productSize" value="s" defaultChecked={true}/>
                                            <label htmlFor="s">S</label>
                                        </div>
                                        <div id={styles.radioBtn}>
                                            <input type="radio" id="m" name="productSize" value="m"/>
                                            <label htmlFor="m">M</label>
                                        </div>
                                        <div id={styles.radioBtn}>
                                            <input type="radio" id="l" name="productSize" value="l"/>
                                            <label htmlFor="l">L</label>
                                        </div>
                                        <div id={styles.radioBtn}>
                                            <input type="radio" id="xl" name="productSize" value="xl"/>
                                            <label htmlFor="xl">XL</label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div id={styles.radioBtn}>
                                            <input type="radio" id="noSize" name="productSize" value={undefined} checked={true} readOnly={true} />
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
