import {
  LOGOUT_SUCCESS,
  NOT_RECOGNIZED,
  GET_NOTES,
  DELETE_NOTE,
  REMIND_USER_ABOUT_NOTES_MODAL,
  REMIND_USER_ABOUT_NOTES,
} from "../types";

const initialState = {
  remindUserOfNoteModal: false,
  notes: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTES:
      return {
        ...state,
        notes: payload,
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id != payload),
      };

    case REMIND_USER_ABOUT_NOTES_MODAL:
      return {
        ...state,
        remindUserOfNoteModal: payload,
      };

    case REMIND_USER_ABOUT_NOTES:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note._id === payload) note["alert"] = true;
          return note;
        }),
        remindUserOfNoteModal: true,
      };

    case LOGOUT_SUCCESS:
    case NOT_RECOGNIZED:
      return initialState;

    default:
      return state;
  }
};
