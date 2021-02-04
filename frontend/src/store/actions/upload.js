import { GET_SPECIFIC_UPLOAD, GET_ALL_FILES_DATA } from "../types";
import axios from "../../utils/api";
import errorHandler from '../../utils/errorHandler';
import successHandler from '../../utils/successHandler';

export const uploadFile = (fileData) => async dispatch => {

    try {
      const { status, data } = await axios.post("/upload", fileData);

      console.log(data);
      status === 200 && dispatch(successHandler(data));
        
    } catch (error) {
      console.log(error);
      dispatch(errorHandler(error));  
    }
}

export const getSpecificUpload = (fileId) => async (dispatch) => {
  try {
    const { status, data } = await axios.get(`/upload/${fileId}`);
    status === 200 && (
        dispatch({ type: GET_SPECIFIC_UPLOAD, payload: data })
    ) 
  } catch (error) {
    dispatch(errorHandler(error));
  }
};


export const getAllFilesData = () => async (dispatch) => {
  try {
    const { status, data } = await axios.get(`/upload`);
    status === 200 && (
        dispatch({ type: GET_ALL_FILES_DATA, payload: data })
    ) 
  } catch (error) {
    dispatch(errorHandler(error));
  }
};