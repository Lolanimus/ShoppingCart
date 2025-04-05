import { Params } from "react-router-dom";
import { postCartData, deleteCartData, fetchCartData, fetchProductData, getTotalPrice } from "./shoppingCartApi";

const cartLoader = async (url: string) => {
    const cart = await fetchCartData(url)
    return {
        cartProducts: cart,
        total: getTotalPrice(cart),
        buyDisabled: cart.length > 0 ? false : true,
    }
}

async function cartItemsActions(request: Request, url: string) {
    const formData = await request.formData();
    const increaseQuantity = JSON.parse(formData.get("increase") as string);
    const decreaseQuantity = JSON.parse(formData.get("decrease") as string);
    const deleteItem = JSON.parse(formData.get("delete") as string);
    const deleteAll = JSON.parse(formData.get("deleteAll") as string);
    if(deleteAll) deleteCartData(url + "/cart");
    if(deleteItem) deleteCartData(url + "/cart/delete/" + deleteItem.productId + "?size=" + deleteItem.productSize);
    if(increaseQuantity) postCartData(null, url + "/cart/qIncrement/" + increaseQuantity.productId + "?size=" + increaseQuantity.productSize);
    else if(decreaseQuantity) deleteCartData(url + "/cart/qDecrement/" + decreaseQuantity.productId + "?size=" + decreaseQuantity.productSize);
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