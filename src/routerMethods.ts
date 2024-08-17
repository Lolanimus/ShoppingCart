import { Params } from "react-router-dom";
import { getCart } from "./cart";
import { addToCart, deleteFromCart, fetchData, getCatalog, getTotalPrice, incrementQuantityCart } from "./shoppingCartApi";

const cartLoader = () => {
    const cart = getCart();
    return {
        total: getTotalPrice(),
        buyDisabled: cart.length > 0 ? false : true,
    }
}

async function cartItemsActions(request: Request) {
    const formData = await request.formData();
    const increaseQuantity: ItemInfo = JSON.parse(formData.get("increase") as string);
    const decreaseQuantity: ItemInfo = JSON.parse(formData.get("decrease") as string);
    const deleteItem: ItemInfo = JSON.parse(formData.get("delete") as string);
    if(deleteItem) deleteFromCart(deleteItem.itemId, deleteItem.size);
    if(increaseQuantity) incrementQuantityCart(increaseQuantity.itemId, true, increaseQuantity.size);
    else if(decreaseQuantity) incrementQuantityCart(decreaseQuantity.itemId, false, decreaseQuantity.size);
    return null
}

function cartItemsLoader() {
    return getCart();
}


const catalogItemLoader = async (params: Params<string>, url: string) => {
    const catalog = await fetchData(url);
    const itemId = params.itemId!;
    const gender = params.sex!;
    const returnCatalog = getCatalog(gender, catalog);
    const item = returnCatalog.find(obj => obj.id === parseInt(itemId))!;
    return item;
}

const catalogItemAction = async (params: Params<string>, request: Request, url: string) => {
    const item = await catalogItemLoader(params, url);
    const form = await request.formData();
    const size = form.get("size")?.toString();
    console.log(size);
    addToCart(item, size);
    return null;
}

const catalogLoader = async (params: Params<string>, url: string) => {
    const catalog = await fetchData(url);
    const gender = params.sex!;
    const returnCatalog = getCatalog(
        gender, 
        catalog
    )

    return {
        returnCatalog,
        gender
    }
}

type CartLoader = ReturnType<typeof cartLoader>;

type ItemInfo = {
    itemId: number,
    size?: string
}

export { cartLoader, cartItemsActions, cartItemsLoader, catalogItemLoader, catalogItemAction, catalogLoader };
export type { CartLoader, ItemInfo };