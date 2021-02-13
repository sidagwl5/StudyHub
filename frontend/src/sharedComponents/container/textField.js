import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Button from "../presentation/button";

const TextFieldContainer = ({
  classes,
  placeholder,
  endAdorment = null,
  label,
  onChange = null,
  id = null,
  value,
  params = null,
  disabled,
}) => {
  let staticProps = {
    placeholder,
    onChange,
    value,
    label,
  };

  let props = params ? params : staticProps;

  return (
    <TextField
      id={id}
      InputLabelProps={{
        classes: { root: classes.labelRoot },
      }}
      InputProps={{
        classes: {
          underline: classes.underline,
          root: classes.inputRoot,
        },
        endAdornment: (
          <InputAdornment position="start">{endAdorment}</InputAdornment>
        ),
      }}
      {...props}
      color="white"
      disabled={disabled}
      classes={{ root: classes.root }}
    />
  );
};

export default TextFieldContainer;
