import userReducer from './user';
import loadingReducer from './loading';
import notificationReducer from './notification';

import { combineReducers } from 'redux';

export default combineReducers({
    user: userReducer,
    loading: loadingReducer,
    notification: notificationReducer
})