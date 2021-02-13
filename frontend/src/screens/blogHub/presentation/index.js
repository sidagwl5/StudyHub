import React, { useState } from "react";
import HighOrderContainer from "../../../sharedComponents/presentation/HOC";
import Tab from "../../../sharedComponents/presentation/tabs";
// import FileList from "../container/fileList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    height: "calc(100% - 48px)",
    width: "100%",
    overflowY: "auto",
  },
}));

const UploadHub = ({ match }) => {
  const tabsData = useState(["Blogs"])[0];
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleClick = (_, value) => {
    setValue(value);
  };

  const renderComponent = () => {
    // if (value === 0) return <FileList match={match} />;
  };

  return (
    <>
      <Tab data={tabsData} handleClick={handleClick} value={value} />
      <div className={classes.root}>{renderComponent()}</div>
    </>
  );
};

export default HighOrderContainer(UploadHub);
