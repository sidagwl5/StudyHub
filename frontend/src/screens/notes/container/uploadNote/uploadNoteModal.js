import React, { useState, useEffect, useCallback } from "react";
import ModalContainer from "../../../../sharedComponents/presentation/modal/modalContainer";
import Form from "./form";
import { useDispatch, useSelector } from "react-redux";
import { postNote } from '../../../../store/actions/notes';
import { uploadNoteInitialValues } from "../../../../resources/staticData/uploadFormInitialValues.js";

const UploadFileModal = ({
  closeModal,
  title = "Upload",
  type = "add",
  match,
}) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(uploadNoteInitialValues(""));

  const handleChange = useCallback((event) => { 
    let type = event.target.id;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [type]: event.target.value,
    }));
  }, []);

  // upload data
  const handleUpload = useCallback(() => {

    console.log(formValues);
    let dataKeys = Object.keys(formValues);
    if (dataKeys.find((key) => key !== 'remainder' && !formValues[key])) {
      alert("All fields are required!");
      return;
    }

    dispatch(postNote(formValues));
    closeModal();
  }, [formValues]);

  return (
    <ModalContainer
      handleClose={closeModal}
      width="600px"
      height="330px"
      specificBtnProps={{
        handleClick: handleUpload,
        backgroundColor: "#A5A544",
        title,
        textColor: "white",
        padding: "6px 28px",
        radius: "35px",
      }}
      cancelBtnProps={{
        handleClick: closeModal,
        backgroundColor: "#BDBD76",
        title: "Cancel",
        textColor: "white",
        padding: "6px 28px",
        radius: "35px",
      }}
    >
      <Form 
       handleChange={handleChange}
       closeModal={closeModal}
       values={formValues}
      />
    </ModalContainer>
  );
};

export default UploadFileModal;
