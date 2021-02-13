import React from "react";
import FooterContainer from "../container/footer";
import Grid from "@material-ui/core/Grid";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import MessageIcon from "@material-ui/icons/Message";
import IconButton from "./iconButton";

const Footer = () => {
  const handleMessage = () => {
    const anchor = document.createElement("a");
    anchor.href = "mailto: sasiddharth7@gmail.com";
    anchor.click();
  };

  return (
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
          handleClick={handleMessage}
          tooltip="Message Admin"
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
};

export default Footer;
