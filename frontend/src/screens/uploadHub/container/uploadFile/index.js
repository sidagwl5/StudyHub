import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import UploadFileModal from "./uploadFileModal";

const UploadFile = ({ match }) => {
  const [modal, setModal] = useState(false);

  const renderUploadModal = () =>
    modal && <UploadFileModal match={match} closeModal={setModal.bind(this, false)} />;

  useEffect(() => {
    if(match.params && match.params.id) setModal(true);
  }, [match])  

  return (
    <>
      <Fab
        style={{ position: "absolute", right: "10px", bottom: "10px" }}
        onClick={setModal.bind(this, true)}
      >
        <AddIcon />
      </Fab>
      {renderUploadModal()}
    </>
  );
};

export default UploadFile;
