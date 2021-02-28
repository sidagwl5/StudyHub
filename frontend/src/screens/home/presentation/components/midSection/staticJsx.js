import React from "react";
import Button from "../../../../../sharedComponents/presentation/button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: { position: "relative", width: "60%" },
  submain: {
    position: "relative",
    top: "17%",
    fontFamily: "bebas neue",
    padding: "20px",
  },
  heading: { color: "#2C2929", fontSize: "90px", lineHeight: "95px" },
  span: { color: "white", fontSize: "105px" },
}));

const StaticJsx = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.submain}>
        <h1 className={classes.heading}>
          <div>
            A <span className={classes.span}>study</span> material
          </div>
          <div> sharing platform </div>
        </h1>
        <Button
          margin="0px"
          radius="0px 35px 35px 0px"
          title="Explore"
          backgroundColor="#2C2627"
          textColor="#CCC15A"
          fontSize="25px"
          padding="10px 37px"
        />
      </div>
    </div>
  );
};

export default StaticJsx;
