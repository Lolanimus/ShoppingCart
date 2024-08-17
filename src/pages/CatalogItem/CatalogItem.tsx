import { Form, Params, useLoaderData } from "react-router-dom";
import styles from "./CatalogItem.module.scss";
import { addToCart, fetchData, getCatalog } from "../../shoppingCartApi";
  

function isGender(category: string) {
    return category === "men's clothing" || category === "women's clothing" ? true : false;
}

const catalogItemLoader = async (params: Params<string>, url: string) => {
    const catalog = await fetchData(url);
    const itemId = params.itemId!;
    const gender = params.sex!;
    const returnCatalog = getCatalog(gender, catalog);
    const item = returnCatalog.find(obj => obj.id === parseInt(itemId))!;
    return item;
}

const catalogItemAction = async (params: Params<string>, request: Request, url: string) => {
    const item = await catalogItemLoader(params, url);
    const form = await request.formData();
    const size = form.get("size")?.toString();
    console.log(size);
    addToCart(item, size);
    return null;
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
                <img src={item.image} alt={item.title} />
            </div>
            <main>
                <section aria-label="region">
                    <p>Description...</p>
                </section>
                <aside>
                    <Form method="POST" onSubmit={() => {
                        successPopUp();
                    }}>
                        <div>
                            {isGender(item.category) ? (
                                <>
                                    <p>Size: </p>
                                    <label htmlFor="s">S</label>
                                    <input type="radio" id="s" name="size" value="s" defaultChecked={true}/>
                                    <label htmlFor="m">M</label>
                                    <input type="radio" id="m" name="size" value="m"/>
                                    <label htmlFor="l">L</label>
                                    <input type="radio" id="l" name="size" value="l"/>
                                    <label htmlFor="xl">XL</label>
                                    <input type="radio" id="xl" name="size" value="xl"/>
                                </>
                            ) : (
                                <>
                                    <p>Size: </p>
                                    <label htmlFor="noSize">One size</label>
                                    <input type="radio" id="noSize" name="size" value={undefined} checked={true} readOnly={true} />
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
    )
}

export default CatalogItem;
export { catalogItemLoader, catalogItemAction };