import React from "react";
import Button from "@material-ui/core/Button";

const ModalActions = ({
  btnTitle,
  action,
  cancelAction,
  disabled = false,
  classes,
}) => (
  <div className={classes.buttonContainer}>
    {btnTitle && (
      <Button
        variant="text"
        size="large"
        style={{ margin: "0px 10px" }}
        color="primary"
        onClick={action}
        disabled={disabled}
      >
        {btnTitle}
      </Button>
    )}

    <Button
      variant="text"
      size="large"
      style={{ color: "red" }}
      onClick={cancelAction}
    >
      Cancel
    </Button>
  </div>
);

export default ModalActions;
