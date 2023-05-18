// import { useNavigate } from "react-router-dom";
import * as AuthApi from "../api/AuthRequest";

export const LogIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("/", { replace: true });
  } catch (e) {
    console.log(e);
    dispatch({ type: "AUTH_FAIL", data: e?.response.data });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
