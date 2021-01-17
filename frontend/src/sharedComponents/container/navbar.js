import React from "react";
import { useSelector } from "react-redux";
import ProfilePic from "../presentation/profilePic";
import Button from "../presentation/button";

const Navbar = () => {
  const userData = useSelector((state) => state.user);

  const handleClick = () => {
    window.open("http://localhost:5000/user/google");
  };

  const navigateToUploadPage = () => {};

  return userData ? (
    <div
      style={{
        display: "flex",
        width: "170px",
        justifyContent: "space-between",
      }}
    >
      <Button
        title="Upload Place"
        handleClick={navigateToUploadPage}
        radius="25px"
        textColor="black"
        padding={['0px', '15px']}
      />
      <ProfilePic avatar={userData.imageUrl} />
    </div>
  ) : (
    <Button title="Google Sign In" handleClick={handleClick} radius="20px" textColor="black" />
  );
};

export default Navbar;
