import { GET_NOTIFICATIONS, DELETE_NOTIFICATION, POST_NOTIFICATIONS, REPLACE_NOTIFICATION } from "../types";
import axios from "../../utils/api";
import errorHandler from "../../utils/errorHandler";


export const getNotifications = notifications => dispatch => {
  dispatch({
    type: GET_NOTIFICATIONS,
    payload: notifications
  })
}

export const postNotification = notificationData => dispatch => {
  dispatch({
    type: POST_NOTIFICATIONS,
    payload: notificationData
  })
}

export const replaceNotification = notificationData => dispatch => {
  dispatch({
    type: REPLACE_NOTIFICATION,
    payload: notificationData
  })
}

export const deleteNotification = (id, userId=null) => async (dispatch) => {
  try {
    console.log(userId);
    const { status } = await axios.post(`/notification/${id}`, userId);

    if (status === 200) {
      dispatch({ type: DELETE_NOTIFICATION, payload: id });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};
