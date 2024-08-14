import { Link, useLoaderData } from "react-router-dom";
import { ReturnCatalog } from "../../main";

const Item = (props: { item: CatalogObj }) => {
    const { item } = props;
    const gender = item.category.substring(0, item.category.indexOf("'"));
    return (
        <div>
            <div>{item.title}</div>
            <div>
                <img src={item.image} alt={item.title} />
            </div>
            <div>
                <div>{`$${item.price}`}</div>
                <Link to={`catalog/${gender}/${item.id}`}>
                    <span>See more</span>
                </Link>
            </div>
        </div>
    );
}

const Catalog = () => {
    const { returnCatalog, gender } = useLoaderData() as ReturnCatalog;
    const genderH1: string = gender.charAt(0).toUpperCase() + gender.substring(1, gender.length);
    console.log(gender);
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