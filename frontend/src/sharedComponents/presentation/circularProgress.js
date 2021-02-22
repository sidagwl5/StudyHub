import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = (value, noProgressColor) =>
  makeStyles(() => ({
    "MuiCircularProgress-colorPrimary": {
      color: value ? "orange" : noProgressColor,
    },
  }));

function CircularProgressWithLabel(props) {
  const classes = useStyles(props.value, props.noProgressColor)();

  return (
    <div
      position="relative"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        className={classes["MuiCircularProgress-colorPrimary"]}
        variant="determinate"
        {...props}
        value={props.value || 100}
      />
      <div
        style={{
          position: "absolute",
        }}
      >
        <Typography
          variant="caption"
          style={{ color: props.color, fontSize: props.fontSize }}
          component="div"
          color="textSecondary"
        >
          {props.value}%
        </Typography>
      </div>
    </div>
  );
}

export default function CircularStatic({
  size = "40px",
  color = "white",
  fontSize = "12px",
  noProgressColor = "rgba(128, 128, 128, 0.4)",
}) {
  const userProfile = useSelector((state) => state.user.userProfile);
  const uploadsApproved = userProfile ? userProfile.uploadsApproved : [];

  const progress = Math.floor((uploadsApproved.length / 10) * 100);
  return (
    <CircularProgressWithLabel
      value={progress}
      size={size}
      color={color}
      fontSize={fontSize}
      noProgressColor={noProgressColor}
    />
  );
}
