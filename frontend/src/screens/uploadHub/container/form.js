import React, { useState, useEffect } from "react";

import Autocomplete from "../../../sharedComponents/presentation/autocomplete";
import UpdateFileNotice from "../../../sharedComponents/presentation/uploadHub/updateFileNotice";
import { makeStyles } from "@material-ui/core/styles";
import fieldsForFileUpload from "../../../resources/staticData/fieldsForFileUpload.json";
import TextField from "../../../sharedComponents/presentation/textField";

const useStyles = makeStyles(() => ({
  buttonContainer: {
    width: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  textFieldContainer: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
}));

const Form = ({
  handleChangeForAutocomplete,
  handleChangeForTextfield,
  specificFileData,
  data,
  closeModal,
  values,
}) => {
  const [disabled, setDisabled] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (specificFileData) {
      setDisabled(true);
    }
  }, [specificFileData]);

  return (
    <div style={{ width: "100%" }}>
      {disabled && (
        <UpdateFileNotice
          type="warning"
          message="Do you want to make some changes!"
          onReject={closeModal}
          onAccept={setDisabled.bind(this, false)}
        />
      )}

      <div className={classes.textFieldContainer}>
        <TextField
          key={"name"}
          value={values["name"]}
          width={fieldsForFileUpload[0].width}
          onChange={handleChangeForTextfield}
          id={fieldsForFileUpload[0].id}
          disabled={disabled}
        />
        {fieldsForFileUpload.slice(1).map((attributes, index) => {
          let isDisabled = false;
          if (disabled) {
            isDisabled = true;
          } else if (
            attributes.id !== "university" &&
            !values[attributes.parent]
          ) {
            isDisabled = true;
          } else if (attributes.id !== "course" && values[attributes.child]) {
            isDisabled = true;
          }

          return (
            <Autocomplete
              key={attributes.id}
              data={data[attributes.id]}
              {...attributes}
              onChange={handleChangeForAutocomplete}
              isDisabled={isDisabled}
              value={values[attributes.id]}
            />
          );
        })}

        {/* <Autocomplete /> */}

        {!specificFileData && (
          <input type="file" accept=".pdf" id="file" onChange={handleChangeForTextfield} />
        )}
      </div>
    </div>
  );
};

export default Form;
