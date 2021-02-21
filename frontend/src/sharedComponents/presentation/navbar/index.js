import React from "react";
import NavbarContainer from "../../container/navbar";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = props => makeStyles(() => ({
  root: {
    position: 'relative',
    height: "70px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 10px",
    boxSizing: "border-box",
    backgroundColor: props.bgColor || "transparent",
  }
}))

const Navbar = ({ bgColor }) => {

  const classes = useStyles({ bgColor })();
  return (
    <Container className={classes.root}>
      <NavbarContainer />
    </Container>
  );
};

export default Navbar;
