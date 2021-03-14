import { GET_NOTES, DELETE_NOTE, REMIND_USER_ABOUT_NOTES } from "../types";
import axios from "../../utils/api";
import errorHandler from "../../utils/errorHandler";
import successHandler from "../../utils/successHandler";

export const getNotes = (notes) => (dispatch) => {

  const modifiedNotes = notes.map(v => {
    if(v.reminder){
      const date = new Date(v.reminder);
      const now = new Date();
      if((date - now) <= 0) v['alert'] = true;
      else v['alert'] = false;
    }
    else{
      v['alert'] = false;
    }

    return v;
  })

  dispatch({
    type: GET_NOTES,
    payload: modifiedNotes,
  });
};

export const remindUserAboutNotes = (noteId) => (dispatch) => {
  dispatch({
    type: REMIND_USER_ABOUT_NOTES,
    payload: noteId,
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
