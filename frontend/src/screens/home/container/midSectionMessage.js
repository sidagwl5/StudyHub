import React from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";

const MidSectionMessage = () => {
  const userData = useSelector((state) => state.user.persistantUserData);
  const isAdmin = userData && userData.isAdmin;

  return isAdmin ? (
    <Typography variant="h5">
      <span style={{ color: "orange" }}>Welcome </span>Admin!
    </Typography>
  ) : null;
};

export default MidSectionMessage;
