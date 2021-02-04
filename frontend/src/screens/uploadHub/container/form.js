import React, { useState, useMemo, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "../../../sharedComponents/presentation/textField";
import Button from "../../../sharedComponents/presentation/button";
import Autocomplete from "../../../sharedComponents/presentation/autocomplete";
import UpdateFileNotice from "../presentation/updateFileNotice";
import { uploadFile, getSpecificUpload } from "../../../store/actions/upload";

const Form = ({ match }) => {
  const [disabled, setDisabled] = useState(false);
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    college: "",
    course: "",
    branch: "",
    semester: "",
    type: "",
  });
  const dispatch = useDispatch();

  const specificFileData = useSelector(
    (state) => state.upload.specificFileData
  );

  useEffect(() => {
    if (match.params.id) dispatch(getSpecificUpload(match.params.id));
  }, [match]);

  useEffect(() => {
    if(specificFileData){
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
      } = specificFileData;
      setFormData({
        name,
        university,
        college,
        course,
        branch,
        semester,
        type,
      });
    }
  }, [specificFileData]);

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

    console.log(data);
    dispatch(uploadFile(data));
    setTimeout(() => setFormData({
      name: "",
      university: "",
      college: "",
      course: "",
      branch: "",
      semester: "",
      type: "",
    }), 1000);
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

      {console.log(formData)} 
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <TextField
          {...textProps}
          label="Enter File Name"
          dataType="name"
          value={formData["name"]}
        />

        <TextField
          {...textProps}
          dataType="university"
          label="Enter University Name"
          value={formData["university"]}
        />
        <TextField
          {...textProps}
          dataType="college"
          label="Enter College Name"
          value={formData["college"]}
        />
        <TextField
          {...textProps}
          label="Enter Branch Name"
          dataType="branch"
          value={formData["branch"]}
        />

        <TextField
          {...textProps}
          width="30%"
          label="Enter Course Name"
          dataType="course"
          value={formData["course"]}
        />

        <TextField
          {...textProps}
          width="30%"
          label="Enter Semester"
          dataType="semester"
          value={formData["semester"]}
        />
        <TextField
          {...textProps}
          width="30%"
          dataType="type"
          label="Enter Type"
          value={formData["type"]}
        />

        <Autocomplete />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
          }}
        />

        <div
          style={{
            width: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button title="Submit" handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default memo(Form);
