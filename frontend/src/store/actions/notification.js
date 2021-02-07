import { GET_NOTIFICATIONS, FILTER_NOTIFICATIONS_BY_ID } from "../types";
import axios from "../../utils/api";
import errorHandler from "../../utils/errorHandler";

export const getNotificationsForUser = () => async (dispatch) => {
  try {
    const { data, status } = await axios.get(
      "/notification/getNotificationsForUser"
    );

    if (status === 200) {
      dispatch({ type: GET_NOTIFICATIONS, payload: data });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const deleteNotification = (id) => async (dispatch) => {
  try {
    const { status } = await axios.delete(
      `/notification/${id}`
    );

    if (status === 200) {
      dispatch({ type: FILTER_NOTIFICATIONS_BY_ID, payload: id });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};
