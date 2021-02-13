import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import AlertStrip from "./alertStrip";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertPresentation = ({ onClose, message, type }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={true}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={4000}
        onClose={onClose}
      >
        <AlertStrip type={type} onClose={onClose}>
          {message}
        </AlertStrip>
      </Snackbar>
    </div>
  );
};

export default AlertPresentation;
