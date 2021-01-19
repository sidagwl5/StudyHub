import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import data from "../../resources/staticData/detailForUniversities.json";
import TextField from '../../sharedComponents/presentation/textField';

const AutocompletePresentation = () => {
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.university}
      value={value}
      fullWidth
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => <TextField params={params} />}
    />
  );
};

export default AutocompletePresentation;
