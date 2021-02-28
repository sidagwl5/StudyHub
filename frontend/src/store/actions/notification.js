import { GET_NOTIFICATIONS, FILTER_NOTIFICATIONS_BY_ID } from "../types";
import axios from "../../utils/api";
import errorHandler from "../../utils/errorHandler";

export const deleteNotification = (id, userId=null) => async (dispatch) => {
  try {
    console.log(userId);
    const { status } = await axios.post(`/notification/${id}`, userId);

    if (status === 200) {
      // dispatch({ type: FILTER_NOTIFICATIONS_BY_ID, payload: id });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};
