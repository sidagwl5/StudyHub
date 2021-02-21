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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(32, 88, 112, 0.11)',
    top: "0px",
    left: "0px",
  },
  midSectionContainer: {
    width: '100%',
    height: "calc(100% - 130px)",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
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
