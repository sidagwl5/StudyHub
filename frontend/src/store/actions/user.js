import { LOGIN_SUCCESS, ERROR, SUCCESS } from "../types";
import axios from "../../utils/api";
import errorHandler from '../../utils/errorHandler';

export const authenticate = () => async (dispatch) => {
  try {
    const { status, data } = await axios.get("/user/auth");
    if(status === 200) {
        window.localStorage.setItem('userData', JSON.stringify(data));
        dispatch({ type: LOGIN_SUCCESS, payload: data })
    } 
  } catch (error) {
    dispatch(errorHandler(error));
  }
};
