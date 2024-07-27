type Obj = { [key: number]: { category: string, id: number }};

const fetchData = async (url: string) => {
    const data = await fetch(url);
    const json = await data.json();
    return json;
}

const getCatalog = (sex: string, catalog: Obj) => {
    type keyTyped = keyof typeof catalog;
    let returnedCatalog = {};
    const category = sex + "'s clothing";
    let i = 1;
    Object.keys(catalog).forEach((value, key: keyTyped) => {
        catalog[key].category === category || catalog[key].category === "jewelry" ? returnedCatalog = {...returnedCatalog, [i++]: { ...catalog[key]}} : null;
    });
    return returnedCatalog;
};

const getItem = (catalog: Obj, id: number) => {
    return catalog[id];
}

export { getCatalog, getItem, fetchData };