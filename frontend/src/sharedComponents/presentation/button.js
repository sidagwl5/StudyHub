import React from "react";

const Button = ({ title, handleClick, radius, textColor, padding = [] }) => (
  <button
    type="button"
    style={{
      padding: `${padding[0] ? padding[0] : "5px"} ${
        padding[1] ? padding[1] : "10px"
      }`,
      border: "none",
      color: textColor ? textColor : "white",
      backgroundColor: "lightblue",
      borderRadius: radius ? radius : "17px",
      pointerEvents:"stroke"
    }}
    onClick={handleClick}
  >
    {title}
  </button>
);

export default Button;
