import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePic from "../presentation/profilePic";
import Button from "../presentation/button";
import history from "../../utils/createHistory";
import Notifications from "../presentation/notifications";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "../presentation/circularProgress";
import IconButton from "../../sharedComponents/presentation/iconButton";
import ModalContainer from "../presentation/modal/modalContainer";
import Typography from "@material-ui/core/Typography";
import { adminRoleRequest } from '../../store/actions/user';
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
  const dispatch = useDispatch();

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

  const handleAdminRequest = () => {
    dispatch(adminRoleRequest());
    setAdminBar(false);
  }

  const handleModal = () =>
    adminBar && (
      <ModalContainer
        handleClose={setAdminBar.bind(this, false)}
        width="500px"
        height="310px"
        btnContainerBgColor="#FAFAEB"
        cancelBtnProps={{
          handleClick: setAdminBar.bind(this, false),
          backgroundColor: "#BDBD76",
          title: "Cancel",
          textColor: "white",
          padding: "6px 28px",
          radius: "35px",
        }}
        specificBtnProps={{
          handleClick: handleAdminRequest,
          backgroundColor: "#A5A544",
          title: "Request",
          textColor: "white",
          padding: "6px 28px",
          radius: "35px",
          // disabled: userData.uploadsApproved.length < 10,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ padding: "10px 0px", textAlign: "center", width: '80%', top: '14px', position: 'relative' }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <CircularProgress
                size="120px"
                color="#2C2627"
                fontSize="30px"
                noProgressColor="#F5F5D9"
              />
              <p style={{ margin: "0px", fontWeight: 'bold' }}>
                {userData.uploadsApproved.length} out of 10 uploads
              </p>
            </div>
            <p
              style={{
                position: 'relative',
                fontFamily: "bebas neue",
                fontSize: "1.7em",
                top: '12px'
              }}
            >
              Admin Bar
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#FAFAEB",
              width: "100%",
              position: "relative",
              padding: "11px 0px",
            }}
          >
            <p
              style={{
                textAlign: "center",
                margin: "0px",
                fontSize: "11.2px",
                fontWeight: "bold",
              }}
            >
              On succesfully getting 10 uploads you can request admin for an
              admin Role as well.
            </p>
          </div>
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
          fontSize="11px"
        />
        {!userData.isAdmin && (
          <Button
            title="Upload Hub"
            handleClick={navigateToUploadPage}
            radius="0px 25px 25px 0px"
            margin="0px 10px 0px 0px"
            backgroundColor="#A34949"
            textColor="white"
            fontSize="11px"
          />
        )}
        
       <div onClick={() => history.push("/profile")} style={{ cursor: "pointer" }}>
         <ProfilePic title={userData.firstName} avatar={userData.imageUrl} />
        </div>
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
