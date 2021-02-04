import React, { useEffect } from "react";
import { getAllFilesData } from "../../../store/actions/upload";
import { useDispatch, useSelector } from "react-redux";
import FileCard from "../presentation/fileCard";

const FileList = () => {
  const dispatch = useDispatch();
  const allFilesData = useSelector((state) => state.upload.allFilesData);

  useEffect(() => {
    if (!allFilesData.length) {
      dispatch(getAllFilesData());
    }
  }, []);

  return (
      allFilesData.length ? (
        allFilesData.map((fileData) => <FileCard data={fileData} />)
      ) : <p>No files uploaded yet!</p>
  );
};

export default FileList;
