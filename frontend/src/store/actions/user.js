import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_ALL_USERS_DATA,
  SET_LOGIN_SUCCESS_MODAL,
  SET_SPECIFIC_USER_DATA,
  GET_USER_PROFILE,
  UPDATE_ALL_USERS_DATA,
  UPDATE_SPECIFIC_USER_DATA
} from "../types";
import axios from "../../utils/api";
import errorHandler from "../../utils/errorHandler";
import successHandler from "../../utils/successHandler";
import { getNotifications } from './notification';
import { getNotes } from './notes';
import {
  removeDataInLocalStorage,
  setDataInLocalStorage,
} from "../../utils/localStorage";

export const authenticate = (check) => async (dispatch) => {
  window.localStorage.removeItem("logIn");
  try {
    const { data, status } = await axios.get("/user/authenticate");
    if (status === 200) {

      const { notifications, notes, ...rest } = data;
      if (check) {
        setDataInLocalStorage();
        dispatch({ type: LOGIN_SUCCESS });
        dispatch({ type: SET_LOGIN_SUCCESS_MODAL, payload: true });
      }
      dispatch({ type: GET_USER_PROFILE, payload: rest });
      dispatch(getNotifications(notifications));
      dispatch(getNotes(notes));
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const logOut = () => async (dispatch) => {
  try {
    const { status } = await axios.get("/user/logout");
    if (status === 200) {
      removeDataInLocalStorage();
      dispatch({ type: LOGOUT_SUCCESS });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const getAllUserDetails = () => async (dispatch) => {
  try {
    const { status, data } = await axios.get("/user/all");
    if (status === 200) {
      dispatch({ type: GET_ALL_USERS_DATA, payload: data });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const { status, data } = await axios.delete(`/user/${id}`);
    if (status === 200) {
      dispatch({
        type: UPDATE_ALL_USERS_DATA,
        payload: { type: "delete", data: id },
      });
      dispatch(successHandler(data));
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    const { status, data } = await axios.patch(`/user/${id}`, userData);
    if (status === 200) {
      dispatch(successHandler(data));
      dispatch({ 
        type: UPDATE_SPECIFIC_USER_DATA,
        payload: data.userData 
      });
      dispatch(getAllUserDetails());
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const getSpecificUser = (userId) => async (dispatch) => {
  try {
    const { status, data } = await axios.get(`/user/${userId}`);
    status === 200 && dispatch({ type: SET_SPECIFIC_USER_DATA, payload: data });
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const adminRoleRequest = () => async (dispatch) => {
  try {
    const { status, data } = await axios.get(`/user/adminRole`);
    if (status === 200) {
      dispatch(successHandler(data));
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};
