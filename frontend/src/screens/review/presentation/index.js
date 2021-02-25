import React, { useEffect } from "react";
import {
  getSpecificUpload,
  uploadReject,
  uploadAccept,
} from "../../../store/actions/upload";
import { useDispatch, useSelector } from "react-redux";
import HOC from "../../../sharedComponents/presentation/HOC";
import Avatar from "../../../sharedComponents/presentation/profilePic";
import Button from "../../../sharedComponents/presentation/button";
import readingBooks from "../../../resources/images/readingBooks.png";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Badge from "@material-ui/core/Badge";
import GetAppIcon from "@material-ui/icons/GetApp";
import IconButton from "../../../sharedComponents/presentation/iconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WatchLaterIcon from "@material-ui/icons/WatchLater";

const Review = ({ match }) => {
  const dispatch = useDispatch();
  const specificFileData = useSelector(
    (state) => state.upload.specificFileData
  );

  const userProfile = useSelector((state) => state.user.userProfile);

  useEffect(() => {
    return () => {
      dispatch({ type: "GET_SPECIFIC_UPLOAD", payload: null });
    };
  }, []);

  useEffect(() => {
    dispatch(getSpecificUpload(match.params.id));
  }, [match]);

  const handleReject = (id) => {
    dispatch(uploadReject(id));
  };

  const handleAccept = (id) => {
    dispatch(uploadAccept(id));
  };

  const handleDownload = () => {
    const path = require(`../../../resources${specificFileData.url}`).default;
    window.open(path);
  };

  return (
    <>
      {specificFileData ? (
        <>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              padding: "15px",
              display: "flex",
              backgroundColor: "#393e3f",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "30%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "12px",
                color: "white",
              }}
            >
              <div
                style={{
                  padding: "4px",
                  borderRadius: "500px",
                  backgroundColor: "#EACFCF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  radius="110px"
                  avatar={specificFileData.uploaderId.imageUrl}
                />
              </div>
              <p style={{ margin: "15px 0px", fontSize: "20px" }}>
                {specificFileData.uploaderId.name}
              </p>
              {userProfile.isAdmin && (
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {specificFileData.status !== "Pending" ? (
                    <Button
                      title="Delete"
                      padding="7px 27px"
                      backgroundColor="#E34877"
                      radius="8px"
                      textColor="white"
                      fontSize="19px"
                      margin="10px 0px"
                      handleClick={handleAccept.bind(
                        this,
                        specificFileData._id
                      )}
                    />
                  ) : (
                    <>
                      <Button
                        title="Approve"
                        padding="7px 27px"
                        backgroundColor="#52CA82"
                        radius="8px"
                        textColor="white"
                        fontSize="19px"
                        margin="10px 0px"
                        handleClick={handleAccept.bind(
                          this,
                          specificFileData._id
                        )}
                      />
                      <Button
                        title="Reject"
                        padding="7px 27px"
                        backgroundColor="#E34877"
                        radius="8px"
                        textColor="white"
                        fontSize="19px"
                        margin="10px 0px"
                        handleClick={handleReject.bind(
                          this,
                          specificFileData._id
                        )}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
            <div
              style={{
                position: "relative",
                width: "70%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "30px",
                color: "white",
                borderLeft: "0.7px #9D9292 solid",
              }}
            >
              <h1
                style={{
                  fontFamily: "bebas neue",
                  fontSize: "60px",
                  color: "#EAC852",
                }}
              >
                {specificFileData.name}
              </h1>
              <ul style={{ marginTop: "15px" }}>
                <li
                  style={{
                    fontSize: "20px",
                    margin: "10px",
                    color: "#DA9F46",
                  }}
                >
                  <p style={{ color: "white" }}>
                    <strong>University : </strong>
                    <span
                      style={{
                        marginLeft: "15px",
                        fontSize: "17px",
                        color: "#F6EDED",
                      }}
                    >
                      {specificFileData.university}
                    </span>
                  </p>
                </li>
                <li
                  style={{
                    fontSize: "20px",
                    margin: "10px",
                    color: "#DA9F46",
                  }}
                >
                  <p style={{ color: "white" }}>
                    <strong>College : </strong>
                    <span
                      style={{
                        marginLeft: "15px",
                        fontSize: "17px",
                        color: "#F6EDED",
                      }}
                    >
                      {specificFileData.college}
                    </span>
                  </p>
                </li>
                <li
                  style={{
                    fontSize: "20px",
                    margin: "10px",
                    color: "#DA9F46",
                  }}
                >
                  <p style={{ color: "white" }}>
                    <strong>Degree : </strong>
                    <span
                      style={{
                        marginLeft: "15px",
                        fontSize: "17px",
                        color: "#F6EDED",
                      }}
                    >
                      {specificFileData.degree}
                    </span>
                  </p>
                </li>
                <li
                  style={{
                    fontSize: "20px",
                    margin: "10px",
                    color: "#DA9F46",
                  }}
                >
                  <p style={{ color: "white" }}>
                    <strong>Course : </strong>
                    <span
                      style={{
                        marginLeft: "15px",
                        fontSize: "17px",
                        color: "#F6EDED",
                      }}
                    >
                      {specificFileData.course}
                    </span>
                  </p>
                </li>
                <li
                  style={{
                    fontSize: "20px",
                    margin: "10px",
                    color: "#DA9F46",
                  }}
                >
                  <p style={{ color: "white" }}>
                    <strong>Semester : </strong>
                    <span
                      style={{
                        marginLeft: "15px",
                        fontSize: "17px",
                        color: "#F6EDED",
                      }}
                    >
                      {specificFileData.semester}
                    </span>
                  </p>
                </li>
                <li
                  style={{
                    fontSize: "20px",
                    margin: "10px",
                    color: "#DA9F46",
                  }}
                >
                  <p style={{ color: "white" }}>
                    <strong>Type : </strong>
                    <span
                      style={{
                        marginLeft: "15px",
                        fontSize: "17px",
                        color: "#F6EDED",
                      }}
                    >
                      {specificFileData.type}
                    </span>
                  </p>
                </li>
              </ul>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  position: "relative",
                }}
              >
                <IconButton
                  tooltip={specificFileData.status}
                  size="large"
                  margin= '0px 5px'
                  Icon={(props) =>
                    specificFileData.status === "Pending" ? (
                      <WatchLaterIcon {...props} style={{ color: "red" }} />
                    ) : (
                      <CheckCircleIcon {...props} style={{ color: "#52CA82" }} />
                    )
                  }
                />
                {specificFileData.status !== "Pending" && (
                    <IconButton 
                     size="large"
                     color="pink"
                     Icon={props => 
                      <Badge
                      color="secondary"
                      showZero
                      badgeContent={specificFileData.favourites}
                    >
                     <FavoriteIcon {...props} />
                     </Badge> 
                     }
                    />
                )}
                {(specificFileData.status !== "Pending" ||
                  userProfile.isAdmin) && (
                  <IconButton
                    Icon={(props) => <GetAppIcon {...props} />}
                    color="#52CA82"
                    size="large"
                    margin= '0px 5px'
                    handleClick={handleDownload}
                  />
                )}
              </div>
            </div>
            <img
              style={{
                position: "absolute",
                right: "25px",
                bottom: "20px",
                width: "300px",
              }}
              src={readingBooks}
            />
          </div>
        </>
      ) : (
        <p>File Data Loading...</p>
      )}
    </>
  );
};

export default HOC(Review);
