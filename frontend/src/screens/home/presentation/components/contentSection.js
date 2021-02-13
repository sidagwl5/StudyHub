import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Navbar from "../../../../sharedComponents/presentation/navbar";
import Footer from "../../../../sharedComponents/presentation/footer";
import MidSection from "./midSection";

const ContentSection = ({ classes }) => (
  <Grid className={classes.contentContainer}>
    <Container>
      <Navbar />
      <MidSection classes={classes} />
      <Footer />
    </Container>
  </Grid>
);

export default ContentSection;
