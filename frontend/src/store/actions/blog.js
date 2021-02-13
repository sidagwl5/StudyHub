import {
  GET_SPECIFIC_BLOG,
  GET_ALL_BLOGS_DATA,
  FILTER_ALL_BLOGS_DATA_BY_ID,
} from "../types";
import axios from "../../utils/api";
import errorHandler from "../../utils/errorHandler";
import successHandler from "../../utils/successHandler";
import history from "../../utils/createHistory";

export const uploadBlog = (blogData) => async (dispatch) => {
  try {
    const { status, data } = await axios.post("/blog", blogData);

    if (status === 200) {
      history.push("/");
      dispatch(successHandler(data));
    }
  } catch (error) {
    console.log(error);
    dispatch(errorHandler(error));
  }
};

export const getSpecificBlog = (blogId) => async (dispatch) => {
  try {
    const { status, data } = await axios.get(`/blog/${blogId}`);
    status === 200 && dispatch({ type: GET_SPECIFIC_BLOG, payload: data });
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const getAllBlogsData = () => async (dispatch) => {
  try {
    const { status, data } = await axios.get(`/blog`);
    status === 200 && dispatch({ type: GET_ALL_BLOGS_DATA, payload: data });
  } catch (error) {
    dispatch(errorHandler(error));
  }
};
