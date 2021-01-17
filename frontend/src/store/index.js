import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"

import parentReducer from "./reducers"

const middleWares = [thunk];

const userData = window.localStorage.getItem("userData");
const initialState = {
    user: JSON.parse(userData)
}

const store = createStore(
  parentReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWares))
);

export default store;
