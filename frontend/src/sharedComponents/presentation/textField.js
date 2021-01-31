import React, { memo } from "react";
import TextFieldContainer from "../container/textField";
import { makeStyles } from "@material-ui/core/styles";

const TextField = ({ radius, width, endAdorment, label, height, onChange, dataType, value, params, disabled=false }) => {
  const classes = makeStyles(() => ({
    root: {
      position: "relative",
      borderRadius: radius || "35px",
      width: width || "600px",
      minWidth: "200px",
      border: "none",
      backgroundColor: "white",
      display: "flex",
      height: height || '40px',
      flexDirection: "row",
      alignItems: "flex-end",
      margin: "10px",
      padding: '0px 10px',
      boxShadow: "0.5px 0.5px 15px rgba(128, 128, 128, 0.2)",
    },
    TextField: {
      position: "relative",
      overflow: "hidden",
    },
    underline: {
      "&&:before": {
        borderBottom: "none",
      },
      "&&:after": {
        borderBottom: "none",
      },
    },
    inputRoot: {
      position: "relative",
      width: "100%",
      height: "100%",
      padding: "0px 10px",
      "&&:hover": {
        borderBottom: "none",
      },
    },
  }))();

  return (
    <TextFieldContainer
      classes={classes}
      placeholder="Search something..."
      endAdorment={endAdorment}
      label={label}
      onChange={onChange}
      dataType={dataType}
      value={value}
      params={params}
      disabled={disabled}
    />
  );
};

export default memo(TextField)
