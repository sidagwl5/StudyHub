import {
  GET_SPECIFIC_UPLOAD,
  GET_ALL_FILES_DATA,
  LOGOUT_SUCCESS,
  NOT_RECOGNIZED,
} from "../types";

const initialState = {
  allFilesData: [],
  specificFileData: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SPECIFIC_UPLOAD:
      return { ...state, specificFileData: payload };

    case GET_ALL_FILES_DATA:
      return { ...state, allFilesData: payload };

    case LOGOUT_SUCCESS:
    case NOT_RECOGNIZED:
      return null;

    default:
      return state;
  }
};
