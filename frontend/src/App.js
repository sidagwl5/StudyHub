import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import ProtectedRoute from "./utils/protectedRoute";
import Home from "./screens/home/presentation";
import UploadHub from "./screens/uploadHub/presentation";
import Users from "./screens/users/presentation";
import history from "./utils/createHistory";
import {
  logIn,
  authenticate,
  getSuccessfullUploads,
} from "./store/actions/user";
import store from "./store";
import Loader from "./sharedComponents/presentation/loader";
import Alert from "./sharedComponents/container/alert";
import ReviewPage from "./screens/review/presentation";

const App = () => {
  const dispatch = store.dispatch;
  const userData = store.getState().user.persistantUserData;

  useEffect(() => {
    window.localStorage.getItem("login") && dispatch(logIn());
  }, [dispatch]);

  useEffect(() => {
    userData && dispatch(authenticate());
  }, [dispatch]);

  useEffect(() => {
    userData && !userData.isAdmin && dispatch(getSuccessfullUploads());
  }, [userData]);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/users/:id*" component={Users} />
          <ProtectedRoute path="/uploadhub/:id*" component={UploadHub} />
          <ProtectedRoute path="/review/:id" component={ReviewPage} />
        </Switch>
        <Loader />
      </Router>
    </Provider>
  );
};

export default App;
