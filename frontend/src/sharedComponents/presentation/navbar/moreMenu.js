import React from 'react'
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "../menu";
import { makeStyles } from "@material-ui/core/styles";
import history from '../../../utils/createHistory';
import IconButton from "../iconButton";

const useStyles = makeStyles((theme) => ({
    desktopMoreMenu: {
      display: "none",
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
    },
  }));

const MoreMenu = () => {

    const classes = useStyles();
    return (
        <div className={classes.desktopMoreMenu}>
        <Menu
          Source={(props) => (
            <IconButton 
             {...props} 
             color="white" 
             Icon={(props) => <MoreVertIcon {...props} />} />
          )}
          items={[
            {
              name: "Upload Hub",
              operation: () => history.push('/uploadhub'),
            },
            {
              name: "Profile",
              operation: () => console.log("uploads"),
            },
          ]}
        />
      </div>
    )
}

export default MoreMenu
