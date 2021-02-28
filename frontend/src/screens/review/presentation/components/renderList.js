import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "15px",
    "& li": {
      fontSize: "20px",
      margin: "10px",
      color: "#DA9F46",
      "& p": {
        color: "white",
      },
      "& span": {
        marginLeft: "15px",
        fontSize: "17px",
        color: "#F6EDED",
      },
    },
  },
}));

const RenderList = ({ list }) => {
  const classes = useStyles();
  return (
    <ul className={classes.root}>
      {list.map((item) => (
        <li>
          <p>
            <strong>{item.label}: </strong>
            <span>{item.data}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default RenderList;
