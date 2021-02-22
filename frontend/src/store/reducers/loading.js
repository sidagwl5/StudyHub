import { SET_LOADER, UNSET_LOADER } from "../types";

export default (state = 0, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADER:
      return payload;

    case UNSET_LOADER:
      return payload;

    default:
      return state;
  }
};
