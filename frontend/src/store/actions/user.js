import { LOGIN_SUCCESS, LOGOUT_SUCCESS, GET_ALL_USERS_DATA, SET_LOGIN_SUCCESS_MODAL } from "../types";
import axios from "../../utils/api";
import errorHandler from '../../utils/errorHandler';
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

      const columns = [];
      if(data.length){

        for(let key in data[0]){

          if(key === 'firstName' || key === 'lastName' || key === 'imageUrl' || key === 'uploads')
          columns.push({
            id: key,
            label: key[0].toUpperCase() + key.substring(1, ),
            align: 'center'
          })
        }
      }
      dispatch({ type: GET_ALL_USERS_DATA, payload: { data, columns } });
    } 
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

