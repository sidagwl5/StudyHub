import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  'MuiCircularProgress-colorPrimary': {
     color: 'orange'
  }
}));

function CircularProgressWithLabel(props) {
  const classes = useStyles();

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
        style={{ width: props.size }}
        {...props}
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

export default function CircularStatic({ size="40px", color="white", fontSize="12px" }) {
  const approvedUploads = useSelector((state) => state.user.approvedUploads);

  const progress = Math.floor((approvedUploads / 10) * 100);
  return <CircularProgressWithLabel value={progress} size={size} color={color} fontSize={fontSize} />;
}
