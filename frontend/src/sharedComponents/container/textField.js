import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Button from "../presentation/button";

const TextFieldContainer = ({
  classes,
  placeholder,
  endAdorment,
  label,
  onChange = null,
  dataType,
  value,
  params = null,
  disabled
}) => {
  let obj = {
    placeholder,
    onChange: (e) => onChange(e, dataType),
    value,
    label,
  };

  let props = params ? params : obj;

  return (
    <TextField
      InputProps={{
        classes: {
          underline: classes.underline,
          root: classes.inputRoot,
        },
        endAdornment: (
          <InputAdornment position="start">
            {endAdorment && <Button title="Search" />}
          </InputAdornment>
        ),
      }}
      {...props}
      color="white"
      disabled={disabled}
      className={classes.TextField}
      classes={{ root: classes.root }}
    />
  );
};

export default TextFieldContainer;
