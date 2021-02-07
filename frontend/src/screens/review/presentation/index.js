import React, { useEffect } from "react";
import { getSpecificUpload, uploadReject, uploadAccept } from "../../../store/actions/upload";
import { useDispatch, useSelector } from "react-redux";
import HOC from "../../../sharedComponents/presentation/HOC";
import Avatar from "../../../sharedComponents/presentation/profilePic";
import Button from '../../../sharedComponents/presentation/button';

const Review = ({ match }) => {
  const dispatch = useDispatch();
  const specificFileData = useSelector(
    (state) => state.upload.specificFileData
  );

  useEffect(() => {
    dispatch(getSpecificUpload(match.params.id));
  }, [match]);

  const handleReject = (id) => {
      dispatch(uploadReject(id));
  }

  const handleAccept = (id) => {
    dispatch(uploadAccept(id));
  }

  return (
    <>
      {specificFileData ? (
        <>
          <div
            style={{
              width: "100%",
              padding: "15px",
            }}
          >
            <Avatar
              radius="70px"
              avatar={specificFileData.uploaderId.imageUrl}
            />
            <span
              style={{
                height: "40px",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
                backgroundColor: "orange",
                padding: "5px 10px 5px 4px",
                position: "relative",
                top: "10px",
              }}
            >
              {specificFileData.uploaderId.name}
            </span>
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "calc(100% - 40px)",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '15px'
            }}
          >
            <p style={{fontSize: '27px'}}>
              <strong>University Name: </strong>
              {specificFileData.university}
            </p>
            <p style={{fontSize: '22px'}}>
              <strong>College Name: </strong>
              {specificFileData.college}
            </p>
            <p style={{fontSize: '19px'}}>
              <strong>Branch Name: </strong>
              {specificFileData.branch}
            </p>
            <p style={{color: 'rgba(128, 128, 128, 0.8)'}}>{specificFileData.type}</p>
            <div style={{display: 'flex'}}>
                <Button 
                 title="Reject"
                 textColor="black"
                 handleClick={handleReject.bind(this, specificFileData._id)}
                />
                <Button 
                 title="Approve"
                 handleClick={handleAccept.bind(this, specificFileData._id)}
                 textColor="black"
                 margin="0px 7px"
                />
            </div>
          </div>
        </>
      ) : (
        <p>File Data Loading...</p>
      )}
    </>
  );
};

export default HOC(Review);
