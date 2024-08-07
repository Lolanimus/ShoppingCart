import path from "path";
import fs from "fs";
import { CartArr } from "./shoppingCartApi";

function rewriteCart(updatedData: CartArr) {
    fs.writeFileSync(path.resolve(__dirname, "./cart.json"), JSON.stringify(updatedData, null, 2));
}

export {
    rewriteCart
}