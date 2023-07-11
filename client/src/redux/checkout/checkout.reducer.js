import * as types from "./checkout.types";

const init = {
  loading: false,
  error: false,
  success:false,
  items: [],
  deliveryDetails: null,
};

export const checkoutReducer = (state = init, { type, payload }) => {
  switch (type) {
    case types.LOADING: {
      return { ...state, loading: true, error: false,success:false };
    }
    case types.ERROR: {
      return { ...state, loading: false, error: true,success:false };
    }
    case types.POST_CHECKOUT: {
      return { ...state, loading: false, error: false, items: payload,success:true };
    }
    case types.CHECKOUT_ADDRESS_UPDATE: {
      return {
        ...state,
        loading: false,
        error: false,
        deliveryDetails: payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};
