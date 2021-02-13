import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import IconButton from "../presentation/iconButton";
import { logOut } from "../../store/actions/user";
import Menu from "../presentation/menu";
import history from '../../utils/createHistory';
import Button from '../presentation/button';

const Navbar = () => {
  const userData = useSelector((state) => state.user.persistantUserData);
  const isAdmin = userData && userData.isAdmin;
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(logOut());
  }, []);

  return userData ? (
    <>
      {isAdmin && (
        <Menu
          
          Source={(props) => <Button title="Options" {...props} />}
          items={[
            {
              name: "Users",
              operation: () => history.push("/users"),
            },
            {
              name: "Uploads",
              operation: () => console.log("uploads"),
            },
          ]}
        />
      )}
      <IconButton
        size="small"
        color="white"
        hover={{ backgroundColor: "orange" }}
        handleClick={handleClick}
        Icon={(props) => <MeetingRoomIcon {...props} />}
      />
    </>
  ) : null;
};

export default Navbar;
