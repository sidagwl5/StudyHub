import React from "react";
import ModalContainer from "../../../sharedComponents/presentation/modal/modalContainer";
import ModalActions from "../../../sharedComponents/presentation/modal/modalActions";
import ModalContent from "../presentation/components/modalContent";
import { useSelector, useDispatch } from "react-redux";

const LoginSuccessModal = () => {
  const dispatch = useDispatch();
  const setLoginSuccessModal = useSelector(
    (state) => state.user.setLoginSuccessModal
  );

  const handleClose = () => {
    dispatch({ type: "UNSET_LOGIN_SUCCESS_MODAL", payload: false });
  };

  return (
    setLoginSuccessModal && (
      <ModalContainer handleClose={handleClose}>
        {ModalContent}
        <ModalActions
          specificAction={{
            hidden: true,
            operation: null,
          }}
          cancelAction={handleClose}
        />
      </ModalContainer>
    )
  );
};

export default LoginSuccessModal;
