import React from "react";
import { useSelector, useDispatch } from "react-redux";
import history from "../../../utils/createHistory";
import ColorArray from '../../../resources/staticData/colorArray.json';

import ModalContainer from "../../../sharedComponents/presentation/modal/modalContainer";

const RemindUserOfNoteModal = () => {
  const dispatch = useDispatch();
  const remindUserOfNoteModal = useSelector(
    (state) => state.note.remindUserOfNoteModal
  );
  const notes = useSelector((state) => state.note.notes);

  const handleClose = () => {
    dispatch({ type: "REMIND_USER_ABOUT_NOTES_MODAL", payload: false });
  };

  const chooseColor = () => {
    return ColorArray[Math.floor((Math.random())*8)];
 }

  return (
    remindUserOfNoteModal && (
      <ModalContainer
        handleClose={handleClose}
        height="400px"
        width="500px"
        alignItems="flex-start"
        btnContainerBgColor="rgb(249, 249, 255)"
        cancelBtnProps={{
          handleClick: handleClose,
          backgroundColor: "#BCBCE0",
          title: "Cancel",
          padding: "6px 20px",
        }}
        specificBtnProps={{
          handleClick: () => {
            handleClose();
            history.push("/notes");
          },
          backgroundColor: "#9898C9",
          title: "Notes",
          padding: "6px 20px",
        }}
      >
        <h1 style={{padding: '0px 5px', fontFamily: 'bebas neue'}}>Alert!</h1>
        <p style={{padding: '0px 5px'}}>You are reminded for these notes!</p>  
        <div
          style={{
            flexGrow: 1,
            width: "100%",
            backgroundColor: "rgb(249, 249, 255)",
            textAlign: "center",
            padding: "20px",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {notes
            .filter((note) => note.alert)
            .map((v) => (
              <div
                style={{
                  position: "relative",
                  width: "200px",
                  height: "50px",
                  backgroundColor: chooseColor(),
                  cursor: "pointer",
                  borderRadius: "7px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  handleClose();
                  history.push("/notes");
                }}
              >
                {v.title}
              </div>
            ))}
        </div>
      </ModalContainer>
    )
  );
};

export default RemindUserOfNoteModal;
