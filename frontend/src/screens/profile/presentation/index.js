import React from "react";
import HOC from "../../../sharedComponents/presentation/HOC";
import { makeStyles } from "@material-ui/core/styles";
import RenderUserData from './components/renderUserData';

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
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
  root_part1: {
    position: "relative",
    width: "80%",
    height: "200px",
    backgroundColor: "whitesmoke",
    display: "flex",
    alignItems: "center",
    padding: "20px",
  },
}));

const Profile = ({ match }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wallpaperContainer} />
      <RenderUserData classes={classes} match={match} />
    </div>
  );
};

export default HOC(Profile);
