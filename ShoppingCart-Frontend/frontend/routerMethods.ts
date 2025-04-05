import { Params } from "react-router-dom";
import { postCartData, deleteFromCart, fetchCartData, fetchProductData, getTotalPrice, incrementQuantityCart } from "./shoppingCartApi";

const cartLoader = async (url: string) => {
    const cart = await fetchCartData(url)
    return {
        cartProducts: cart,
        total: getTotalPrice(cart),
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

const catalogItemLoader = async (url: string) => {
    return (await fetchProductData(url))[0];
}

const catalogItemAction = async (params: Params<string>, request: Request, url: string) => {
    const item = await catalogItemLoader(url + "/product/" + params.itemId);
    const form = await request.formData();
    const size = form.get("productSize")?.toString();
    const data: CartObjDto = {
        // need to add id property
        productId: item.id,
        productSize: size
    }
    postCartData(data, url + "/cart/add/");
    return null;
}

const catalogLoader = async (params: Params<string>, url: string) => {
    const returnCatalog = await fetchProductData(url) as CatalogArr;
    const gender = params.gender!;

    return {
        returnCatalog,
        gender
    }
}

export { cartLoader, cartItemsActions, catalogItemLoader, catalogItemAction, catalogLoader };