import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Button from '../presentation/button';

const TextFieldContainer = ({ classes, placeholder }) => {

  const [value, setValue] = useState(""); 

  const handleClick = () => {
    console.log(value);
  }

  return (
    <TextField
      placeholder={placeholder}
      color="white"
      className={classes.TextField}
      classes={{ root: classes.root }}
      onChange={e => setValue(e.target.value)}
      InputProps={{
        classes: {
          underline: classes.underline,
          root: classes.inputRoot,
        },
        endAdornment: (
          <InputAdornment position="start">
            <Button title="Search" handleClick={handleClick} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TextFieldContainer;
