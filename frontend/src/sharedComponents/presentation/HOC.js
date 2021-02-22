import React from "react";
import Navbar from "./navbar";
import Container from "@material-ui/core/Container";

const root = {
  position: "relative",
  height: "calc(100vh - 70px)",
  overflowY: "auto",
  padding: "0px",
  boxShadow: "0.5px 0.5px 20px rgba(128, 128, 128, 0.2)",
};

const HOC = (WrapperComponent) => {
  return (props) => {
    return (
      <>
        <Navbar bgColor="#2D2824" arrowBack={true} />
        <Container style={root}>
          <WrapperComponent {...props} />
        </Container>
      </>
    );
  };
};

export default HOC;
