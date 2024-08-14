import { useLoaderData } from "react-router-dom";

const CatalogItem = () => {
    const item = useLoaderData() as CatalogObj;
    console.log(item);
    return (
        <div>{item.id}</div>
    )
}

export default CatalogItem;