import React, { useEffect } from "react";
import HOC from "../../../sharedComponents/presentation/HOC";
import { makeStyles } from "@material-ui/core/styles";
import { getSpecificUser } from "../../../store/actions/user";
import RenderUserData from './components/renderUserData';
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: '#2D2824'
  },
  wallpaperContainer: {
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
  },
}));

const Profile = ({ match={} }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const specificUserData = useSelector((state) => state.user.specificUserData);

  useEffect(() => {
    if (match.params && match.params.id) {
      dispatch(getSpecificUser(match.params.id));
    }
  }, [match]); 

  return (
    <div className={classes.root}>
      <div className={classes.wallpaperContainer} />
      <RenderUserData specificUserData={specificUserData} />
    </div>
  );
};

export default HOC(Profile);
