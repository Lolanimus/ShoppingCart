import { Form, useLoaderData } from "react-router-dom";
import styles from "./Catalog.module.scss";

const Item = (props: { item: CatalogObj }) => {
    const { item } = props;

    return (
        <div id={`item${item.id}`}>
            <div id={styles.imgDiv}>
                <img src={item.productImageUri} alt={item.productName} />
            </div>
            <div id={styles.itemInfo}>
                <div>
                    <p>{item.productName}</p>
                    <span>{`$${item.productPrice}`}</span>
                </div>
                <Form action={item.id.toString()} method="GET">
                    <button type="submit">See more</button>
                </Form>
            </div> 
        </div>
    );
}

type ReturnCatalog = {
    returnCatalog: CatalogArr,
    gender: string
};

const Catalog = () => {
    const catalog = useLoaderData() as ReturnCatalog | undefined;
    if (!catalog || !catalog.returnCatalog) {
        return <p>Loading or No Data Available...</p>; // Prevent errors
    }
    const genderH1: string = catalog!.gender.charAt(0).toUpperCase() + catalog!.gender.substring(1, catalog!.gender.length);
    return (
        <div className={styles.catalog}>
            <header>
                <h1>• {genderH1}</h1>
            </header>
            <main>
                <section aria-label="region">
                    {
                    catalog!.returnCatalog.map((item) => {
                        return (
                            <Item item={item} key={item.id}/>
                        )
                    })}
                </section>
            </main>
        </div>
    )
}

export default Catalog;
export { Item };