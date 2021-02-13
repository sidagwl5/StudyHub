import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "../../../sharedComponents/presentation/iconButton";
import Avatar from "../../../sharedComponents/presentation/profilePic";
import notes from "../../../resources/images/notes.jpg";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Tooltip from "@material-ui/core/Tooltip";
import GetAppIcon from "@material-ui/icons/GetApp";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 260,
    margin: "10px",
    height: "355px",
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
    description,
    university,
    college,
    uploaderId,
    status,
    url,
  },
}) => {
  const classes = useStyles();

  const handleDownload = () => {
    const path = require(`../../../resources${url}`).default;
    window.open(path);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar title={uploaderId.firstName} avatar={uploaderId.imageUrl} />
        }
        title={name}
        subheader={type}
      />
      <CardMedia className={classes.media} image={notes} title={name} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {university}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {college}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton Icon={(props) => <FavoriteIcon {...props} />} />
        {status === "Pending" ? (
          <Tooltip title={status}>
            <CancelIcon style={{ color: "red" }} />
          </Tooltip>
        ) : (
          <Tooltip title={status}>
            <CheckCircleIcon style={{ color: "green" }} />
          </Tooltip>
        )}

        <IconButton
          hidden={status === "Pending"}
          Icon={(props) => <GetAppIcon {...props} />}
          handleClick={handleDownload}
        />
      </CardActions>
    </Card>
  );
};

export default memo(FileCard);
