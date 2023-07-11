import * as types from "./product.types";
import axios from "axios";

//action object functions
const productLoading = () => {
  return { type: types.PRODUCT_LOADING };
};

const productError = () => {
  return { type: types.PRODUCT_ERROR };
};

const productSuccess = (payload) => {
  return { type: types.PRODUCT_GET_SUCCESS, payload };
};

const getSingleProductSuccess = (payload) => {
  return { type: types.SINGLE_PRODUCT_GET_SUCCESS, payload };
};

// redux function to change reducers state ( we will pass the action object inside dispatch to update the redux state );
export const getProducts = (searchObj) => async (dispatch) => {
  dispatch(productLoading());

  try {
    // let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`, {
    //   params: {
    //     category: searchObj?.category,
    //     search: searchObj?.search
    //   },
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // });

    let res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_URL}/products`,
      params: {
        category: searchObj?.categories,
        search: searchObj?.search,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const res_data = res.data;
    console.log("res_data", res_data);
    dispatch(productSuccess(res_data.result));
  } catch (err) {
    dispatch(productError());
  }
};

//get single product
export const getSingleProducts = (id) => async (dispatch) => {
  dispatch(productLoading());
  console.log("get single products called");
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/products/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const res_data = res.data;
    console.log("res_data single--", res_data);
    dispatch(getSingleProductSuccess(res_data.result));
  } catch (err) {
    dispatch(productError());
  }
};