import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ClearIcon from "@material-ui/icons/Clear";

import ModalActions from "./modalActions";
import IconButton from "../iconButton";

// styles used in this file
const useStyles = (props) =>
  makeStyles((theme) => ({
    paper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: props.width,
      minWidth: "300px",
      height: props.height,
      transform: "translate(-50%, -50%)",
      backgroundColor: 'white',
      boxShadow: theme.shadows[5],
      borderRadius: "10px",
      overflow: "hidden",
      outline: "none",
    },
    header: {
      position: "relative",
      height: "60px",
      backgroundColor: "#3F51B5",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0px 15px",
      boxSizing: "border-box",
    },
    mainContent: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      height: props.title ? "calc(100% - 60px)" : "100%",
    },
    childrenContainer: {
      position: 'relative',
      height: "calc(100% - 60px)",
      display: "flex",
      flexDirection: "column",
      alignItems: props.alignItems,
    },
    buttonContainer: {
      position: "relative",
      height: "75px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: props.btnContainerBgColor
    }
  }));

export default function SimpleModal({
  handleClose = null,
  children,
  width = "370px",
  height = "450px",
  btnContainerBgColor = "transparent",
  alignItems = "center",
  specificBtnProps,
  cancelBtnProps,
  title=null
}) {
  const classes = useStyles({ width, height, title, alignItems, btnContainerBgColor })();

  // modal container to show data
  return (
    <Modal open={true} onClose={handleClose}>
      <div className={classes.paper}>
        {title && (
          <div className={classes.header}>
            <span style={{ fontSize: "20px" }}>{title}</span>
            <IconButton
              Icon={(props) => <ClearIcon {...props} />}
              color="white"
              handleClick={handleClose}
            />
          </div>
        )}
        <div className={classes.mainContent}>
          <div className={classes.childrenContainer}>{children}</div>
          <ModalActions
            cancelBtnProps={cancelBtnProps}
            specificBtnProps={specificBtnProps}
            classes={classes}
          />
        </div>
      </div>
    </Modal>
  );
}
