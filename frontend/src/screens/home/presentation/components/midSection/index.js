import React from "react";
import Grid from "@material-ui/core/Grid";
import LoginSuccessModal from "../../../container/loginSuccessModal";
import StaticJsx from './staticJsx';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "../../../../../sharedComponents/presentation/iconButton";

const MidSection = ({ classes }) => (
  <Grid className={classes.midSectionContainer}>
    <LoginSuccessModal classes={classes} />
    <StaticJsx />
    {/* <div
      style={{
        position: "relative",
        width: "40%",
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        padding: '20px'
      }}
    >
      <Wallpaper />
    </div> */}
  </Grid>
);

const Wallpaper = () => (
  <>
    <div style={{ width: "250px", height: "350px", backgroundColor: "yellow" }}>
      <StaticJsx />
    </div>
    {/* <div>
    <IconButton 
     Icon={(props) => <ChevronLeftIcon {...props} />} 
     color="#D1D7E0"
     size="large"
     margin="5px"
    />
    <IconButton 
     Icon={(props) => <ChevronRightIcon {...props} />} 
     color="#D1D7E0"
     size="large"
     margin="5px"
    />
  </div>    */}
  </>
);

export default MidSection;
