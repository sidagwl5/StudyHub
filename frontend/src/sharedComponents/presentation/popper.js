import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    overflowY: "auto",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  root: {
    marginTop: "5px",
  },
}));

const PopperPresentation = ({ open, anchorEl, children, height=null, width=null }) => {
  const classes = useStyles();
  const id = open ? "simple-popper" : undefined;

  return (
    <Popper className={classes.root} id={id} open={open} anchorEl={anchorEl}>
      <div 
       style={{
        height: height || "250px",
        width: width || "200px",
      }}
      className={classes.paper}>{children}</div>
    </Popper>
  );
};

export default PopperPresentation;