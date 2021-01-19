import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import studyVideo from "../../../resources/videos/study.mp4";
import MidSection from "./components/midSection";
import Navbar from "../../../sharedComponents/presentation/navbar";
import Footer from "../../../sharedComponents/presentation/footer";

const Home = () => (
  <Grid
    xs={12}
    style={{
      position: "relative",
      height: "100vh",
      backgroundColor: "black",
    }}
  >
    <video
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      autoPlay
      muted
      loop
      src={studyVideo}
    />
    <Grid
      style={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 2%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.8))",
        position: "absolute",
        top: "0px",
        left: "0px",
      }}
    >
      <Container style={{ height: "100%" }}>
        <Navbar />
        <MidSection />
        <Footer />
      </Container>
    </Grid>
  </Grid>
);

export default Home;
