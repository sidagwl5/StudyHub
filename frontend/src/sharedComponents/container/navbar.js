import React from "react";
import { useSelector } from "react-redux";
import ProfilePic from "../presentation/profilePic";
import Button from "../presentation/button";
import history from '../../utils/createHistory';
import Notifications from '../presentation/notifications';

const Navbar = () => {
  const userData = useSelector(state => state.user.persistantUserData);

  const handleClick = () => {
    window.open("http://localhost:5000/user/google");
  };

  const navigateToUploadPage = () => {
      history.push("/uploadhub");
  };

  return userData ? (
    <div
      style={{
        display: "flex",
        width: "220px",
        justifyContent: "space-between",
        alignItems: 'center'
      }}
    >
      <Notifications />
      <Button
        title="Upload Hub"
        handleClick={navigateToUploadPage}
        radius="25px"
        textColor="black"
        padding={['8px', '12px']}
      />
      <ProfilePic title={userData.firstName} avatar={userData.imageUrl} />
    </div>
  ) : (
    <Button title="Google Sign In" handleClick={handleClick} radius="20px" textColor="black" />
  );
};

export default Navbar;
