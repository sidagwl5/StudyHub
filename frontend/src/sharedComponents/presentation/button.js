import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      padding: props.padding,
      border: "none",
      color: props.textColor,
      margin: props.margin,
      backgroundColor: props.backgroundColor,
      borderRadius: props.radius,
      pointerEvents: "stroke",
      fontSize: props.fontSize,
      fontWeight: props.fontWeight,
      fontFamily: 'roboto'
    },
  }));

const Button = ({
  title,
  handleClick,
  radius = "20px",
  textColor = "black",
  padding = "5px 10px",
  margin = "0px 10px",
  fontSize = "14px",
  fontWeight = "normal",
  backgroundColor="lightblue"
}) => {
  const classes = useStyles({ radius, textColor, padding, margin, fontSize, fontWeight, backgroundColor })();
  return (
    <button type="button" className={classes.root} onClick={handleClick}>
      {title}
    </button>
  );
};

export default Button;
