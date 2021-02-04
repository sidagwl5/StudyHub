import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

const ProfilePic = ({ avatar, title }) => (
  <Tooltip title={title}>
    <Avatar src={avatar} />
  </Tooltip>
);

export default ProfilePic;
