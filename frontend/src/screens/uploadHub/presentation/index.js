import React, { useState } from "react";
import FileList from "../container/fileList";
import FavouriteFileList from "../container/favouriteList";
import LatestFileList from "../container/latestFileList";
import UploadHubWrapper from "../../../sharedComponents/presentation/uploadHub";

const UploadHub = ({ match }) => {
  const tabsData = useState(["Files", "Favourites", "Latest"])[0];

  const renderComponent = (value) => {
    if (value === 0) return <FileList match={match} />;
    if (value === 1) return <FavouriteFileList match={match} />;
    if (value === 2) return <LatestFileList match={match} />;
  };

  return (
    <UploadHubWrapper
      tabsData={tabsData}
      renderProps={(value) => renderComponent(value)}
    />
  );
};

export default UploadHub;
