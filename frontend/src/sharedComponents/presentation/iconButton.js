import React, { memo } from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const IconButtonPresentation = ({
  color,
  Icon,
  hover = { backgroundColor: "transparent", top: "0px" },
  backgroundColor,
  size,
  handleClick,
  hidden = false,
  tooltip = false
}) => {
  const classes = makeStyles(() => ({
    root: {
      "&&:hover": {
        top: hover.top,
        backgroundColor: hover.backgroundColor,
      },
    },
  }))();

  console.log("icon");
  return (
    <Tooltip title={tooltip} disableHoverListener={!tooltip}>
      <IconButton
        onClick={handleClick}
        style={{ color, backgroundColor }}
        classes={{ root: classes.root }}
        hidden={hidden}
      >
        <Icon fontSize={size} />
      </IconButton>
    </Tooltip>
  );
};

export default memo(IconButtonPresentation);
