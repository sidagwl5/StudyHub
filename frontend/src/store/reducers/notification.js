import { GET_NOTIFICATIONS, LOGOUT_SUCCESS, NOT_RECOGNIZED } from "../types";

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATIONS:
      return payload;

    case (LOGOUT_SUCCESS, NOT_RECOGNIZED):
      return [];

    default:
      return state;
  }
};
