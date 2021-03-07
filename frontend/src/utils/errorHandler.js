import { SET_ALERT, NOT_RECOGNIZED, INTERNET_DISCONNECTED_ERROR } from "../store/types";
import { removeDataInLocalStorage } from './localStorage';

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
      removeDataInLocalStorage();
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
  else{
    dispatch({ type: INTERNET_DISCONNECTED_ERROR });
  }
};

export default errorHandler;
