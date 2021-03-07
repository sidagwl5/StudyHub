import React from "react";
import Navbar from "./navbar";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import NotFoundPage from "../../screens/NotFoundPage/presentation";

const root = {
  position: "relative",
  height: "calc(100vh - 70px)",
  overflowY: "auto",
  padding: "0px",
  boxShadow: "0.5px 0.5px 20px rgba(128, 128, 128, 0.2)",
};

const HOC = (WrapperComponent) => {
  return class extends React.Component{
    render(){
      return (
        <div style={{ width: "100%", height: "100vh" }}>
          {this.props.internetConnectivity ? (
            <>
              <Navbar bgColor="#2D2824" arrowBack={true} />
              <Container style={root}>
                <WrapperComponent {...this.props} />
              </Container>
            </>
          ) : (
            <NotFoundPage
              title="Error"
              subtitle="Network Problem"
              para="It seems like your internet connection is not working!"
            />
          )}
        </div>
      );
    }
  };
};

const mapStateToProps = state => ({
  internetConnectivity: state.internetConnectivity
})

export default connect(mapStateToProps, {})(HOC);
