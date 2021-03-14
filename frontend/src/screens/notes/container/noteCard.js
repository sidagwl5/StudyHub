import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "../../../sharedComponents/presentation/iconButton";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { deleteNote } from '../../../store/actions/notes';
import Reminder from './reminder';

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

const FileCard = ({ data: { title, description, reminder, _id: id } }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteNote(id))
  };

  const date = new Date(reminder);
  return (
    <div
      style={{
        width: "260px",
        height: "320px",
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(255, 240, 136, 0.9)",
        margin: '15px',
        justifyContent: 'space-between',
        padding: '10px'
      }}
    >
         <div
          style={{
              position: 'absolute',
              right: '-21px',
              top: '-21px'
          }}
         >  
        <IconButton
          Icon={(props) => <DeleteIcon {...props} />}
          color={red}
          handleClick={handleDelete}
        />
      </div>
        <div>  
        <h1 style={{ color: "rgba(128, 128, 128, 0.8)" }}>
          {title}
        </h1>
        <p style={{ color: "rgba(128, 128, 128, 0.8)" }}>
          {description}
        </p>
        </div>
        <div>
        <p style={{fontSize: "0.8em"}} >Reminder: {reminder ? date.toDateString() : null}</p>
        {
            reminder && (
                 <>
                  <WatchLaterIcon />
                  <span><Reminder reminder={reminder} id={id} /></span>
                 </>
            )
        }
        </div>
    </div>
  );
};

export default memo(FileCard);
