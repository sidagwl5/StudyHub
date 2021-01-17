import React from "react";
import NavbarContainer from "../container/navbar";
import Grid from '@material-ui/core/Grid'

const Navbar = () => {
  return (
    <Grid
      xs={12}
      style={{
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: '7px',
        boxSizing: 'border-box'
      }}
    >
      <h4 style={{ fontSize: "2em", color: "white" }}>Study <span style={{color: 'orange'}}>Hub</span></h4>
      <NavbarContainer />
    </Grid>
  );
};

export default Navbar;
