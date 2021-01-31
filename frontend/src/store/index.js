import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"

import parentReducer from "./reducers"

const middleWares = [thunk];

const store = createStore(
  parentReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleWares))
);

export default store;
