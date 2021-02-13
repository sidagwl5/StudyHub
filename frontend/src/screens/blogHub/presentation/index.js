import React, { useState } from "react";
import BlogList from "../container/blogList";
import UploadHubWrapper from "../../../sharedComponents/presentation/uploadHub";

const BlogHub = ({ match }) => {
  const tabsData = useState(["Blogs"])[0];

  const renderComponent = (value) => {
    if (value === 0) return <BlogList match={match} />;
  };

  return (
    <UploadHubWrapper
      tabsData={tabsData}
      renderProps={(value) => renderComponent(value)}
    />
  );
};

export default BlogHub;
