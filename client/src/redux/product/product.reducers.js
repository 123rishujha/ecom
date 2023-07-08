import * as types from "./product.types";

const init = {
    loading: false,
    error: false,
    products: []
}

export const productReducer = (state=init,{type,payload}) =>{
    switch(type){
        
        case types.PRODUCT_LOADING : {
            return {...state,loading:true,error:false,}
        }
        
        case types.PRODUCT_ERROR : {
            return {...state,loading:false,error: true}
        }
        case types.PRODUCT_GET_SUCCESS : {
            return {...state,loading:false,error:false,products:payload}
        }
        
        default : {
            return {...state}
        }
    }
}