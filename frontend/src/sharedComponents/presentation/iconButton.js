import React, { memo } from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const IconButtonPresentation = ({ color, Icon, hover={ backgroundColor:"transparent", top: "0px" }, backgroundColor, size, handleClick }) => {
  const classes = makeStyles(() => ({
    root: {
      '&&:hover': {
        top: hover.top,
        backgroundColor: hover.backgroundColor
      }
    },
  }))();

  console.log('icon')
  return (
    <IconButton onClick={handleClick} style={{ color, backgroundColor }} classes={{ root: classes.root }}>
      <Icon fontSize={size} />
    </IconButton>
  );
};

export default memo(IconButtonPresentation);
