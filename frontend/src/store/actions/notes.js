import { GET_NOTES, DELETE_NOTE, POST_NOTE } from "../types";
import axios from "../../utils/api";
import errorHandler from "../../utils/errorHandler";
import successHandler from "../../utils/successHandler";

export const getNotes = (notes) => (dispatch) => {
  dispatch({
    type: GET_NOTES,
    payload: notes,
  });
};

export const postNote = (note) => async (dispatch) => {
  try {
    const { status, data } = await axios.post(`/note`, note);
    if (status === 200) {
      dispatch(successHandler(data));
      dispatch({
        type: GET_NOTES,
        payload: data.notesData
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const deleteNote = (noteId) => async (dispatch) => {
  try {
    const { status, data } = await axios.delete(`/note/${noteId}`);

    if (status === 200) {
      dispatch(successHandler(data));
      dispatch({ type: DELETE_NOTE, payload: noteId });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};
