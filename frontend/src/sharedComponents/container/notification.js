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
  const userData = useSelector((state) => state.user.userProfile);
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

      <Popper width="285px" height="340px" open={open} anchorEl={anchorEl}>
        <div
          style={{
            height: "calc(100% - 35px)",
            display: "flex",
            alignItems: "center",
            justifyContent: notificationsData.length ? "flex-start" : "center",
            flexDirection: 'column'
          }}
        >
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
                  <Link style={{ color: "#1b1b1b", fontSize: '12px' }} to={url}>
                    {v.message}
                  </Link>
                </AlertStrip>
              );
            })
          ) : (
            <p style={{ fontWeight: 'bold', fontSize: '13px' }}>No notifications present!!</p>
          )}
        </div>
        <Button
          title="Refresh"
          handleClick={handleNotifications}
          radius="30px"
          textColor="white"
          padding="8px 0px"
          margin="10px 40px"
          backgroundColor="#BCBCE0"
        />
      </Popper>
    </>
  );
};

export default Notifications;
