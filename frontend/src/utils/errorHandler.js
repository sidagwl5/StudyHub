import { SET_ALERT, NOT_RECOGNIZED } from "../store/types";

const errorHandler = (error) => (dispatch) => {
  if (error.response) {
    const { data, status } = error.response;

    if (status === 500) {
      dispatch({
        type: SET_ALERT,
        payload: { type: "error", message: "Server Error!" },
        dispatch,
      });
    } 
    
    else if (status === 401 || status === 403) {
      window.localStorage.removeItem("userData");
      dispatch({ type: NOT_RECOGNIZED });
      dispatch({
        type: SET_ALERT,
        payload: { type: "error", message: data.message },
      });
    } 
    
    else {
      dispatch({
        type: SET_ALERT,
        payload: { type: "error", message: data.message },
      });
    }
  }
};

export default errorHandler;
