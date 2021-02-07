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
        {...props}
      />
      <div
        style={{
          position: "absolute",
        }}
      >
        <Typography
          variant="caption"
          style={{ color: "white" }}
          component="div"
          color="textSecondary"
        >
          {props.value}%
        </Typography>
      </div>
    </div>
  );
}

export default function CircularStatic() {
  const approvedUploads = useSelector((state) => state.user.approvedUploads);

  const progress = Math.floor((approvedUploads / 10) * 100);
  return <CircularProgressWithLabel value={progress} />;
}