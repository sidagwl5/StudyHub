import React from 'react'
import Grid from "@material-ui/core/Grid";
import Navbar from "./navbar";
import Container from "@material-ui/core/Container";

const HOC = (WrapperComponent) => {
    return () => {

        return (
            <div
            style={{
              position: "relative",
              height: "100vh",
            }}
          >
            <Navbar bgColor="purple" />
            <Container
              style={{
                position: "relative",
                height: "calc(100%-60px)",
                overflowY: 'auto',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <WrapperComponent />
            </Container>
          </div>
        )
    }
}

export default HOC
