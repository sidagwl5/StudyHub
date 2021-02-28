import React, { useState } from "react";
import { uploadAccept, uploadReject, deleteUpload } from "../../../../store/actions/upload";
import Button from "../../../../sharedComponents/presentation/button";
import { useDispatch } from 'react-redux';

const RenderButtons = ({ isAdmin, id, status }) => {

  const dispatch = useDispatch();  
  const props = useState({
    padding: "7px 27px",
    radius: "8px",
    fontSize: "19px",
    margin: "10px 0px",
  })[0];

  const handleReject = (id) => {
    dispatch(uploadReject(id));
  };

  const handleAccept = (id) => {
    dispatch(uploadAccept(id));
  };

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteUpload(id));
  };

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!isAdmin || status === "Success" ? (
        <Button
          {...props}
          title="Delete"
          backgroundColor="#E34877"
          handleClick={handleDelete.bind(this, id)}
        />
      ) : (
        <>
          <Button
            {...props}
            title="Approve"
            backgroundColor="#52CA82"
            handleClick={handleAccept.bind(this, id)}
          />
          <Button
            {...props}
            title="Reject"
            backgroundColor="#E34877"
            handleClick={handleReject.bind(this, id)}
          />
        </>
      )}
    </div>
  );
};

export default RenderButtons;
