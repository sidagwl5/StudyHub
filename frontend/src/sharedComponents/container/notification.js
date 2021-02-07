import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";

import IconButton from "../presentation/iconButton";
import { getNotificationsForUser, deleteNotification } from "../../store/actions/notification";
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
    console.log(id);
    dispatch(deleteNotification(id));
  }

  return (
    <>
      <IconButton
        Icon={(props) => (
          <Badge badgeContent={notificationsData.length} color="primary">
            <NotificationsIcon {...props} />
          </Badge>
        )}
        color="white"
        size="small"
        handleClick={handleClick}
      />

      <Popper width="300px" open={open} anchorEl={anchorEl}>
        <div style={{ padding: "10px 0px" }}>
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
                  <Link style={{color: '#1b1b1b'}} to={url}>{v.message}</Link>
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
          radius="25px"
          textColor="black"
          padding="5px 8px"
        />
      </Popper>
    </>
  );
};

export default Notifications;
