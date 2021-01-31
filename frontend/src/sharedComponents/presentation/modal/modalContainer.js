import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

// styles used in this file
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: "10px",
    overflow: "hidden",
    outline: 'none'
  },
  header: {
    position: "relative",
    height: "60px",
    width: "100%",
    backgroundColor: "#3F51B5",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0px 15px",
    boxSizing: "border-box",
    color: "white",
  },
  mainContent: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

export default function SimpleModal({
  handleClose,
  children,
  width = null,
  title = null,
  height = null,
}) {
  const classes = useStyles();
  const modalWidth = width || 400;
  const modalHeight = height || 450;

  // modal container to show data
  return (
    <Modal open={true} onClose={handleClose}>
      {
        <div
          style={{ width: modalWidth, height: modalHeight }}
          className={classes.paper}
        >
          {title && (
            <div className={classes.header}>
              <span style={{ fontSize: "20px" }}>{title}</span>
              <IconButton onClick={handleClose}>
                <ClearIcon style={{ color: "white" }} />
              </IconButton>
            </div>
          )}
          <div
            className={classes.mainContent}
            style={{ height: title ? "calc(100% - 60px)" : "100%" }}
          >
            {children}
          </div>
        </div>
      }
    </Modal>
  );
}
