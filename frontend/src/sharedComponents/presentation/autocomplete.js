import React, { memo } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import data from "../../resources/staticData/detailForUniversities.json";
// import TextField from '../../sharedComponents/presentation/textField';
import TextField from "@material-ui/core/TextField";

const AutocompletePresentation = ({
  onChange = null,
  data,
  id,
  label,
  value,
  width,
  isDisabled,
}) => {

  return (
    <Autocomplete
      id={id}
      options={Object.keys(data)}
      style={{ width }}
      getOptionLabel={(option) => option}
      value={value}
      fullWidth
      disabled={isDisabled}
      onChange={onChange.bind(this, id)}
      renderInput={(params) => <TextField id={id} label={label} {...params} />}
    />
  );
};

export default memo(AutocompletePresentation);
