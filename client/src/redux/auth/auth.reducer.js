import * as types from "./auth.types";

const init = {
    token: null,
    isAuth: false,
    loading: false,
    error: false,
    errorMessage: null,
}

export const authReducer = (state=init,{type,payload}) =>{
    switch(type){        
        case types.AUTH_LOADING : {
            return {...state,error: false, loading: true}
        }
        
        case types.AUTH_ERROR : {
            return {...state,error: true, loading: false}
        }
        
        case types.AUTH_LOGIN_SUCCESS : {
            return {...state,error: false, loading: false,isAuth: true, token: payload}
        }
        
        default: {
            return {...state}
        }
    }
}

