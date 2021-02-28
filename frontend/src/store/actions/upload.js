import {
  GET_SPECIFIC_UPLOAD,
  GET_ALL_FILES_DATA,
  FILTER_ALL_FILES_DATA_BY_ID,
  FILTER_ALL_USERS_DATA_BY_ID,
  UPDATE_PROFILE,
  GET_FAVOURITE_FILES,
  GET_LATEST_FILES
} from "../types";
import axios from "../../utils/api";
import errorHandler from "../../utils/errorHandler";
import successHandler from "../../utils/successHandler";
import history from "../../utils/createHistory";

export const uploadFile = (fileData) => async (dispatch) => {
  try {
    const { status, data } = await axios.post("/upload", fileData);

    if (status === 200) {
      history.push("/");
      dispatch(successHandler(data));
      dispatch({
        type: FILTER_ALL_FILES_DATA_BY_ID,
        payload: { type: "post", data: data.fileData },
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(errorHandler(error));
  }
};

export const getSpecificUpload = (fileId) => async (dispatch) => {
  try {
    const { status, data } = await axios.get(`/upload/${fileId}`);
    status === 200 && dispatch({ type: GET_SPECIFIC_UPLOAD, payload: data });
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const getAllFilesData = () => async (dispatch) => {
  try {
    const { status, data } = await axios.get(`/upload`);
    status === 200 && dispatch({ type: GET_ALL_FILES_DATA, payload: data });
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const uploadReject = (id) => async (dispatch) => {
  try {
    const { status, data } = await axios.delete(`/upload/${id}`);
    if (status === 200) {
      dispatch({
        type: FILTER_ALL_FILES_DATA_BY_ID,
        payload: { type: "delete", data: id },
      });
      dispatch(successHandler(data));
      history.push("/");
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const uploadAccept = (id) => async (dispatch) => {
  try {
    const { status, data } = await axios.post(`/upload/${id}`);
    if (status === 200) {
      dispatch({
        type: FILTER_ALL_FILES_DATA_BY_ID,
        payload: { type: "status", data: id },
      });
      dispatch(successHandler(data));
      history.push("/");
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const updateUpload = (id, data) => async (dispatch) => {
  try {
    console.log(data);
    const { status } = await axios.patch(`/upload/${id}`, data);
    if (status === 200) {
      dispatch({
        type: FILTER_ALL_FILES_DATA_BY_ID,
        payload: { type: data.type, data: id },
      });
      dispatch({
        type: UPDATE_PROFILE,
        payload: { type: data.type, data: id },
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};


export const deleteUpload = (uploadId) => async dispatch => {
  try {
    const { status, data } = await axios.delete(`/upload/delete/${uploadId}`);
    if(status === 200){
      history.push("/");
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
}


export const getFavouriteFilesData = () => async dispatch => {
  try {
    const { status, data } = await axios.get(`/upload/favourites/all`);
    status === 200 && dispatch({ type: GET_FAVOURITE_FILES, payload: data });
  } catch (error) {
    dispatch(errorHandler(error));
  }
}

export const getLatestFilesData = () => async dispatch => {
  try {
    const { status, data } = await axios.get(`/upload/latest/all`);
    status === 200 && dispatch({ type: GET_LATEST_FILES, payload: data });
  } catch (error) {
    dispatch(errorHandler(error));
  }
}
