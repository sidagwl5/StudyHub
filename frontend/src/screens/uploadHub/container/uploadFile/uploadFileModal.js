import React, { useState, useEffect, useCallback } from "react";
import ModalContainer from "../../../../sharedComponents/presentation/modal/modalContainer";
import Form from "../form";
import {
  uploadFile,
  getSpecificUpload,
} from "../../../../store/actions/upload";
import { useDispatch, useSelector } from "react-redux";
import objectCreator from "../../../../resources/staticData/uploadFormInitialValues.js";
import detailForUniversities from "../../../../resources/staticData/detailForUniversities.json";

const UploadFileModal = ({
  closeModal,
  title = "Upload",
  type = "add",
  match,
}) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(objectCreator(""));
  const [formData, setFormData] = useState(objectCreator({}));

  const specificFileData = useSelector(
    (state) => state.upload.specificFileData
  );

  useEffect(() => {
    if (match.params && match.params.id)
      dispatch(getSpecificUpload(match.params.id));
  }, [match]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      university: detailForUniversities
    }));
  }, []);

  // component will unmount
  useEffect(() => {
    return () => {
      dispatch({ type: "GET_SPECIFIC_UPLOAD", payload: null });
    };
  }, []);

  // set data of file (in update case)
  useEffect(() => {
    if (specificFileData) {
      const { url, ...rest } = specificFileData;
      setFormValues(rest);
    }
  }, [specificFileData]);

  // change form data
  const handleChange = useCallback((type, child, event, value) => {
    // if (event.target.type === "file") {
    //   setFormData((prev) => ({
    //     ...prev,
    //     file: event.target.files[0],
    //   }));
    // } else {
    //   setFormData((prev) => ({
    //     ...prev,
    //     [event.target.id]: event.target.value,
    //   }));
    // }

    if(value){   
       setFormValues(prevFormValues => ({ ...prevFormValues, [type]: value }));
       if(type){
        setFormData(prevFormData => ({ ...prevFormData, [child]: prevFormData[type][value] }));
       }
    }
    else{
      setFormValues(prevFormValues => ({ ...prevFormValues, [type]: "" }));
    }
  }, []);

  // upload data
  const handleUpload = useCallback(() => {
    let dataKeys = Object.keys(formValues);
    if (dataKeys.find((key) => !formValues[key])) {
      alert("All fields are required!");
      return;
    }

    let apiData = new FormData();
    dataKeys.forEach((key) => {
      apiData.append(key, formValues[key]);
    });

    dispatch(uploadFile(apiData));
    setTimeout(() => closeModal(), 500);
  }, [formValues]);

  return (
    <ModalContainer
      handleClose={closeModal}
      width="700px"
      height="400px"
      btnTitle={title}
      action={handleUpload}
    >
      <Form
        specificFileData={specificFileData}
        handleChange={handleChange}
        values={formValues}
        data={formData}
        closeModal={closeModal}
      />
    </ModalContainer>
  );
};

export default UploadFileModal;
