import React, { memo } from "react";
import UploadFileWrapper from "../../../../sharedComponents/presentation/uploadHub/handleUploadModal";
import UploadBlogModal from "./uploadBlogModal";

const UploadFile = ({ match }) => (
    <UploadFileWrapper
      match={match}
      renderProps={(value, setModal) => 
        value && <UploadBlogModal match={match} closeModal={setModal} />
      }
    />
  );

export default memo(UploadFile);
