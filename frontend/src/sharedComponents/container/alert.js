import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertPresentation from "../presentation/alert";

const Alert = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: "UNSET_ALERT" });
  };
  return (
    alert && (
      <AlertPresentation
        onClose={handleClick}
        message={alert.message}
        type={alert.type}
      />
    )
  );
};

export default Alert;
