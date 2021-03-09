import React, { useState } from "react";
import UploadHubWrapper from "../../../sharedComponents/presentation/uploadHub";
import NoteList from '../container/noteList';

const BlogHub = ({ match }) => {
  const tabsData = useState(["Notes"])[0];

  const renderComponent = (value) => {
    if (value === 0) return <NoteList match={match} />;
  };

  return (
    <UploadHubWrapper
      tabsData={tabsData}
      renderProps={(value) => renderComponent(value)}
    />
  );
};

export default BlogHub;
