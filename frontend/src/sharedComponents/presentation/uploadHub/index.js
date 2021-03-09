import React, { useState } from "react";
import HigherOrderContainer from "../HOC";
import Tab from "../tabs";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    height: "calc(100% - 48px)",
    width: "100%",
    overflowY: "auto",
  },
}));

const UploadHub = ({
  tabsData,
  renderProps,
}) => {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleClick = (_, value) => {
    setValue(value);
  };

  return (
    <>
      <Tab data={tabsData} handleClick={handleClick} value={value} />
      <div className={classes.root}>{renderProps(value)}</div>
    </>
  );
};

export default HigherOrderContainer(UploadHub);
