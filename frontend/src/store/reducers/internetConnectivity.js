import { INTERNET_DISCONNECTED_ERROR } from "../types";

export default (state = true, action) => {
  const { type } = action;

  switch (type) {
    case INTERNET_DISCONNECTED_ERROR:
      return false;

    default:
      return state;
  }
};
