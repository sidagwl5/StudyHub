import React, { useEffect } from "react";
import { getAllBlogsData } from "../../../store/actions/blog";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import UploadBlog from './uploadBlog';

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    padding: "15px",
  },
}));

const BlogList = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allBlogsData = useSelector((state) => state.blog.allBlogsData);

  useEffect(() => {
    if (!allBlogsData.length) {
      dispatch(getAllBlogsData());
    }
  }, []);



  return (
    <div className={classes.root}>
      <UploadBlog match={match} />
    </div>
  );
};

export default BlogList;
