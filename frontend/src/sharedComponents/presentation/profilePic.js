import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

const ProfilePic = ({ avatar, tooltip=false, radius='45px' }) => (
  <Tooltip title={tooltip}  disableHoverListener={!tooltip}>
    <Avatar style={{ width: radius, height: radius }} src={avatar} />
  </Tooltip>
);

export default ProfilePic;
