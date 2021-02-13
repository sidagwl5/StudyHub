import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";

import ModalContainer from "../../../sharedComponents/presentation/modal/modalContainer";
import successImage from "../../../resources/images/success.png";

const LoginSuccessModal = ({ classes }) => {
  const dispatch = useDispatch();
  const setLoginSuccessModal = useSelector(
    (state) => state.user.setLoginSuccessModal
  );

  const handleClose = () => {
    dispatch({ type: "UNSET_LOGIN_SUCCESS_MODAL", payload: false });
  };

  return (
    setLoginSuccessModal && (
      <ModalContainer
        handleClose={handleClose}
        height="450px"
        alignItems="flex-start"
      >
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          You have logged In successfully!
        </Typography>
        <Typography variant="body2">
          Now you can experience other features provided as well!
        </Typography>

        <div className={classes.imageContainer}>
          <img className={classes.image} src={successImage} />
        </div>
      </ModalContainer>
    )
  );
};

export default LoginSuccessModal;
