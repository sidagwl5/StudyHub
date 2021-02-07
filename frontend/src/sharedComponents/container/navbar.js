import React from "react";
import { useSelector } from "react-redux";
import ProfilePic from "../presentation/profilePic";
import Button from "../presentation/button";
import history from "../../utils/createHistory";
import Notifications from "../presentation/notifications";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "../presentation/circularProgress";
import IconButton from "../../sharedComponents/presentation/iconButton";

const useStyles = makeStyles(() => ({
  navbarContainer: {
    display: "flex",
    maxWidth: "320px",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const userData = useSelector((state) => state.user.persistantUserData);

  const handleClick = () => {
    window.localStorage.setItem("login", true);
    setTimeout(() => window.open("http://localhost:5000/user/google"), 500);
  };

  const navigateToUploadPage = () => {
    history.push("/uploadhub");
  };

  return userData ? (
    <div className={classes.navbarContainer}>
      <Notifications />
      {!userData.isAdmin && (
        <IconButton
          Icon={(props) => <CircularProgress />}
          tooltip="Admin bar"
        />
      )}
      {!userData.isAdmin && (
        <Button
          title="Upload Hub"
          handleClick={navigateToUploadPage}
          radius="25px"
          textColor="black"
          padding="8px 12px"
          margin="0px 10px"
        />
      )}
      <ProfilePic title={userData.firstName} avatar={userData.imageUrl} />
    </div>
  ) : (
    <Button
      title="Google Sign In"
      handleClick={handleClick}
      radius="20px"
      textColor="black"
    />
  );
};

export default Navbar;
