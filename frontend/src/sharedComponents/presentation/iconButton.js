import React, { memo } from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = (props) =>
  makeStyles(() => ({
    root: {
      "&&:hover": {
        top: props.hover.top,
        backgroundColor: props.hover.backgroundColor,
      },
    },
  }));

const IconButtonPresentation = ({
  color="white",
  Icon,
  hover = { backgroundColor: "transparent", top: "0px" },
  backgroundColor,
  size,
  handleClick,
  tooltip = false,
  hidden = false,
  margin = "0px"
}) => {
  const classes = useStyles({ hover })();

  return (
    <Tooltip title={tooltip} disableHoverListener={!tooltip}>
      <IconButton
        hidden={hidden}
        onClick={handleClick}
        style={{ color, backgroundColor, margin }}
        classes={{ root: classes.root }}
      >
        <Icon fontSize={size} />
      </IconButton>
    </Tooltip>
  );
};

export default memo(IconButtonPresentation);
