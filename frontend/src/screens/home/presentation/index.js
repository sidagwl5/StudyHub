import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import VideoSection from "./components/videoSection";
import ContentSection from "./components/contentSection";

const useStyles = makeStyles(() => ({
  homeContainer: {
    position: "relative",
    height: "100vh",
    width: "100%",
    backgroundColor: "black",
    overflow: "hidden",
  },
  contentContainer: {
    position: "absolute",
    display: "flex",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 2%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.8))",
    top: "0px",
    left: "0px",
  },
  midSectionContainer: {
    height: "calc(100% - 120px)",
    padding: "20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    objectFit: "contain",
    position: "absolute",
  },
  imageContainer: {
    height: "60%",
    position: "relative",
    width: "100%",
    marginTop: "15px",
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.homeContainer}>
      <VideoSection />
      <ContentSection classes={classes} />
    </Grid>
  );
};

export default Home;
