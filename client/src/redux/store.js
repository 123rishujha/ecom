import {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";

//reducers
import { authReducer } from "./auth/auth.reducer";
import { productReducer } from "./product/product.reducers";
import { checkoutReducer } from "./checkout/checkout.reducer";

const rootReducer = combineReducers({
  authReducer,
  productReducer,
  checkoutReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);
