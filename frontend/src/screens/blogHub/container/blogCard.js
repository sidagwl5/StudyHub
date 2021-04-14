import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "../../../sharedComponents/presentation/iconButton";
import Avatar from "../../../sharedComponents/presentation/profilePic";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { updateUpload } from "../../../store/actions/upload";
import Badge from "@material-ui/core/Badge";
import colorArray from "../../../resources/staticData/colorArray.json";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";

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
  data: { title, description, uploaderId, _id, favourites },
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfile);
  const userFavourites = userProfile ? userProfile.favourites : [];
  const userId = userProfile ? userProfile._id : null;

  const handleLikePost = () => {
    dispatch(
      updateUpload(_id, { favourites: favourites + 1, type: "addToFavourites" })
    );
  };

  const handleUnlikePost = () => {
    dispatch(
      updateUpload(_id, {
        favourites: favourites - 1,
        type: "removeFromFavourites",
      })
    );
  };

  const chooseColor = () => {
    return Math.floor((Math.random())*8);
 }

 const handleDelete = (event) => {
  event.stopPropagation();
}

  return (
    <div
      style={{
        width: "260px",
        height: "320px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0.5px 0.5px 20px rgba(128, 128, 128, 0.3)",
        margin: '0px 9px'
      }}
    >
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
            justifyContent: "flex-end",
          }}
        >
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
        <p style={{ fontSize: "0.8em", color: "rgba(128, 128, 128, 0.8)" }}>
          {title}
        </p>
        <p style={{ fontSize: "0.8em", color: "rgba(128, 128, 128, 0.8)" }}>
          {description}
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
          {userFavourites.find((v) => v == _id) ? (
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(FileCard);
