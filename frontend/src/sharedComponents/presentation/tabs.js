import React, { memo } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabBar = ({ data = [], value, handleClick }) => (
  <AppBar position="static" style={{height: '48px'}}>
    <Tabs
      value={value}
      onChange={handleClick}
      aria-label="simple tabs example"
      variant="scrollable"
      scrollButtons="auto"
    >
      {data.map((v, i) => {
        return <Tab key={i} value={i} label={v} {...a11yProps(i)} />;
      })}
    </Tabs>
  </AppBar>
);

export default TabBar;
