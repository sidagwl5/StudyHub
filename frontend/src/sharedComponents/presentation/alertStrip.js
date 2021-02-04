import React from "react";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

const AlertStrip = ({ type, message, onClose }) => {
  const mapper = {
    Pending: "warning",
  };

  const props = {
    severity: mapper[type] || type,
  };

  if (onClose) props.action = <CloseIcon fontSize="small" onClick={onClose} />;

  return <Alert {...props}>{message}</Alert>;
};

export default AlertStrip;
