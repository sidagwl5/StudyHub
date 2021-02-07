import React, { useState } from "react";
import HighOrderContainer from "../../../sharedComponents/presentation/HOC";
import Form from "../container/form";
import Tab from "../../../sharedComponents/presentation/tabs";
import FileList from '../container/fileList';

const UploadHub = ({ match }) => {
  const tabsData = useState(["Files", "Upload"])[0];
  const [value, setValue] = useState(1);

  const handleClick = (_, value) => {
    setValue(value);
  };

  const renderComponent = () => {
    if (value === 1) return <Form match={match} />;
    else return <FileList />
  };

  console.log(value);

  return (
    <>
      <Tab data={tabsData} handleClick={handleClick} value={value} />
      <div
        style={{
          position: "relative",
          height: "calc(100% - 48px)",
          width: "100%",
          display: 'flex',
          justifyContent: 'center',
          padding: '15px',
          flexWrap: 'wrap',
          overflowY: 'auto'
        }}
      >
        {renderComponent()}
      </div>
    </>
  );
};

export default HighOrderContainer(UploadHub);
