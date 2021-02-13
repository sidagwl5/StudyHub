import React, { memo } from "react";
import TextFieldContainer from "../container/textField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = props => makeStyles(() => ({
  root: {
    borderRadius: props.radius || "35px",
    width: props.width || "600px",
    minWidth: "200px",
    backgroundColor: "white",
    height: props.height || "40px",
    margin: "10px",
    display: 'flex',
    alignItems: 'center',
    boxShadow: "0.5px 0.5px 15px rgba(128, 128, 128, 0.2)",
  },
  labelRoot: {
    left: '10px',
    top: '-7px'
  },
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
  inputRoot: {
    width: "100%",
    height: "100%",
    padding: '0px 15px',
  },
}));

const TextField = ({
  radius,
  width,
  endAdorment,
  label,
  height,
  onChange,
  id,
  value,
  params,
  disabled = false,
}) => {
  const classes = useStyles({ radius, width, height })();
  return (
    <TextFieldContainer
      classes={classes}
      placeholder="Search something..."
      endAdorment={endAdorment}
      label={label}
      onChange={onChange}
      value={value}
      id={id}
      params={params}
      disabled={disabled}
    />
  );
};

export default memo(TextField);
