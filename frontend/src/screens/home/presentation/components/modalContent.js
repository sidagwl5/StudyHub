import { Modal } from "@material-ui/core";
import React from "react";
import SuccessImage from "../../../../resources/images/success.png";

const ModalContent = (
  <div style={{ height: "calc(100% - 60px)", padding: "15px" }}>
    <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>
      You have logged In successfully!
    </p>
    <p style={{ fontSize: "0.9em" }}>
      Now you can experience other features provided as well!
    </p>

    <div style={{ height: "60%", position: "relative" }}>
      <img
        style={{ position: "absolute", width: "100%", objectFit: "contain" }}
        src={SuccessImage}
      />
    </div>
  </div>
);

export default ModalContent;
