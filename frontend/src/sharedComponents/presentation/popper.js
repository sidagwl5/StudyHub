import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    overflowY: "auto",
    borderRadius: "3px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  root: {
    marginTop: "5px",
  },
}));

const PopperPresentation = ({
  open,
  anchorEl,
  children,
  height = null,
  width = null,
  handleClose,
}) => {
  const classes = useStyles();
  const id = open ? "simple-popper" : undefined;

  return (
      <Popper
        placement="bottom-end"
        className={classes.root}
        id={id}
        open={open}
        anchorEl={anchorEl}
      >
        <div
          style={{
            height: height || "250px",
            width: width || "200px",
          }}
          className={classes.paper}
        >
          {children}
        </div>
      </Popper>
  );
};

export default PopperPresentation;
