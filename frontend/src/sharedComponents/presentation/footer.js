import React from "react";
import FooterContainer from "../container/footer";
import Grid from '@material-ui/core/Grid'

const Footer = () => (
  <Grid
    xs={12}
    style={{
      height: "60px",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    }}
  >
    <FooterContainer />
  </Grid>
);

export default Footer;
