import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute(props) {
  const userData = useSelector((state) => state.user);

  if (userData) {
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
