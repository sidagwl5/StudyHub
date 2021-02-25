import React from "react";
import Button from '../button';

const ModalActions = ({
  classes,
  cancelBtnProps={},
  specificBtnProps=null
}) => (
  <div className={classes.buttonContainer}>
    {specificBtnProps && (
      <Button
        {...specificBtnProps}
      />
    )}

    <Button 
     {...cancelBtnProps}
    />
  </div>
);

export default ModalActions;
