const fetchProductData = async (url: string): Promise<CatalogArr> => {
    let res: CatalogArr = [];
    
    try {
        const data = await fetch(url, {
            mode: "cors",
            method: "GET"
        })!;
        if(data.ok && data.status == 200) {
            const json: CatalogArr | CatalogObj = await data.json()!;
            res = json !instanceof Array ? json : [json];
        } else {
            throw { code: data.status, message: data.statusText };
        }
    } catch (error: unknown) {
        console.error("Error: " + error);
    }

    return res;
}

const fetchCartData = async (url: string): Promise<CartArr> => {
    let res: CartArr = [];
    
    try {
        const data = await fetch(url, {
            mode: "cors",
            method: "GET",
            credentials: "include"
        })!;
        if(data.ok && data.status == 200) {
            const json: CartArr | CartObj = await data.json()!;
            res = json !instanceof Array ? json : [json];
        } else {
            throw { code: data.status, message: data.statusText };
        }
    } catch (error: unknown) {
        console.error("Error: " + error);
    }

    return res;
}

const postCartData = async (params: string, url: string, cors: boolean = true): Promise<Response | null> => {
    let response = null;
    try {
        response = await fetch(url, {
            mode: cors ? "cors" : "no-cors",
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: params
        })!;
        if(!response.ok) {
            //throw { code: response.status, message: response.statusText };
        }
    } catch (error: unknown) {
        console.error("Error: " + error);
    }

    return response;
} 

const deleteCartData = async (url: string): Promise<boolean> => {
    let result: boolean = false;

        const response = await fetch(url, {
            mode: "cors",
            method: "DELETE",
            credentials: "include",
        })!;
        if(response.ok && response.status == 200) {
            result = true;
        } else {
            //throw { code: response.status, message: response.statusText };
        }


    return result;
}

const getTotalPrice = (cart: CartArr) => {
    let totalPrice = 0;
    cart.forEach((item) => {
        totalPrice += item.quantity * item.product.productPrice;
    })
    return parseFloat(totalPrice.toFixed(2));
}

export { fetchCartData, postCartData, fetchProductData, deleteCartData, getTotalPrice };
