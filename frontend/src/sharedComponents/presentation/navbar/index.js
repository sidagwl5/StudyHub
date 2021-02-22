import React from "react";
import NavbarContainer from "../../container/navbar";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "../iconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const useStyles = (props) =>
  makeStyles(() => ({
    root: {
      position: "relative",
      height: "70px",
      display: "flex",
      justifyContent: props.arrowBack ? "space-between" : "flex-end",
      alignItems: "center",
      padding: "0px 10px",
      boxSizing: "border-box",
      backgroundColor: props.bgColor || "transparent",
    },
  }));

const Navbar = ({ bgColor, arrowBack = false }) => {
  const classes = useStyles({ bgColor, arrowBack })();
  return (
    <Container className={classes.root}>
      {arrowBack && (
        <IconButton
          Icon={(props) => <KeyboardBackspaceIcon {...props} />}
          handleClick={() => window.history.go(-1)}
        />
      )}
      <NavbarContainer />
    </Container>
  );
};

export default Navbar;
