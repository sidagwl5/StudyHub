import React from "react";
import { useSelector, useDispatch } from "react-redux";
import history from "../../../utils/createHistory";

import ModalContainer from "../../../sharedComponents/presentation/modal/modalContainer";
import successImage from "../../../resources/images/success.png";

const LoginSuccessModal = () => {
  const dispatch = useDispatch();
  const setLoginSuccessModal = useSelector(
    (state) => state.user.setLoginSuccessModal
  );
  const notes = useSelector(
    (state) => state.note.notes
  );

  const handleClose = () => {
    dispatch({ type: "SET_LOGIN_SUCCESS_MODAL", payload: false });
    if(notes.find(v => v.alert)) 
      setTimeout(() => dispatch({ type: 'REMIND_USER_ABOUT_NOTES_MODAL', payload: true }), 1000);
  };

  return (
    setLoginSuccessModal && (
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
          handleClick: () => history.push("/uploadhub"),
          backgroundColor: "#9898C9",
          title: "Explore",
          padding: "6px 20px",
        }}
      >
        <img src={successImage} style={{ width: "90%", margin: "0px auto" }} />
        <div
          style={{
            flexGrow: 1,
            width: "100%",
            backgroundColor: "rgb(249, 249, 255)",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <p style={{ color: "#313438" }}>You have logged in successfully!</p>
        </div>
      </ModalContainer>
    )
  );
};

export default LoginSuccessModal;
