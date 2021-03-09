import React, { useEffect } from "react";
import { getAllFilesData } from "../../../store/actions/upload";
import { useDispatch, useSelector } from "react-redux";
import FileCard from "../presentation/fileCard";
import UploadFile from "./uploadFile";
import { makeStyles } from "@material-ui/core/styles";
import history from "../../../utils/createHistory";
import addUpload from '../../../resources/images/addUpload.png';

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

const FileList = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allFilesData = useSelector((state) => state.upload.allFilesData);

  useEffect(() => {
    if (!allFilesData.length) {
      dispatch(getAllFilesData());
    }
  }, []);

  return (
    <div className={classes.root}>
      <UploadFile match={match} />
      {allFilesData.length ? (
        allFilesData.map((fileData) => (
          <button onClick={() => history.push(`/review/${fileData._id}`)}>
            <FileCard data={fileData} />
          </button>
        ))
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              fontFamily: "bebas neue",
              fontSize: "30px",
            }}
          >
            No Files uploaded yet!
          </p>
          <img
            style={{
              objectFit: "contain",
              width: "45%",
              minWidth: "350px",
              position: "relative",
              top: "13px",
            }}
            src={addUpload}
          />
        </div>
      )}
    </div>
  );
};

export default FileList;
