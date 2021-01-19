import React from "react";
import HighOrderContainer from '../../../sharedComponents/presentation/HOC';
import Form from '../container/form';

const UploadHub = () => {
  return (
     <>
      <Form />
     </>
  );
};

export default HighOrderContainer(UploadHub)
