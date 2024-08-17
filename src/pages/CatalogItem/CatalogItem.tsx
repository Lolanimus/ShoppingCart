import { Form, Params, useLoaderData, useSubmit } from "react-router-dom";
import styles from "./CatalogItem.module.scss";
import { getCart } from "../../cart";
import { addToCart, fetchData, getCatalog, incrementQuantityCart } from "../../shoppingCartApi";

const isInCart = (itemId: number, size?: string) => {
    let bool = false;

    getCart().forEach(obj => {
        if(obj.id === itemId) {
        if(obj.size !== undefined)
            obj.size !== size ? bool = false : bool = true
        else
            bool = true;
        } 
    });
        
    return bool;
}
  
const catalogItemLoader = async (params: Params<string>) => {
    const catalog = await fetchData("https://fakestoreapi.com/products/1");
    const itemId = params.itemId!;
    const gender = params.sex!;
    const returnCatalog = getCatalog(gender, catalog);
    const item = returnCatalog.find(obj => obj.id === parseInt(itemId))!;
    return item;
}

const catalogItemAction = async (params: Params<string>, request: Request) => {
    const itemId = parseInt(params.itemId!);
    const item = await catalogItemLoader(params);
    const form = await request.formData();
    const size = form.get("size")?.toString();
    console.log(itemId);
    console.log(size);
    console.log(isInCart(itemId, size));
    if(isInCart(itemId, size)) incrementQuantityCart(itemId, true);
    else addToCart(item, size);
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
export { catalogItemLoader, catalogItemAction };