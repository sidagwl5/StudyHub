import {
  LOGOUT_SUCCESS,
  NOT_RECOGNIZED,
  GET_NOTES,
  DELETE_NOTE,
  POST_NOTE,
} from "../types";

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTES:
      return payload;

    case DELETE_NOTE:
      return state.filter((note) => note._id != payload);

    case LOGOUT_SUCCESS:
    case NOT_RECOGNIZED:
      return initialState;

    default:
      return state;
  }
};
