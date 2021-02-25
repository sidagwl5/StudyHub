import React from "react";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import IconButton from "../iconButton";

const UpdateFileNotice = ({ message, type, onReject, onAccept }) => {
  return (
    <Alert
      style={{ alignItems: "center" }}
      severity={type}
      action={
        <>
          <IconButton
            Icon={(props) => <CheckIcon {...props} />}
            handleClick={onAccept}
          />
          <IconButton
            Icon={(props) => <CloseIcon {...props} />}
            handleClick={onReject}
          />
        </>
      }
    >
      {message}
    </Alert>
  );
};

export default UpdateFileNotice;
