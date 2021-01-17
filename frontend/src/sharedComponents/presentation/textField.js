import React from "react";
import TextFieldContainer from '../container/textField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
      position: "relative",
      borderRadius: "35px",
      width: "600px",
      minWidth: "200px",
      border: "none",
      backgroundColor: "white",
      height: "40px",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
    },
    TextField: {
      position: "relative",
      overflow: "hidden",
    },
    underline: {
      "&&:before": {
        borderBottom: "none",
      },
      "&&:after": {
        borderBottom: "none",
      },
    },
    inputRoot: {
      position: "relative",
      width: "100%",
      height: "100%",
      padding: "0px 10px",
      "&&:hover": {
        borderBottom: "none",
      },
    },
}));

const TextField = () => {
   
    const classes = useStyles();   
    return <TextFieldContainer classes={classes} placeholder="Search something..." />
};

export default TextField;
