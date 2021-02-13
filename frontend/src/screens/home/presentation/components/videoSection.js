import React from "react";
import studyVideo from "../../../../resources/videos/study.mp4";

const VideoSection = () => (
  <video
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
    autoPlay
    muted
    loop
    src={studyVideo}
  />
);

export default VideoSection;
