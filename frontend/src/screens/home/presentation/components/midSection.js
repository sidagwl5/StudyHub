import React from "react";
import TextField from "../../../../sharedComponents/presentation/textField";
import Grid from "@material-ui/core/Grid";
import MidSectionMessage from "../../container/midSectionMessage";
import LoginSuccessModal from "../../container/loginSuccessModal";

const MidSection = ({ classes }) => (
  <Grid className={classes.midSectionContainer}>
    <LoginSuccessModal classes={classes} />
    <MidSectionMessage />
    <TextField />
  </Grid>
);

export default MidSection;
