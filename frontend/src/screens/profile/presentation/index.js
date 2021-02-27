import React, { useEffect } from "react";
import { authenticate, getSpecificUser } from "../../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import HOC from "../../../sharedComponents/presentation/HOC";
import ProfilePic from "../../../sharedComponents/presentation/profilePic";

const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfile);
  const specificUserData = useSelector((state) => state.user.specificUserData);

  const data = specificUserData || userProfile;

  useEffect(() => {
    if (match.params && match.params.id) {
      dispatch(getSpecificUser(match.params.id));
    } else {
      dispatch(authenticate());
    }
  }, [match]);

  return (
    Boolean(data) && (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            backgroundImage: "url(https://wallpapercave.com/wp/wp6868260.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(4px)",
            color: "white",
          }}
        />
        <div
          style={{
            position: 'relative',  
            width: "80%",
            height: "200px",
            backgroundColor: "whitesmoke",
            display: 'flex',
            alignItems: 'center',
            padding: '20px'
          }}
        >
          <ProfilePic radius="150px" title={data.firstName} avatar={data.imageUrl} />
        </div>
      </div>
    )
  );
};

export default HOC(Profile);
