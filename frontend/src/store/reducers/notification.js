import {
  GET_NOTIFICATIONS,
  LOGOUT_SUCCESS,
  NOT_RECOGNIZED,
  FILTER_NOTIFICATIONS_BY_ID,
  POST_NOTIFICATIONS,
  REPLACE_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "../types";

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATIONS:
      return payload;

    case POST_NOTIFICATIONS:
      return [payload, ...state];

    case DELETE_NOTIFICATION:
      return state.filter(notification => notification.id != payload);

    case REPLACE_NOTIFICATION:
      return [payload, ...state.filter((v) => v.id != payload.id)];

    case FILTER_NOTIFICATIONS_BY_ID:
      return state.filter((notification) => notification._id !== payload);

    case LOGOUT_SUCCESS:
    case NOT_RECOGNIZED:
      return initialState;

    default:
      return state;
  }
};
