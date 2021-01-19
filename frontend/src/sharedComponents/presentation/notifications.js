import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Popper from "@material-ui/core/Popper";
import IconButton from "./iconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";

import { getNotificationsForUser } from "../../store/actions/notification";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    height: "250px",
    borderRadius: "6px",
    width: "200px",
    overflowY: "auto",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  root: {
    marginTop: "5px",
  },
}));

const Notifications = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const notificationsData = useSelector((state) => state.notification);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleNotifications = () => {
    dispatch(getNotificationsForUser());
  };

  console.log(notificationsData);

  return (
    <div>
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
      <Popper className={classes.root} id={id} open={open} anchorEl={anchorEl}>
        <div className={classes.paper}>
          <div>  
          {notificationsData.map((v) => (
            <div
              style={{
                width: "100%",
                padding: "5px",
                color: "black",
                fontSize: '13px',
                borderBottom: '0.5px solid rgba(128, 128, 128, 0.4)'
              }}
            >
              {v.message}
            </div>
          ))}
          </div>
          <button onClick={handleNotifications}>Update</button>
        </div>
      </Popper>
    </div>
  );
};

export default Notifications;
