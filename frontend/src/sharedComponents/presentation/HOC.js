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
            justifyContent: "center",
          }}
        >
          <WrapperComponent {...props} />
        </Container>
      </>
    );
  };
};

export default HOC;
