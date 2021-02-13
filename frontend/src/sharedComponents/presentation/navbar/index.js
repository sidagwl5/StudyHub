import React from "react";
import NavbarContainer from "../../container/navbar";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = props => makeStyles(() => ({
  root: {
    height: "60px",
    width: '100%',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "7px",
    padding: "0px 10px",
    boxSizing: "border-box",
    backgroundColor: props.bgColor || "transparent",
  }
}))

const Navbar = ({ bgColor }) => {

  const classes = useStyles({ bgColor })();
  return (
    <div className={classes.root}>
      <Link to = "/">
        <h4 style={{ fontSize: "2em", color: "white" }}>
          Study <span style={{ color: "orange" }}>Hub</span>
        </h4>
      </Link>
      <NavbarContainer />
    </div>
  );
};

export default Navbar;
