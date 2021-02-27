import React from "react";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

const mapper = {
  Pending: "warning",
  Rejected: "error",
  Approved: "success",
  Request: 'warning'
};

const AlertStrip = ({ type, onClose = null, children }) => {
  const props = {
    severity: mapper[type] || type,
  };

  if (onClose) props.action = <CloseIcon fontSize="small" onClick={onClose} />;
  return (
    <Alert {...props} style={{ alignItems: "center" }}>
      {children}
    </Alert>
  );
};

export default AlertStrip;
