import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  NOT_RECOGNIZED,
  GET_ALL_USERS_DATA,
  SET_LOGIN_SUCCESS_MODAL,
  UNSET_LOGIN_SUCCESS_MODAL,
  FILTER_ALL_USERS_DATA_BY_ID,
} from "../types";
import { getDataInLocalStorage } from "../../utils/localStorage";

const initialState = {
  persistantUserData: getDataInLocalStorage(),
  userProfile: null,
  allUsersData: [],
  setLoginSuccessModal: false,
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
