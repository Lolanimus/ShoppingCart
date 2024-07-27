type Obj = { [key: number]: { category: string }};

const getCatalog = (sex: string, catalog: Obj) => {
    type keyTyped = keyof typeof catalog;
    let returnedCatalog = {};
    const category = sex + "'s clothing";
    Object.keys(catalog).forEach((value, key: keyTyped) => {
        console.log(catalog[key].category);
        console.log(category);
        catalog[key].category === category || catalog[key].category === "jewelry" ? returnedCatalog = {...returnedCatalog, [key]: { ...catalog[key]}} : null;
    });
    console.log(returnedCatalog);
    return returnedCatalog;
};

export { getCatalog };