import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const IconButtonPresentation = ({ color, Icon, hoverTop, backgroundColor, size, handleClick }) => {
  const classes = makeStyles(() => ({
    root: {
      '&&:hover': {
        top: hoverTop || '0px',
      }
    },
  }))();

  return (
    <IconButton onClick={handleClick} style={{ color, backgroundColor }} classes={{ root: classes.root }}>
      <Icon fontSize={size} />
    </IconButton>
  );
};

export default IconButtonPresentation;
