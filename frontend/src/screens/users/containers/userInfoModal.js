import React from "react";
import ModalContainer from "../../../sharedComponents/presentation/modal/modalContainer";
import ModalActions from "../../../sharedComponents/presentation/modal/modalActions";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, updateUser } from "../../../store/actions/user";
import Avatar from "../../../sharedComponents/presentation/profilePic";
import Chip from "@material-ui/core/Chip";
import Menu from "../../../sharedComponents/presentation/menu";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  contentContainer: {
    height: "calc(100% - 60px)",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
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
    dispatch({ type: "UNSET_SPECIFIC_USER_DATA", payload: null });
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
    handleClose();
  }

  return (
    specificUserData && (
      <ModalContainer handleClose={handleClose}>
        <div className={classes.contentContainer}>
          <Chip
            avatar={<Avatar radius="60px" avatar={specificUserData.imageUrl} />}
            label={specificUserData.name}
            style={{ marginTop: "20px" }}
          />

          <div className={classes.statsContainer}>
            <p>
              <strong>Uploads Approved:</strong>
            </p>
            <div
              className={classes.stats}
              style={{ backgroundColor: "green", color: "white" }}
            >
              {specificUserData.uploadsApproved.length}
            </div>
          </div>

          <div className={classes.statsContainer}>
            <p>
              <strong>Uploads Pending:</strong>
            </p>
            <div
              className={classes.stats}
              style={{ backgroundColor: "yellow" }}
            >
              {specificUserData.uploadsPending.length}
            </div>
          </div>

          <div className={classes.statsContainer}>
            <p>
              <strong>Uploads Pending:</strong>
            </p>
            <div
              className={classes.stats}
              style={{ backgroundColor: "red", color: "white" }}
            >
              {specificUserData.uploadsRejected}
            </div>
          </div>

          <Menu
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
                operation: handleUserStatus.bind(this, specificUserData._id, "Suspend"),
                disabled: specificUserData.status === 'Suspend'
              },
              {
                name: "Activate User",
                operation: handleUserStatus.bind(this, specificUserData._id, "Active"),
                disabled: specificUserData.status === 'Active'
              },
            ]}
          />
        </div>
        <ModalActions
          specificAction={{
            hidden: true,
            operation: null,
          }}
          cancelAction={handleClose}
        />
      </ModalContainer>
    )
  );
};

export default UserInfoModal;
