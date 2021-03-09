import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";
import userProfileWrapper from "../../sharedComponents/presentation/wrappers/userProfile";

import IconButton from "../presentation/iconButton";
import { deleteNotification } from "../../store/actions/notification";
import Popper from "../presentation/popper";
import Button from "../presentation/button";
import AlertStrip from "../presentation/alertStrip";
import NotesIcon from "@material-ui/icons/Notes";
import history from '../../utils/createHistory';

const Notifications = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const notifications = useSelector((state) => state.notification);

  const handleClick = (event) => {
    event.stopPropagation();
    console.log("hello");
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleDelete = (id, userId) => {
    if (userId) {
      dispatch(deleteNotification(id, { userId }));
      return;
    }
    dispatch(deleteNotification(id));
  };

  console.log(anchorEl);

  return (
    <>
      <IconButton
        Icon={(props) => <NotesIcon {...props} />}
        color="#D1D7E0"
        size="small"
        handleClick={() => history.push("/notes")}
      />

      <IconButton
        Icon={(props) => (
          <Badge badgeContent={notifications.length} color="primary">
            <NotificationsIcon {...props} />
          </Badge>
        )}
        color="#D1D7E0"
        size="small"
        handleClick={handleClick}
      />

      <Popper
        width="285px"
        height="340px"
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClick}
      >
        <div
          style={{
            height: "calc(100% - 35px)",
            display: "flex",
            alignItems: "center",
            justifyContent: [].length ? "flex-start" : "center",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {notifications.length > 0 ? (
            notifications.map((v) => {
              return (
                <AlertStrip
                  key={v._id}
                  type={v.data.status}
                  onClose={handleDelete.bind(this, v.id, v.userId)}
                >
                  {v.data.path ? (
                    <Link
                      style={{ color: "#1b1b1b", fontSize: "12px" }}
                      to={v.data.path}
                    >
                      {v.data.message}
                    </Link>
                  ) : (
                    <span style={{ fontSize: "12px" }}>{v.data.message}</span>
                  )}
                </AlertStrip>
              );
            })
          ) : (
            <p style={{ fontWeight: "bold", fontSize: "13px" }}>
              No notifications present!!
            </p>
          )}
        </div>
        <Button
          title="Refresh"
          // handleClick={}
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
