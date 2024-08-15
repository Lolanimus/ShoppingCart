import { Params } from "react-router-dom";
import { addToCart, fetchData, getCatalog, incrementQuantityCart } from "./shoppingCartApi";
import { getCart } from "./cart";

const catalog = await fetchData("https://fakestoreapi.com/products/1");
type ReturnCatalog = ReturnType<typeof catalogLoader>;

const isInCart = (itemId: number) => {
    getCart().forEach(obj => {
        if(obj.id === itemId) return true;
    });
    
    return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const catalogLoader = (params: Params<string>) => {
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

const catalogItemLoader = (params: Params<string>) => {
  const itemId = params.itemId!;
  const gender = params.sex!;
  const returnCatalog = getCatalog(gender, catalog);
  returnCatalog.filter(obj => obj.id === parseInt(itemId));
  const item = returnCatalog[0];
  return item;
}

const catalogItemAction = async (params: Params<string>, request: Request) => {
  const itemId = parseInt(params.itemId!);
  const item = catalogItemLoader(params);
  const form = await request.formData();
  const size = form.get("size");
  console.log(isInCart(itemId));
  if(isInCart(itemId)) incrementQuantityCart(itemId, true);
  else addToCart(item, size?.toString());
  return null;
}

export {
    catalogLoader,
    catalogItemLoader,
    catalogItemAction
}

export type {
    ReturnCatalog
}