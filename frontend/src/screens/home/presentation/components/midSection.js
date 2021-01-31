import React, { useEffect } from "react";
import TextField from "../../../../sharedComponents/presentation/textField";
import Grid from "@material-ui/core/Grid";
import MidSectionMessage from "../../container/midSectionMessage";
import LoginSuccessModal from "../../container/loginSuccessModal";

const MidSection = () => {
  return (
    <Grid
      xs={12}
      style={{
        height: "calc(100% - 120px)",
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MidSectionMessage />
      <LoginSuccessModal />
      <TextField endAdorment={true} />
    </Grid>
  );
};

export default MidSection;
