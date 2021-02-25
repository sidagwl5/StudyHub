import React, { useEffect } from "react";
import { getLatestFilesData } from "../../../store/actions/upload";
import { useDispatch, useSelector } from "react-redux";
import FileCard from "../presentation/fileCard";
import { makeStyles } from "@material-ui/core/styles";
import history from "../../../utils/createHistory";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    padding: "15px",
    alignItems: "flex-start",
  },
}));

const LatestFileList = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const latestFiles = useSelector((state) => state.upload.latestFiles);

  useEffect(() => {
      dispatch(getLatestFilesData());
  }, []);

  return (
    <div className={classes.root}>
      {latestFiles.length ? (
        latestFiles.map((fileData) => (
          <button onClick={() => history.push(`/review/${fileData._id}`)}>
            <FileCard data={fileData} />
          </button>
        ))
      ) : (
        <p>No files uploaded yet!</p>
      )}
    </div>
  );
};

export default LatestFileList;
