import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import ProtectedRoute from "./utils/protectedRoute";
import Home from "./screens/home/presentation";
import UploadHub from "./screens/uploadHub/presentation";
import blogHub from "./screens/blogHub/presentation";
import Users from "./screens/users/presentation";
import Profile from "./screens/profile/presentation";
import history from "./utils/createHistory";
import { authenticate } from "./store/actions/user";
import store from "./store";
import Loader from "./sharedComponents/presentation/loader";
import Alert from "./sharedComponents/container/alert";
import ReviewPage from "./screens/review/presentation";

const App = () => {
  const dispatch = store.dispatch;

  useEffect(() => {
    if (window.localStorage.getItem("logIn")) {
      dispatch(authenticate(true));
    } 
    
    else if (window.localStorage.getItem("isLoggedIn")) {
      dispatch(authenticate());
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/users/:id*" component={Users} />
          <ProtectedRoute path="/uploadhub/:id*" component={UploadHub} />
          <ProtectedRoute path="/bloghub/:id*" component={blogHub} />
          <ProtectedRoute path="/review/:id" component={ReviewPage} />
          <ProtectedRoute path="/profile/:id*" component={Profile} />
        </Switch>
        <Loader />
      </Router>
    </Provider>
  );
};

export default App;
