import { SET_ALERT, UNSET_ALERT } from "../types";

export default (state = null, action) => {
  
  const { type, payload, dispatch } = action;
  switch (type) {
    case SET_ALERT:
      return payload;

    case UNSET_ALERT:
      return null;

    default:
      return state;
  }
};
