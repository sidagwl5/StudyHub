import {
  GET_SPECIFIC_UPLOAD,
  GET_ALL_FILES_DATA,
  LOGOUT_SUCCESS,
  NOT_RECOGNIZED,
  FILTER_ALL_FILES_DATA_BY_ID,
  GET_FAVOURITE_FILES,
  GET_LATEST_FILES,
} from "../types";

const initialState = {
  allFilesData: [],
  specificFileData: null,
  favouriteFiles: [],
  latestFiles: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SPECIFIC_UPLOAD:
      return { ...state, specificFileData: payload };

    case GET_ALL_FILES_DATA:
      return { ...state, allFilesData: payload };

    case GET_FAVOURITE_FILES:
      return { ...state, favouriteFiles: payload };

    case GET_LATEST_FILES:
      return { ...state, latestFiles: payload };

    case FILTER_ALL_FILES_DATA_BY_ID:
      let allFilesData = [];

      if (payload.type === "delete") {
        allFilesData = state.allFilesData.filter(
          (file) => file._id != payload.data
        );
      } else if (payload.type === "status") {
        allFilesData = state.allFilesData.map((file) => {
          if (file._id == payload.data) {
            file.status = "Accepted";
          }

          return file;
        });
      } else if (payload.type === "post") {
        allFilesData = [...state.allFilesData, payload.data];
      } else if (payload.type === "addToFavourites") {
        allFilesData = state.allFilesData.map((file) => {
          if (file._id == payload.data) {
            file.favourites++;
          }

          return file;
        });
      } else if (payload.type === "removeFromFavourites") {
        allFilesData = state.allFilesData.map((file) => {
          if (file._id == payload.data) {
            file.favourites--;
          }

          return file;
        });
      }
      return {
        ...state,
        allFilesData,
      };

    case LOGOUT_SUCCESS:
    case NOT_RECOGNIZED:
      return initialState;

    default:
      return state;
  }
};
