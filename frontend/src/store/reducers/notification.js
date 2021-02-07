import { GET_NOTIFICATIONS, LOGOUT_SUCCESS, NOT_RECOGNIZED, FILTER_NOTIFICATIONS_BY_ID } from "../types";

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATIONS:
      return payload;

    case FILTER_NOTIFICATIONS_BY_ID:
      return state.filter(notification => notification._id !== payload);  

    case LOGOUT_SUCCESS:
    case NOT_RECOGNIZED:
      return [];

    default:
      return state;
  }
};
