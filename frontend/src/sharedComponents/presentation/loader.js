import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const Loader = () => {

  const classes = useStyles();  
  const loadingStatus = useSelector((state) => state.loading);

  return Boolean(loadingStatus) && (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
