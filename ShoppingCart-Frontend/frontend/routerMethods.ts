import { Params, redirect } from "react-router-dom";
import { postCartData, deleteCartData, fetchCartData, fetchProductData } from "./shoppingCartApi";

const cartLoader = async (url: string) => {
    return await fetchCartData(url)
}

const cartItemsActions = async (request: Request, url: string) => {
    const formData = await request.formData();
    const increaseQuantity = JSON.parse(formData.get("increase") as string);
    const decreaseQuantity = JSON.parse(formData.get("decrease") as string);
    const deleteItem = JSON.parse(formData.get("delete") as string);
    const deleteAll = JSON.parse(formData.get("deleteAll") as string);
    if(deleteAll) await deleteCartData(url + "/cart");
    if(deleteItem) await deleteCartData(url + "/cart/delete/" + deleteItem.productId + "?size=" + deleteItem.productSize);
    if(increaseQuantity) await postCartData("", url + "/cart/qIncrement/" + increaseQuantity.productId + "?size=" + increaseQuantity.productSize);
    else if(decreaseQuantity) await deleteCartData(url + "/cart/qDecrement/" + decreaseQuantity.productId + "?size=" + decreaseQuantity.productSize);
    return redirect('/cart');
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
    console.log("data: ");
    console.log(data);
    return await postCartData(JSON.stringify(data), url + "/cart/add/");
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