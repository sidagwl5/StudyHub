import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import UploadNote from './uploadNote';
import NoteCard from './noteCard';
import addNotes from '../../../resources/images/addNotes.png';

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    padding: "15px",
    alignItems: 'flex-start'
  },
}));

const BlogList = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notes = useSelector(state => state.note.notes);

  return (
    <div className={classes.root}>
       <UploadNote match={match} /> 
       {notes.length ? (
        notes.map((noteData) => <NoteCard data={noteData} />)
      ) : (
         
       <div
        style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}
       > 
       <p style={{
            fontFamily: 'bebas neue',
            fontSize: '30px',
        }}>No notes uploaded yet!</p>
       <img
        style={{
            objectFit: 'contain',
            width: '45%',
            minWidth: '350px',
            position: 'relative',
            top: '13px'
        }}
       src = {addNotes} />
        </div>
      )}
    </div>
  );
};

export default BlogList;
