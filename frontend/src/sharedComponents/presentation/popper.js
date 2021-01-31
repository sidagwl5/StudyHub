import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    height: "250px",
    borderRadius: "6px",
    width: "200px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  root: {
    marginTop: "5px",
  },
}));

const PopperPresentation = ({ open, anchorEl, children }) => {
  const classes = useStyles();
  const id = open ? "simple-popper" : undefined;

  return (
    <Popper className={classes.root} id={id} open={open} anchorEl={anchorEl}>
      <div className={classes.paper}>{children}</div>
    </Popper>
  );
};

export default PopperPresentation;
