import { SET_ALERT } from "../store/types";

const successHandler = (data) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { type: "success", message: data.message },
  });
};

export default successHandler;
