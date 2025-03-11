import { Form, useLoaderData } from "react-router-dom";
import styles from "./Catalog.module.scss";

const Item = (props: { item: CatalogObj }) => {
    const { item } = props;
    return (
        <div id={`item${item.id}`}>
            <div id={styles.imgDiv}>
                <img src={item.image} alt={item.title} />
            </div>
            <div id={styles.itemInfo}>
                <div>
                    <p>{item.title}</p>
                    <span>{`$${item.price}`}</span>
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
    const { returnCatalog, gender } = useLoaderData() as ReturnCatalog;
    const genderH1: string = gender.charAt(0).toUpperCase() + gender.substring(1, gender.length);
    return (
        <div className={styles.catalog}>
            <header>
                <h1>• {genderH1}</h1>
            </header>
            <main>
                <section aria-label="region">
                    {returnCatalog.map((item) => {
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