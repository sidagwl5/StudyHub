import React from "react";
import FooterContainer from "../container/footer";
import Container from "@material-ui/core/Container";
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
    <Container
      style={{
        height: "50px",
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
          Icon={(props) => <PhoneIcon {...props} />}
          size="small"
        />
        <IconButton
          hover={{ top: "-7px" }}
          Icon={(props) => <EmailIcon {...props} />}
          handleClick={handleMessage}
          tooltip="Message Admin"
          margin="0px 6px"
          size="small"
        />
        <IconButton
          hover={{ top: "-7px" }}
          Icon={(props) => <MessageIcon {...props} />}
          size="small"
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
    </Container>
  );
};

export default Footer;
