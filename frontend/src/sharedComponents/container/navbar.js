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
    maxWidth: "320px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuDesktop: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const userData = useSelector((state) => state.user.persistantUserData);
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
      >
        <div
          style={{
            height: "calc(100% - 60px)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress size="100px" color="black" fontSize="23px" />
          <Typography variant="h6"> Admin Bar </Typography>
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
          Icon={(props) => <CircularProgress />}
          tooltip="Admin bar"
        />
      )}
      <div className={classes.menuDesktop}>
        {userData.isAdmin && (
          <Button
            title="Blog Hub"
            handleClick={navigateToBlogPage}
            radius="25px"
          />
        )}

        {!userData.isAdmin && (
          <Button
            title="Upload Hub"
            handleClick={navigateToUploadPage}
            radius="25px"
          />
        )}
        <ProfilePic title={userData.firstName} avatar={userData.imageUrl} />
      </div>
      <MoreMenu />
    </div>
  ) : (
    <Button title="Google Sign In" handleClick={handleClick} />
  );
};

export default Navbar;
