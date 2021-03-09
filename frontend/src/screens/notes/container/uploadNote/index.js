import React, { memo } from "react";
import UploadFileWrapper from "../../../../sharedComponents/presentation/uploadHub/handleUploadModal";
import UploadNoteModal from "./uploadNoteModal";

const UploadNote = ({ match }) => (
  <UploadFileWrapper
    match={match}
    renderProps={(value, setModal) =>
      value && <UploadNoteModal match={match} closeModal={setModal} />
    }
  />
);

export default memo(UploadNote);
