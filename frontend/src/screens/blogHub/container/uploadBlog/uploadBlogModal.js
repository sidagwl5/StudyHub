import React, { useState, useEffect, useCallback } from "react";
import ModalContainer from "../../../../sharedComponents/presentation/modal/modalContainer";
import Form from "./form";
import { uploadBlog, getSpecificBlog } from "../../../../store/actions/blog";
import { useDispatch, useSelector } from "react-redux";
import { uploadBlogInitialValues } from "../../../../resources/staticData/uploadFormInitialValues.js";

const UploadFileModal = ({
  closeModal,
  title = "Upload",
  type = "add",
  match,
}) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(uploadBlogInitialValues(""));

  const specificBlogData = useSelector((state) => state.blog.specificBlogData);

  useEffect(() => {
    if (match.params && match.params.id)
      dispatch(getSpecificBlog(match.params.id));
  }, [match]);

  // component will unmount
  useEffect(() => {
    return () => {
      specificBlogData &&
        dispatch({ type: "GET_SPECIFIC_BLOG", payload: null });
    };
  }, []);

  // set data of file (in update case)
  useEffect(() => {
    if (specificBlogData) {
      setFormValues(specificBlogData);
    }
  }, [specificBlogData]);

  // change form data

  const handleChange = useCallback((event) => {
    console.log(event.target.id);  
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
    if (dataKeys.find((key) => !formValues[key])) {
      alert("All fields are required!");
      return;
    }

    dispatch(uploadBlog(formValues));
    closeModal();
  }, [formValues]);

  return (
    <ModalContainer
      handleClose={closeModal}
      width="600px"
      height="330px"
      btnTitle={title}
      action={handleUpload}
    >
      <Form 
       handleChange={handleChange}
       specificBlogData={specificBlogData}
       closeModal={closeModal}
       values={formValues}
      />
    </ModalContainer>
  );
};

export default UploadFileModal;
