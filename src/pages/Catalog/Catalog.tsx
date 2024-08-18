import { Form, useLoaderData } from "react-router-dom";

const Item = (props: { item: CatalogObj }) => {
    const { item } = props;
    return (
        <div id={`item${item.id}`}>
            <div>{item.title}</div>
            <div>
                <img src={item.image} alt={item.title} />
            </div>
            <Form action={item.id.toString()} method="GET">
                <div>{`$${item.price}`}</div>
                <button type="submit">See more</button>
            </Form>
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
        <>
            <header>
                <h1>{genderH1}</h1>
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
        </>
    )
}

export default Catalog;
export { Item };