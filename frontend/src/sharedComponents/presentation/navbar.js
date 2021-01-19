import React from "react";
import NavbarContainer from "../container/navbar";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const Navbar = ({ bgColor }) => {
  return (
    <Grid
      xs={12}
      style={{
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "7px",
        padding: "0px 10px",
        boxSizing: "border-box",
        backgroundColor: bgColor || "transparent",
      }}
    >
      <Link to = "/">
        <h4 style={{ fontSize: "2em", color: "white" }}>
          Study <span style={{ color: "orange" }}>Hub</span>
        </h4>
      </Link>
      <NavbarContainer />
    </Grid>
  );
};

export default Navbar;
