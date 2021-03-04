import React from "react";
import ModalContainer from "../../../sharedComponents/presentation/modal/modalContainer";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, updateUser } from "../../../store/actions/user";
import Menu from "../../../sharedComponents/presentation/menu";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../sharedComponents/presentation/button";
import UserData from "../../profile/presentation/components/renderUserData";

const useStyles = makeStyles(() => ({
  contentContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: '#2D2824',
  },
  wallpaperContainer: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    backgroundImage: "url(https://wallpapercave.com/wp/wp6868260.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(4px)",
    color: "white",
  },
  statsContainer: {
    position: "relative",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: "40px",
  },
  stats: {
    borderRadius: "5px",
    width: "40%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const UserInfoModal = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const specificUserData = useSelector((state) => state.user.specificUserData);

  const handleClose = () => {
    dispatch({ type: "SET_SPECIFIC_USER_DATA", payload: null });
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    handleClose();
  };

  const handleAssignRole = (id) => {
    dispatch(updateUser(id, { isAdmin: true }));
    handleClose();
  };

  const handleUserStatus = (id, value) => {
    dispatch(updateUser(id, { status: value }));
  };

  return (
    specificUserData && (
      <ModalContainer 
       handleClose={handleClose}
       btnContainerBgColor="#58642D"
       width="1000px"
       height="600px"
       cancelBtnProps={{
        backgroundColor: "#BDBD76",
        title: "Cancel",
        textColor: "white",
        padding: "6px 28px",
        radius: "35px",
        handleClick: handleClose
      }}
      >
        <div className={classes.contentContainer}>
         <div className={classes.wallpaperContainer} />
          <UserData specificUserData={specificUserData} />
          <div style={{ zIndex: 4 }}>
          <Menu
            Source={(props) => <Button {...props} backgroundColor="#BDBD76" title="More" />}
            items={[
              {
                name: "Assign Admin Role",
                operation: handleAssignRole.bind(this, specificUserData._id),
              },
              {
                name: "Delete User",
                operation: handleDelete.bind(this, specificUserData._id),
              },
              {
                name: "Suspend User",
                operation: handleUserStatus.bind(
                  this,
                  specificUserData._id,
                  "Suspend"
                ),
                disabled: specificUserData.status === "Suspend",
              },
              {
                name: "Activate User",
                operation: handleUserStatus.bind(
                  this,
                  specificUserData._id,
                  "Active"
                ),
                disabled: specificUserData.status === "Active",
              },
            ]}
          />
          </div>
        </div>
      </ModalContainer>
    )
  );
};

export default UserInfoModal;
