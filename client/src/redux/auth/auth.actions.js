import * as types from "./auth.types";
import axios from "axios";

//action object functions
const authLoading = () => {
  return { type: types.AUTH_LOADING };
};

const authError = () => {
  return { type: types.AUTH_ERROR };
};

const authSuccess = (token) => {
  return { type: types.AUTH_LOGIN_SUCCESS, payload: token };
};

// redux function to change reducers state ( we will pass the action object inside dispatch to update the redux state );

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(authLoading());
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/login`,
        {
          email,
          password,
        }
      );
      let result = res.data;
      console.log("login", result);
      localStorage.setItem("token", result.token);
      dispatch(authSuccess(result?.token));
    } catch (err) {
      console.log("login error message", err.message);
      dispatch(authError());
    }
  };
