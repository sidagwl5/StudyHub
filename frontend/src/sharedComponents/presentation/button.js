import React from "react";

const Button = ({
  title,
  handleClick,
  radius = "17px",
  textColor = "white",
  padding = "5px 10px",
  margin = "0px",
}) => (
  <button
    type="button"
    style={{
      padding,
      border: "none",
      color: textColor,
      margin,
      backgroundColor: "lightblue",
      borderRadius: radius,
      pointerEvents: "stroke",
    }}
    onClick={handleClick}
  >
    {title}
  </button>
);

export default Button;
