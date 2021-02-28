import React, { useEffect } from "react";
import { getSpecificUser } from "../../../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import ProfilePic from "../../../../sharedComponents/presentation/profilePic";
import UserProfileWrapper from "../../../../sharedComponents/presentation/wrappers/userProfile";

const RenderUserData = ({ classes, match }) => {
  const dispatch = useDispatch();
  const specificUserData = useSelector((state) => state.user.specificUserData);

  useEffect(() => {
    if (match.params && match.params.id) {
      dispatch(getSpecificUser(match.params.id));
    }
  }, [match]);

  return (
    <UserProfileWrapper
      renderProps={(userProfile) => {
        const data = specificUserData || userProfile;
        return Boolean(data) ? (
          <div className={classes.root_part1}>
            <ProfilePic
              radius="150px"
              title={data.firstName}
              avatar={data.imageUrl}
            />
          </div>
        ) : (
          <div>No data to show!</div>
        );
      }}
    />
  );
};

export default RenderUserData;
