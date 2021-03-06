import React, { useEffect } from "react";
import { getAllBlogsData } from "../../../store/actions/blog";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import UploadBlog from './uploadBlog';
import BlogCard from './blogCard';

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    padding: "15px",
    alignItems: 'flex-start'
  },
}));

const BlogList = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allBlogsData = useSelector((state) => state.blog.allBlogsData);
  const userProfile = useSelector(state => state.user.userProfile);

  useEffect(() => {
      dispatch(getAllBlogsData());
  }, []);

  return (
    <div className={classes.root}>
      {Boolean(userProfile && userProfile.isAdmin) && <UploadBlog match={match} />}
      {allBlogsData.length ? (
        allBlogsData.map((blogData) => <BlogCard data={blogData} />)
      ) : (
        <p>No blogs uploaded yet!</p>
      )}
    </div>
  );
};

export default BlogList;
