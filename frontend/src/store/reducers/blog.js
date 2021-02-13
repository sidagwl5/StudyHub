import {
    GET_SPECIFIC_BLOG,
    GET_ALL_BLOGS_DATA,
    FILTER_ALL_BLOGS_DATA_BY_ID,
    LOGOUT_SUCCESS,
    NOT_RECOGNIZED,
  } from "../types";
  
  const initialState = {
    allBlogsData: [],
    specificBlogData: null,
  };
  
  export default (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_SPECIFIC_BLOG:
        return { ...state, specificBlogData: payload };
  
      case GET_ALL_BLOGS_DATA:
        return { ...state, allBlogsData: payload };
  
      case FILTER_ALL_BLOGS_DATA_BY_ID:
        return {
          ...state,
          allBlogsData: state.allBlogsData.filter((file) => file._id != payload),
        };
  
      case LOGOUT_SUCCESS:
      case NOT_RECOGNIZED:
        return initialState;
  
      default:
        return state;
    }
  };
  