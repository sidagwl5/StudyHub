import { LOGIN_SUCCESS, LOGOUT_SUCCESS, GET_ALL_USERS_DATA, SET_LOGIN_SUCCESS_MODAL, FILTER_ALL_USERS_DATA_BY_ID } from "../types";
import axios from "../../utils/api";
import errorHandler from '../../utils/errorHandler';
import successHandler from '../../utils/successHandler';
import { removeDataInLocalStorage, setDataInLocalStorage } from '../../utils/localStorage';

export const logIn = () => async (dispatch) => {
  try {
    const { status, data } = await axios.get("/user/login");
    
    if(status === 200) {
        setDataInLocalStorage(data);
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        dispatch({ type: SET_LOGIN_SUCCESS_MODAL, payload: true });
    } 
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const logOut = () => async (dispatch) => {
  try {
    const { status } = await axios.get("/user/logout");
    if(status === 200) {
        removeDataInLocalStorage();
        dispatch({ type: LOGOUT_SUCCESS });
    } 
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const authenticate = () => async (dispatch) => {
  try {
    const { status } = await axios.get("/user/authenticate");
    if(status === 200) {
    } 
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const getAllUserDetails = () => async (dispatch) => {
  try {
    const { status, data } = await axios.get("/user/all");
    if(status === 200) {
      dispatch({ type: GET_ALL_USERS_DATA, payload: data });
    } 
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const { status, data } = await axios.delete(`/user/${id}`);
    if(status === 200) {
      dispatch({ type: FILTER_ALL_USERS_DATA_BY_ID, payload: id });
      dispatch(successHandler(data));
    } 
  } catch (error) {
    dispatch(errorHandler(error));
  }
};


export const assignAdminRole = (id) => async (dispatch) => {
  try {
    const { status, data } = await axios.post(`/user/${id}`);
    if(status === 200) {
      dispatch({ type: FILTER_ALL_USERS_DATA_BY_ID, payload: id });
      dispatch(successHandler(data));
    } 
  } catch (error) {
    dispatch(errorHandler(error));
  }
};
