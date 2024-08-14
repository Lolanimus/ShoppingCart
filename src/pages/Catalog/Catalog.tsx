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
            <main>
                <section aria-label="region">
                    {returnCatalog.map((item) => {
                        return <div key={item.id}>{item.title}</div>
                    })}
                </section>
            </main>
        </>
    )
}

export default Catalog;