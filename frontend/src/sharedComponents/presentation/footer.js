import React from "react";
import FooterContainer from "../container/footer";
import Grid from "@material-ui/core/Grid";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import MessageIcon from "@material-ui/icons/Message";
import IconButton from "./iconButton";

const Footer = () => (
  <Grid
    xs={12}
    style={{
      height: "60px",
      display: "flex",
    }}
  >
    <Grid xs={4}></Grid>
    <Grid
      xs={4}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        hover={{ top: "-7px" }}
        color="white"
        Icon={(props) => <PhoneIcon {...props} />}
      />
      <IconButton
        hover={{ top: "-7px" }}
        color="orange"
        Icon={(props) => <EmailIcon {...props} />}
      />
      <IconButton
        hover={{ top: "-7px" }}
        color="white"
        Icon={(props) => <MessageIcon {...props} />}
      />
    </Grid>
    <Grid
      xs={4}
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <FooterContainer />
    </Grid>
  </Grid>
);

export default Footer;
