import React from "react";
import UploadFileModal from "./uploadFileModal";
import UploadFileWrapper from "../../../../sharedComponents/presentation/uploadHub/handleUploadModal";

const UploadFile = ({ match }) => (
  <UploadFileWrapper
    match={match}
    renderProps={(value, setModal) =>
      value && <UploadFileModal match={match} closeModal={setModal} />
    }
  />
);

export default UploadFile;
