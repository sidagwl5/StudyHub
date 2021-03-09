import React, { useState, useEffect } from "react";
import UpdateFileNotice from "../../../../sharedComponents/presentation/uploadHub/updateFileNotice";
import { makeStyles } from "@material-ui/core/styles";
import fieldsForNoteUpload from "../../../../resources/staticData/fieldsForNoteUpload.json";
import TextField from "../../../../sharedComponents/presentation/textField";

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

const Form = ({ handleChange, specificBlogData, closeModal, values }) => {
  const [disabled, setDisabled] = useState(false);
  const classes = useStyles();

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
        {fieldsForNoteUpload.map((attributes) => {
          if (attributes.label === "Reminder") {
            return (
                <TextField
                {...attributes}
                type="date"
                onChange={handleChange}
              />
            );
          } else {
            return (
              <TextField
                {...attributes}
                key={attributes.id}
                value={values[attributes.id]}
                disabled={disabled}
                onChange={handleChange}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Form;
