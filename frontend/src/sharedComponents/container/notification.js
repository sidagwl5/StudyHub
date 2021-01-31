import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { Link } from 'react-router-dom';

import IconButton from "../presentation/iconButton";
import { getNotificationsForUser } from "../../store/actions/notification";
import Popper from "../presentation/popper";
import Button from "../presentation/button";

const Notifications = () => {
  
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const notificationsData = useSelector((state) => state.notification);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleNotifications = () => {
    dispatch(getNotificationsForUser());
  };

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

      <Popper open={open} anchorEl={anchorEl}>
        <div>
          {notificationsData.length > 0 ? (
            notificationsData.map((v) => (           
             <Link to={`/uploadhub/${v.fileId}`}>   
              <div
                style={{
                  width: "100%",
                  padding: "5px",
                  color: "black",
                  fontSize: "13px",
                  borderBottom: "0.5px solid rgba(128, 128, 128, 0.4)",
                }}
              >
                {v.message}
              </div>
             </Link> 
            ))
          ) : (
            <p>No notifications present</p>
          )}
        </div>
        <Button
          title="Upload Hub"
          handleClick={handleNotifications}
          radius="25px"
          textColor="black"
          padding={["8px", "12px"]}
        />
      </Popper>
    </>
  );
};

export default Notifications;
