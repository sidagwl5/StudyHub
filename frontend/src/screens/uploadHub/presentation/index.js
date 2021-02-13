import React, { useState } from "react";
import FileList from "../container/fileList";
import UploadHubWrapper from "../../../sharedComponents/presentation/uploadHub";

const UploadHub = ({ match }) => {
  const tabsData = useState(["Files"])[0];

  const renderComponent = (value) => {
    if (value === 0) return <FileList match={match} />;
  };

  return (
    <UploadHubWrapper
      tabsData={tabsData}
      renderProps={(value) => renderComponent(value)}
    />
  );
};

export default UploadHub;
