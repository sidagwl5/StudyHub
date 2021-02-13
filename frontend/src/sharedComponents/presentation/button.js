import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      padding: props.padding,
      border: "none",
      color: props.textColor,
      margin: props.margin,
      backgroundColor: "lightblue",
      borderRadius: props.radius,
      pointerEvents: "stroke",
    },
  }));

const Button = ({
  title,
  handleClick,
  radius = "20px",
  textColor = "black",
  padding = "5px 10px",
  margin = "0px 10px",
}) => {
  const classes = useStyles({ radius, textColor, padding, margin })();
  return (
    <button type="button" className={classes.root} onClick={handleClick}>
      {title}
    </button>
  );
};

export default Button;
