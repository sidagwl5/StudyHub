import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfilePic from "../presentation/profilePic";
import Button from "../presentation/button";
import history from "../../utils/createHistory";
import Notifications from "../presentation/notifications";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "../presentation/circularProgress";
import IconButton from "../../sharedComponents/presentation/iconButton";
import ModalContainer from "../presentation/modal/modalContainer";
import Typography from "@material-ui/core/Typography";
import MoreMenu from "../presentation/navbar/moreMenu";

const useStyles = makeStyles((theme) => ({
  navbarContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuDesktop: {
    display: "flex",
    fontFamily: "roboto",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const userData = useSelector((state) => state.user.userProfile);
  const [adminBar, setAdminBar] = useState(false);

  const handleClick = () => {
    window.localStorage.setItem("login", true);
    setTimeout(() => window.open("http://localhost:5000/user/google"), 500);
  };

  const navigateToUploadPage = () => {
    history.push("/uploadhub");
  };

  const navigateToBlogPage = () => {
    history.push("/bloghub");
  };

  const handleModal = () =>
    adminBar && (
      <ModalContainer
        handleClose={setAdminBar.bind(this, false)}
        width="600px"
        height="300px"
        btnTitle="Request"
        disabled={userData ? userData.uploadsApproved.length < 10 : true}
      >
        <div
          style={{
            height: "calc(100% - 60px)",
            padding: "10px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress size="80px" color="black" fontSize="23px" />
          <Typography variant="h6"> Admin Bar </Typography>
          <Typography variant="subtitle2" style={{ textAlign: 'center', margin: '16px' }}>
            On succesfully getting 10 uploads you can request admin for an admin Role as well.
            <span style={{ fontWeight: 'bold' }}>Start Uploading!</span>
          </Typography>
          <Button
            title="Upload Hub"
            handleClick={navigateToUploadPage}
            radius="25px"
            backgroundColor="wheat"
          />
        </div>
      </ModalContainer>
    );

  const handleAdminBarModal = () => {
    setAdminBar(true);
  };

  return userData ? (
    <div className={classes.navbarContainer}>
      {handleModal()}
      <Notifications />
      {!userData.isAdmin && (
        <IconButton
          handleClick={handleAdminBarModal}
          Icon={(props) => <CircularProgress color="#D1D7E0" />}
          tooltip="Admin bar"
        />
      )}
      <div className={classes.menuDesktop}>
        <Button
          title="Blog Hub"
          handleClick={navigateToBlogPage}
          radius={userData.isAdmin ? "25px" : "25px 0px 0px 25px"}
          margin={userData.isAdmin ? "0px 10px" : "0px"}
          backgroundColor="#A39416"
        />
        {!userData.isAdmin && (
          <Button
            title="Upload Hub"
            handleClick={navigateToUploadPage}
            radius="0px 25px 25px 0px"
            margin="0px 10px 0px 0px"
            backgroundColor="#A34949"
            textColor="white"
          />
        )}
        <ProfilePic title={userData.firstName} avatar={userData.imageUrl} />
      </div>
      <MoreMenu />
    </div>
  ) : (
    <Button 
     backgroundColor="#9D6262" 
     textColor="#E2D4D4" 
     title="Google Sign In" 
     handleClick={handleClick} 
    />
  );
};

export default Navbar;
