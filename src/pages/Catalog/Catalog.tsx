import { useLoaderData } from "react-router-dom";
import { ReturnCatalog } from "../../main";

const Catalog = () => {
    const { returnCatalog, gender } = useLoaderData() as ReturnCatalog;
    const genderH1: string = gender.charAt(0).toUpperCase() + gender.substring(1, gender.length);
    console.log(gender);
    return (
        <>
            <header>
                <h1>{genderH1}</h1>
            </header>
        </>
    )
}

export default Catalog;