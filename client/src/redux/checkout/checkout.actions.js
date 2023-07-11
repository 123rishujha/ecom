import * as types from "./checkout.types";

// export const getCheckout = () =>{
//     return {type: types.GET_CHECKOUT}
// }

export const postCheckOut = (payload) => {
    console.log("payload from postCheckOut",payload);
    return {type: types.POST_CHECKOUT, payload}
}

export const checkoutAddressUpdate = (payload) => {
    return { type: types.CHECKOUT_ADDRESS_UPDATE,payload}
}

