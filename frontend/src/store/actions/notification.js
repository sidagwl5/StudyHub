import { GET_NOTIFICATIONS } from "../types";
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
