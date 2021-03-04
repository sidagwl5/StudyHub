import React from "react";
import ProfilePic from "../../../../sharedComponents/presentation/profilePic";
import UserProfileWrapper from "../../../../sharedComponents/presentation/wrappers/userProfile";
import LinearProgress from "../../../../sharedComponents/presentation/linearProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({

  root:{
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  root_part1: {
    position: "relative",
    width: "80%",
    height: "200px",
    backgroundColor: "#58642D",
    display: "flex",
    alignItems: "center",
    padding: "20px",
    "& div:nth-child(2)": {
      position: "relative",
      height: "100%",
      flexGrow: 1,
      padding: "20px",
      color: "white",
      "& h1": {
        fontFamily: "bebas neue",
        fontSize: "46px",
      },
    },
  }
}));

const RenderUserData = ({ specificUserData = null }) => {
  const classes = useStyles();
  return (
    <UserProfileWrapper
      renderProps={(userProfile) => {
        const data = specificUserData || userProfile;
        return Boolean(data) ? (
          <div className={classes.root}>
            <div className={classes.root_part1}>
              <ProfilePic
                radius="150px"
                title={data.firstName}
                avatar={data.imageUrl}
              />
              <div>
                <h1>{data.name}</h1>
                <p>
                  <span style={{ opacity: "0.7" }}>Status:</span> {data.status}
                </p>
              </div>
            </div>
            <div
              className={classes.root_part1}
              style={{
                backgroundColor: "#3E4C2E",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <LinearProgress
                value={data.uploadsApproved.length}
                total={
                  data.uploadsApproved.length +
                  data.uploadsPending.length +
                  data.uploadsRejected
                }
                title="Approved"
              />
              <LinearProgress
                value={data.uploadsPending.length}
                total={
                  data.uploadsApproved.length +
                  data.uploadsPending.length +
                  data.uploadsRejected
                }
                title="Pending"
              />
              <LinearProgress
                value={data.uploadsRejected}
                title="Rejected"
                total={
                  data.uploadsApproved.length +
                  data.uploadsPending.length +
                  data.uploadsRejected
                }
              />
            </div>
          </div>
        ) : (
          <div>No data to show!</div>
        );
      }}
    />
  );
};

export default RenderUserData;
