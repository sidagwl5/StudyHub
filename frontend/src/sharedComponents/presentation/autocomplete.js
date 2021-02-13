import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import data from "../../resources/staticData/detailForUniversities.json";
// import TextField from '../../sharedComponents/presentation/textField';
import TextField from "@material-ui/core/TextField";

const AutocompletePresentation = ({
  onChange = null,
  data,
  id,
  label,
  parent,
  child,
  values,
  isDisabled,
}) => {


  let disabled = false;
  if (isDisabled) {
     disabled = true;
  }
  else if (id !== 'university' && !values[parent]) {
    disabled = true;
  }
  else if (id !== 'course' && values[child]){
    disabled = true;
  }

  console.log(data, id);

  return (
    <Autocomplete
      id={id}
      data-item="college"
      options={Object.keys(data)}
      style={{ width: "45%" }}
      getOptionLabel={(option) => option}
      value={values[id]}
      fullWidth
      disabled={disabled}
      onChange={onChange}
      renderInput={(params) => <TextField label={label} {...params} />}
    />
  );
};

export default AutocompletePresentation;
