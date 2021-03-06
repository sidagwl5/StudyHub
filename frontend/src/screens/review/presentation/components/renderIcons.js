import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Badge from "@material-ui/core/Badge";
import GetAppIcon from "@material-ui/icons/GetApp";
import IconButton from "../../../../sharedComponents/presentation/iconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WatchLaterIcon from "@material-ui/icons/WatchLater";

const RenderIcons = ({ status, favourites, isAdmin, url }) => {
  const handleDownload = () => {
    const path = require(`../../../../resources${url}`).default;
    window.open(path);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        position: "relative",
      }}
    >
      <IconButton
        tooltip={status}
        size="large"
        margin="0px 5px"
        Icon={(props) =>
          status === "Pending" ? (
            <WatchLaterIcon {...props} style={{ color: "red" }} />
          ) : (
            <CheckCircleIcon {...props} style={{ color: "#52CA82" }} />
          )
        }
      />

      {status !== "Pending" && (
        <IconButton
          size="large"
          color="pink"
          Icon={(props) => (
            <Badge color="secondary" showZero badgeContent={favourites}>
              <FavoriteIcon {...props} />
            </Badge>
          )}
        />
      )}
      {(status !== "Pending" || isAdmin) && (
        <IconButton
          Icon={(props) => <GetAppIcon {...props} />}
          color="#52CA82"
          size="large"
          margin="0px 5px"
          handleClick={handleDownload}
        />
      )}
    </div>
  );
};

export default RenderIcons;
