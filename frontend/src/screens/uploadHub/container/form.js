import React, { useState, useEffect } from "react";

import Autocomplete from "../../../sharedComponents/presentation/autocomplete";
import UpdateFileNotice from "../presentation/updateFileNotice";
import { makeStyles } from "@material-ui/core/styles";
import fieldsForFileUpload from "../../../resources/staticData/fieldsForFileUpload.json";

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

const Form = ({ handleChange, specificFileData, data, closeModal, values }) => {
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
        {fieldsForFileUpload.map((attributes, index) => (
          <Autocomplete
            key={index}
            data={data[attributes.id]}
            {...attributes}
            onChange={handleChange.bind(this, attributes.id, attributes.child)}
            isDisabled={disabled}
            values={values}
          />
        ))}

        {/* <Autocomplete /> */}

        {!specificFileData && (
          <input
            type="file"
            accept=".pdf"
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default Form;




/*  {
        "label": "Enter Name",
        "id": "name",
        "child": "college",
        "width": "45%"
    }, */