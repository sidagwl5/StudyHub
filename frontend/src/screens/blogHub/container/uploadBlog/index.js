import React, { memo } from "react";
import UploadFileWrapper from "../../../../sharedComponents/presentation/uploadHub/handleUploadModal";
// import UploadFileModal from "./uploadFileModal";

const UploadFile = ({ match }) => (
    <UploadFileWrapper
      match={match}
      renderProps={(value, setModal) => null
        // value && <UploadFileModal match={match} closeModal={setModal} />
      }
    />
  );

export default memo(UploadFile);
