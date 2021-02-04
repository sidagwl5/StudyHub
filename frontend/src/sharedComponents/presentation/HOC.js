import React from "react";
import Grid from "@material-ui/core/Grid";
import Navbar from "./navbar";
import Container from "@material-ui/core/Container";

const HOC = (WrapperComponent) => {
  return (props) => {
    return (
      <>
        <Navbar bgColor="purple" />
        <Container
          style={{
            position: "relative",
            height: "calc(100vh - 60px)",
            overflowY: "auto",
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0px',
            boxShadow: '0.5px 0.5px 20px rgba(128, 128, 128, 0.2)'
          }}
        >
          <WrapperComponent {...props} />
        </Container>
      </>
    );
  };
};

export default HOC;
