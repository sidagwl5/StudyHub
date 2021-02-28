import { useSelector } from "react-redux";

const UserProfile = ({ renderProps }) => {
  const userProfile = useSelector((state) => state.user.userProfile);
  return renderProps(userProfile);
};

export default UserProfile;
