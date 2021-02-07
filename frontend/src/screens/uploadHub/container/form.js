import React, { useState, useMemo, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "../../../sharedComponents/presentation/textField";
import Button from "../../../sharedComponents/presentation/button";
import Autocomplete from "../../../sharedComponents/presentation/autocomplete";
import UpdateFileNotice from "../presentation/updateFileNotice";
import { uploadFile, getSpecificUpload } from "../../../store/actions/upload";
import { makeStyles } from "@material-ui/core/styles";
import uploadFormInitialValues from "../../../resources/staticData/uploadFormInitialValues.json";

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

const Form = ({ match }) => {
  const [disabled, setDisabled] = useState(false);
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState(uploadFormInitialValues);
  const textFieldArray = useState([
    {
      label: "Enter File Name",
      dataType: "name",
    },
    {
      dataType: "university",
      label: "Enter University Name",
    },
    {
      dataType: "college",
      label: "Enter College Name",
    },
    {
      label: "Enter Branch Name",
      dataType: "branch",
    },
    {
      label: "Enter Course Name",
      dataType: "course",
    },
    {
      label: "Enter Semester",
      dataType: "semester",
    },
    {
      dataType: "type",
      label: "Enter Type",
    },
  ])[0];

  const classes = useStyles();
  const dispatch = useDispatch();

  const specificFileData = useSelector(
    (state) => state.upload.specificFileData
  );

  useEffect(() => {
    if (match.params.id) dispatch(getSpecificUpload(match.params.id));
  }, [match]);

  useEffect(() => {
    if (specificFileData) {
      setDisabled(true);
      setUpdate(true);
    }
  }, [specificFileData]);

  useEffect(() => {
    if (specificFileData) {
      const {
        name,
        university,
        college,
        course,
        branch,
        semester,
        type,
        url,
      } = specificFileData;
      setFormData({
        name,
        university,
        college,
        course,
        branch,
        semester,
        type,
        file: require(`../../../resources${url}`).default,
      });
    }
  }, [specificFileData]);

  useEffect(() => {
    return () => {
      dispatch({ type: 'GET_SPECIFIC_UPLOAD', payload: null });
    }
  }, [])

  const handleClick = (e) => {
    e.preventDefault();
    let formDataArray = Object.keys(formData);
    if (formDataArray.length !== 8) {
      alert("all fields erquired!");
      return false;
    }

    let data = new FormData();

    formDataArray.forEach((v) => {
      data.append(v, formData[v]);
    });

    dispatch(uploadFile(data));
    // setTimeout(() => setFormData(uploadFormInitialValues), 1000);
  };

  const handleChange = (event, type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: event.target.value,
    }));
  };

  const textProps = useMemo(
    () => ({
      radius: "0px",
      height: "50px",
      width: "45%",
      onChange: handleChange,
      endAdorment: false,
      disabled,
    }),
    [disabled]
  );

  const handleReject = useCallback(() => {
    setUpdate(false);
  }, []);

  const handleAccept = useCallback(() => {
    setDisabled(false);
    setUpdate(false);
  }, []);

  return (
    <div style={{ width: "55%" }}>
      {update && (
        <UpdateFileNotice
          type="warning"
          message="Do you want to make some changes!"
          onReject={handleReject}
          onAccept={handleAccept}
        />
      )}

      <div className={classes.textFieldContainer}>
        {textFieldArray.map((attributes, index) => (
          <TextField
            key={index}
            {...attributes}
            {...textProps}
            value={formData[attributes.dataType]}
          />
        ))}

        {/* <Autocomplete /> */}

        {!specificFileData && (
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
            }}
          />
        )}

        <div className={classes.buttonContainer}>
          <Button title="Submit" handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default memo(Form);
