/// <reference types="vite/client" />

declare type User = {
    userEmail: string,
    userName: string,
    userPassword: string,
    userFirstName?: string,
    userLastName?: string,
    userCity?: string,
    userStreet?: string,
    userNumber?: string,
    userZip?: string
    userPhone?: string
}
declare type CatalogObj = { 
    id: string,
    productName: string,
    productGender: string,
    productImageUri: string,
    productPrice: Float32,
    productDesc?: string
};
declare type CartObj = { 
    id?: string, 
    productId: string 
    quantity: number, 
    productSize: string,
    product: CatalogObj 
};
declare type CartObjDto = {
    id?: string,
    productId: string,
    quantity?: int,
    productSize?: string
}
declare type CartCookies = {
    jwtToken?: string,
    cartProducts: CartObj
}
declare type CatalogArr = CatalogObj[];
declare type CartArr = CartObj[];
