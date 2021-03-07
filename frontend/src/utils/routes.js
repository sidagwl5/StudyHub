import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import Home from "../screens/home/presentation";
import UploadHub from "../screens/uploadHub/presentation";
import blogHub from "../screens/blogHub/presentation";
import Users from "../screens/users/presentation";
import Profile from "../screens/profile/presentation";
import ReviewPage from "../screens/review/presentation";
import NotFoundPage from "../screens/NotFoundPage/presentation";
import { useDispatch } from 'react-redux';
import { authenticate } from "../store/actions/user";

export default () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.localStorage.getItem("logIn")) {
      dispatch(authenticate(true));
    } else if (localStorage.getItem("isLoggedIn")) {
      dispatch(authenticate());
    }
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <ProtectedRoute path="/users/:id*" component={Users} />
      <ProtectedRoute path="/uploadhub/:id*" component={UploadHub} />
      <ProtectedRoute path="/bloghub/:id*" component={blogHub} />
      <ProtectedRoute path="/review/:id" component={ReviewPage} />
      <ProtectedRoute path="/profile/:id*" component={Profile} />
      <NotFoundPage 
       title="404"
       subtitle="Page not found"
       para="The page you are look for is not available on this site"
       button
      />
    </Switch>
  );
};
