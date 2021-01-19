import React, { useState, useMemo } from "react";
import TextField from "../../../sharedComponents/presentation/textField";
import Button from "../../../sharedComponents/presentation/button";
import axios from "../../../utils/api";
import Autocomplete from '../../../sharedComponents/presentation/autocomplete';

const Form = () => {
  const [formData, setFormData] = useState({});
  const handleClick = () => {
    let formDataArray = Object.keys(formData);
    if (formDataArray.length !== 8) {
      alert("all fields erquired!");
      return false;
    }

    let data = new FormData();

    formDataArray.forEach((v) => {
      data.append(v, formData[v]);
    });

    axios.post("/upload", data).then((res) => {
      console.log(res.data);
      setFormData({});
    });
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
    }),
    []
  );

  return (
    <div
      style={{
        width: "55%",
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
  );
};

export default Form;
