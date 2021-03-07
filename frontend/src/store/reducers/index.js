import userReducer from "./user";
import loadingReducer from "./loading";
import notificationReducer from "./notification";
import uploadReducer from "./upload";
import alertReducer from "./alert";
import blogReducer from "./blog";
import internetConnectivityReducer from './internetConnectivity';

import { combineReducers } from "redux";

export default combineReducers({
  user: userReducer,
  loading: loadingReducer,
  notification: notificationReducer,
  upload: uploadReducer,
  alert: alertReducer,
  blog: blogReducer,
  internetConnectivity: internetConnectivityReducer 
});
