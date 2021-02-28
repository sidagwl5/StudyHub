import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  NOT_RECOGNIZED,
  GET_ALL_USERS_DATA,
  SET_LOGIN_SUCCESS_MODAL,
  FILTER_ALL_USERS_DATA_BY_ID,
  SET_SPECIFIC_USER_DATA,
  GET_USER_PROFILE,
  UPDATE_PROFILE,
} from "../types";
import { getDataInLocalStorage } from "../../utils/localStorage";

const initialState = {
  isLoggedIn: getDataInLocalStorage(),
  userProfile: null,
  allUsersData: [],
  setLoginSuccessModal: false,
  specificUserData: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true };

    case SET_LOGIN_SUCCESS_MODAL:
      return { ...state, setLoginSuccessModal: payload };

    case GET_ALL_USERS_DATA:
      return { ...state, allUsersData: payload };

    case GET_USER_PROFILE:
      return { ...state, userProfile: payload };

    // can be combined to one only
    case SET_SPECIFIC_USER_DATA:
      return { ...state, specificUserData: payload };

    case FILTER_ALL_USERS_DATA_BY_ID:
      let allUsersData = [];
      if (payload.type === "delete") {
        allUsersData = state.allUsersData.filter(
          (user) => user._id != payload.data
        );
      }

      return {
        ...state,
        allUsersData,
      };

    case UPDATE_PROFILE:
      let userProfile = { ...state.userProfile };

      if (payload.type === "addToFavourites") {
        userProfile.favourites.push(payload.data);
      }

      if (payload.type === "removeFromFavourites") {
        userProfile.favourites = userProfile.favourites.filter(
          (v) => v != payload.data
        );
      }

      return {
        ...state,
        userProfile,
      };

    case LOGOUT_SUCCESS:
    case NOT_RECOGNIZED:
      return { ...initialState, isLoggedIn: false };

    default:
      return state;
  }
};
