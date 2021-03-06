import React, { useEffect } from "react";
import { getSpecificUpload } from "../../../store/actions/upload";
import { useDispatch, useSelector } from "react-redux";
import HOC from "../../../sharedComponents/presentation/HOC";
import UserProfile from "../../../sharedComponents/presentation/wrappers/userProfile";
import Avatar from "../../../sharedComponents/presentation/profilePic";
import readingBooks from "../../../resources/images/readingBooks.png";
import { makeStyles } from "@material-ui/core/styles";
import RenderButtons from "./components/renderButtons";
import RenderList from "./components/renderList";
import RenderIcons from "./components/renderIcons";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    padding: "15px",
    display: "flex",
    backgroundColor: "#393e3f",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "auto",
  },
  root_child1: {
    position: "relative",
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "12px",
    color: "white",
    "& div:nth-child(1)": {
      padding: "1px",
      borderRadius: "500px",
      backgroundColor: "#EACFCF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& p": { margin: "15px 0px", fontSize: "20px" },
  },
  root_child2: {
    position: "relative",
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "30px",
    color: "white",
    borderLeft: "0.7px #9D9292 solid",
    "& h1": {
      fontFamily: "bebas neue",
      fontSize: "60px",
      color: "#EAC852",
    },
  },
}));

const Review = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const specificFileData = useSelector(
    (state) => state.upload.specificFileData
  );

  useEffect(() => {
    return () => {
      dispatch({ type: "GET_SPECIFIC_UPLOAD", payload: null });
    };
  }, []);

  useEffect(() => {
    dispatch(getSpecificUpload(match.params.id));
  }, [match]);

  return (
    <UserProfile
      renderProps={(userProfile) => (
        <div className={classes.root}>
          {userProfile && specificFileData ? (
            <>
              <div className={classes.root_child1}>
                <div>
                  <Avatar
                    radius="110px"
                    avatar={specificFileData.uploaderId.imageUrl}
                  />
                </div>
                <p> {specificFileData.uploaderId.name} </p>
                <RenderButtons
                  status={specificFileData.status}
                  id={specificFileData._id}
                  isAdmin={userProfile.isAdmin}
                />
              </div>
              <div className={classes.root_child2}>
                <h1>{specificFileData.name}</h1>
                <RenderList
                  list={[
                    {
                      label: "University",
                      data: specificFileData.university,
                    },
                    {
                      label: "College",
                      data: specificFileData.college,
                    },
                    {
                      label: "Degree",
                      data: specificFileData.degree,
                    },
                    {
                      label: "Course",
                      data: specificFileData.course,
                    },
                    {
                      label: "Semester",
                      data: specificFileData.semester,
                    },
                    {
                      label: "Type",
                      data: specificFileData.type,
                    },
                  ]}
                />

                <RenderIcons
                  url={specificFileData.url}
                  status={specificFileData.status}
                  favourites={specificFileData.favourites}
                  isAdmin={userProfile.isAdmin}
                />
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
            </>
          ) : (
            <p style={{ color: 'white' }}>File Data Loading...</p>
          )}
        </div>
      )}
    />
  );
};

export default HOC(Review);
