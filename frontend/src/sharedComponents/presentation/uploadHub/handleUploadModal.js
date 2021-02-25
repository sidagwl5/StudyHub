import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const UploadFile = ({ match, renderProps }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if(match.params && match.params.id) setModal(true);
  }, [match])  

  return (
    <>
      <Fab
        style={{ position: "fixed", right: '10px', bottom: "10px", zIndex: 1000 }}
        onClick={setModal.bind(this, true)}
      >
        <AddIcon />
      </Fab>
      {renderProps(modal, setModal.bind(this, false))}
    </>
  );
};

export default UploadFile;