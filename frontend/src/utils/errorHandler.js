import { ERROR, NOT_RECOGNIZED } from "../store/types";
import history from './createHistory';


const errorHandler = (error) => (dispatch) => {
  if (error.response) {
    const { message, status } = error.response;

    dispatch({ type: ERROR, payload: message });

    if (status === 401 || status === 403) {
      window.localStorage.removeItem("userData");
      dispatch({ type: NOT_RECOGNIZED });
    }
  }
};

export default errorHandler;
