import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute(props) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return (
      <Route
        {...props}
        render={(params) => {
          return <props.component {...params} />;
        }}
      />
    );
  } else {
    return <Redirect to="/" />;
  }
}
