import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";

import IconButton from "../presentation/iconButton";
import {
  getNotificationsForUser,
  deleteNotification,
} from "../../store/actions/notification";
import Popper from "../presentation/popper";
import Button from "../presentation/button";
import AlertStrip from "../presentation/alertStrip";

const Notifications = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const notificationsData = useSelector((state) => state.notification);
  const userData = useSelector((state) => state.user.persistantUserData);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleNotifications = () => {
    dispatch(getNotificationsForUser());
  };

  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
  };

  return (
    <>
      <IconButton
        Icon={(props) => (
          <Badge badgeContent={notificationsData.length} color="primary">
            <NotificationsIcon {...props} />
          </Badge>
        )}
        color="#D1D7E0"
        size="small"
        handleClick={handleClick}
      />

      <Popper width="330px" height="400px" open={open} anchorEl={anchorEl}>
        <div
          style={{
            backgroundColor: "#7E868D",
            width: "100%",
            height: "45px",
            display: "flex",
            padding: "10px",
            alignItems: "center",
            fontFamily: 'roboto',
            color: 'white'
          }}
        >
          Notifications
        </div>
        <div>
          {notificationsData.length > 0 ? (
            notificationsData.map((v) => {
              const url = userData.isAdmin
                ? `/review/${v.fileId}`
                : `/uploadhub/${v.fileId}`;
              return (
                <AlertStrip
                  key={v.fileId}
                  type={v.status}
                  onClose={handleDelete.bind(this, v._id)}
                >
                  <Link style={{ color: "#1b1b1b" }} to={url}>
                    {v.message}
                  </Link>
                </AlertStrip>
              );
            })
          ) : (
            <p>No notifications present</p>
          )}
        </div>
        <Button
          title="Refresh"
          handleClick={handleNotifications}
          radius="0px"
          textColor="black"
          padding="10px"
          margin="0px"
          backgroundColor="#DAABBD"
        />
      </Popper>
    </>
  );
};

export default Notifications;
