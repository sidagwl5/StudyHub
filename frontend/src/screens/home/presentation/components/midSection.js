import React from 'react'
import TextField from '../../../../sharedComponents/presentation/textField'
import Grid from '@material-ui/core/Grid'

const MidSection = () => {
    return (
        <Grid
            xs={12}
            style={{
              height: "calc(100% - 120px)",
              padding: "20px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField /> 
          </Grid>
    )
}

export default MidSection
