import React from "react";
import TextField from "../../../../sharedComponents/presentation/textField";
import Grid from "@material-ui/core/Grid";
import MidSectionMessage from "../../container/midSectionMessage";
import LoginSuccessModal from "../../container/loginSuccessModal";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from "../../../../sharedComponents/presentation/button";
import IconButton from '../../../../sharedComponents/presentation/iconButton';

const MidSection = ({ classes }) => (
  <Grid className={classes.midSectionContainer}>
    <LoginSuccessModal classes={classes} />
    <MidSectionMessage />
    <div style={{ position: "relative", width: "60%" }}>
      <div
        style={{ position: "relative", top: "10%", fontFamily: "bebas neue" }}
      >
        <div style={{ padding: "0px 20px" }}>
          <h4 style={{ color: "white", fontSize: "40px" }}>Study Hub</h4>
          <h1
            style={{ color: "#2C2929", fontSize: "90px", lineHeight: "95px" }}
          >
            <div>A study material</div>
            <div>sharing platform</div>
          </h1>
        </div>
        <Button
          margin="0px"
          radius="0px 35px 35px 0px"
          title="Explore"
          backgroundColor="#2C2627"
          textColor="#CCC15A"
          fontSize="25px"
          padding="10px 37px"
        />
      </div>
    </div>
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
  <div
    style={{ width: "250px", height: "350px", backgroundColor: "yellow" }}
  >

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
