import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "../../../sharedComponents/presentation/iconButton";
import Avatar from "../../../sharedComponents/presentation/profilePic";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import GetAppIcon from "@material-ui/icons/GetApp";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { updateUpload } from "../../../store/actions/upload";
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from "@material-ui/icons/Delete";
import { red } from "@material-ui/core/colors";
import colorArray from "../../../resources/staticData/colorArray.json";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 260,
    margin: "10px",
    maxHeight: "400px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const FileCard = ({
  data: {
    name,
    type,
    college,
    uploaderId,
    status,
    url,
    _id,
    favourites,
    createdAt
  },
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfile);
  const userFavourites = userProfile ? userProfile.favourites : [];
  const userId = userProfile ? userProfile._id : null;

  const handleDownload = () => {
    const path = require(`../../../resources${url}`).default;
    window.open(path);
  };

  const handleLikePost = () => {
    dispatch(
      updateUpload(_id, { favourites: favourites + 1, type: "addToFavourites" })
    );
  };

  const chooseColor = () => {
    return Math.floor(Math.random() * 8);
  };

  const handleUnlikePost = () => {
    dispatch(
      updateUpload(_id, {
        favourites: favourites - 1,
        type: "removeFromFavourites",
      })
    );
  };

  const handleDelete = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      style={{
        position: 'relative',
        width: "260px",
        height: "320px",
        display: "flex",
        margin: "10px 13px",
        flexDirection: "column",
        boxShadow: "0.5px 0.5px 20px rgba(128, 128, 128, 0.3)",
      }}
    >
      <Tooltip title="favourites">
      <div
        style={{
          position: "absolute",
          width: "25px",
          zIndex: 500,
          backgroundColor: '#757575',
          height: "25px",
          color: 'white',
          right: '-10px',
          top: '-10px',
          fontSize: '10px',
          borderRadius: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {favourites}
      </div>
      </Tooltip>
      <div
        style={{
          width: "100%",
          height: "30%",
          backgroundColor: colorArray[chooseColor()],
          position: "relative",
        }}
      >
        <div
          style={{
            position: "relative",
            padding: "6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: 'center'
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
            {(new Date(createdAt).toDateString()).split(" ").slice(1,).join(" ")}
          </span>
          {userId == uploaderId._id && (
            <IconButton
              Icon={(props) => <DeleteIcon {...props} />}
              color={red}
              handleClick={handleDelete}
            />
          )}
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "97%",
            transform: "translate(-50%, -50%)",
            padding: "5px",
            backgroundColor: "white",
            borderRadius: "60px",
          }}
        >
          <Avatar radius="60px" avatar={uploaderId.imageUrl} />
        </div>
      </div>
      <div
        style={{
          marginTop: "30px",
          flexGrow: 1,
          width: "100%",
          position: "relative",
          padding: "15px",
          textAlign: "center",
        }}
      >
        <p style={{ fontFamily: "bebas neue", fontSize: "1.6em" }}>{name}</p>
        <p style={{ fontSize: "0.8em", color: "rgba(128, 128, 128, 0.8)" }}>
          {college}
        </p>
        <p style={{ fontSize: "0.8em", color: "rgba(128, 128, 128, 0.8)" }}>
          {type}
        </p>
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {status !== "Pending" &&
            (userFavourites.find((v) => v == _id) ? (
              <IconButton
                handleClick={handleUnlikePost}
                Icon={(props) => <FavoriteIcon {...props} />}
                color="darkpink"
              />
            ) : (
              <IconButton
                handleClick={handleLikePost}
                Icon={(props) => <FavoriteBorderIcon {...props} />}
                color="darkpink"
                disabled={userId === uploaderId._id}
                tooltip={userId === uploaderId._id ? 'You cannot like you own upload' : null}
              />
            ))}

          <IconButton
            tooltip={status}
            Icon={() =>
              status === "Pending" ? (
                <WatchLaterIcon style={{ color: "red" }} />
              ) : (
                <CheckCircleIcon style={{ color: "green" }} />
              )
            }
          />

          {status !== "Pending" && (
            <IconButton
              Icon={(props) => <GetAppIcon {...props} />}
              handleClick={handleDownload}
              color="black"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(FileCard);
