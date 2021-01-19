import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import ProtectedRoute from "./utils/protectedRoute";
import Login from "./screens/login/presentation";
import Home from "./screens/home/presentation";
import UploadHub from './screens/uploadHub/presentation';
import history from './utils/createHistory';
import { authenticate } from './store/actions/user';
import store from "./store";
import Loader from './sharedComponents/presentation/loader';

const App = () => {

  const dispatch = store.dispatch;

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch])

  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/login" component={Login} />
          <ProtectedRoute path="/uploadhub" component={UploadHub} />
        </Switch>
        <Loader /> 
      </Router>
    </Provider>
  );
};

export default App;
