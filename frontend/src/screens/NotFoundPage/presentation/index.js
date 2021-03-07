import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "../../../sharedComponents/presentation/button";
import history from "../../../utils/createHistory";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100vh",
    backgroundColor: "#FAEBEB",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "#131212",
    "& h1": {
      fontFamily: "bebas neue",
      fontSize: "200px",
      letterSpacing: "5px",
      margin: "0px",
      padding: "0px",
    },
    "& h4": {
      fontFamily: "bebas neue",
      fontSize: "35px",
    },
    "& p": {
      fontFamily: "roboto",
      fontSize: "15px",
      maxWidth: "280px",
      fontWeight: 500,
      textAlign: "center",
    },
  },
}));

const NotFoundPage = ({ button = false, title, subtitle, para }) => {  
  
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>{title}</h1>
      <h4>{subtitle}</h4>
      <p>{para}</p>
      {button && (
        <Button
          title="HOMEPAGE"
          handleClick={() => history.replace("/")}
          backgroundColor="#68EA94"
          textColor="#131212"
          radius="0px"
        />
      )}
    </div>
  );
};

export default NotFoundPage;
