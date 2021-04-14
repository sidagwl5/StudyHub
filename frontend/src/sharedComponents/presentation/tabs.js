import React, { memo } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  tabRoot: {
    color: "grey",
  },
  selected: {
    color: "black",
  },
}));

const TabBar = ({ data = [], value, handleClick }) => {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      style={{ height: "48px", backgroundColor: "transparent" }}
    >
      <Tabs
        value={value}
        onChange={handleClick}
        aria-label="simple tabs example"
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{
          style: {
            backgroundColor: "orange",
            borderRadius: "25px",
            height: "4px",
          },
        }}
      >
        {data.map((v, i) => {
          return (
            <Tab
              classes={{ root: classes.tabRoot, selected: classes.selected }}
              key={i}
              value={i}
              label={v}
              {...a11yProps(i)}
            />
          );
        })}
      </Tabs>
    </AppBar>
  );
};

export default TabBar;
