import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  NOT_RECOGNIZED,
  GET_ALL_USERS_DATA,
  SET_LOGIN_SUCCESS_MODAL,
  UNSET_LOGIN_SUCCESS_MODAL,
  FILTER_ALL_USERS_DATA_BY_ID,
  SET_SPECIFIC_USER_DATA,
  UNSET_SPECIFIC_USER_DATA,
  GET_USER_UPLOADS
} from "../types";
import { getDataInLocalStorage } from "../../utils/localStorage";

const initialState = {
  persistantUserData: getDataInLocalStorage(),
  userProfile: null,
  allUsersData: [],
  setLoginSuccessModal: false,
  specificUserData: null,
  approvedUploads: 0
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, persistantUserData: payload };

    case SET_LOGIN_SUCCESS_MODAL:
      return { ...state, setLoginSuccessModal: payload };

    case UNSET_LOGIN_SUCCESS_MODAL:
      return { ...state, setLoginSuccessModal: payload };

    case GET_ALL_USERS_DATA:
      return { ...state, allUsersData: payload };

    case GET_USER_UPLOADS:
      return { ...state, approvedUploads: payload };  

    // can be combined to one only  
    case SET_SPECIFIC_USER_DATA:
      return { ...state, specificUserData: payload }; 

    case UNSET_SPECIFIC_USER_DATA:
      return { ...state, specificUserData: payload };  

    case FILTER_ALL_USERS_DATA_BY_ID:
      return {
        ...state,
        allUsersData: state.allUsersData.filter((user) => user._id != payload),
      };

    case LOGOUT_SUCCESS:
    case NOT_RECOGNIZED:
      return { ...state, persistantUserData: null };

    default:
      return state;
  }
};
