import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from './iconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertPresentation = () => {
  const alert = useSelector((state) => state.alert);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: "UNSET_ALERT" });
  }

  return (
    alert && (
      <div className={classes.root}>
        <Snackbar
          open={true}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          autoHideDuration={4000}
          onClose={() => {
            console.log('closed');
            dispatch({ type: "UNSET_ALERT" });
          }}
        >
          <Alert
           severity={alert.type}
           action={<CloseIcon fontSize="small" onClick={handleClick} />}
          
          >{alert.message}</Alert>
        </Snackbar>
      </div>
    )
  );
};

export default AlertPresentation;
