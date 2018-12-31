import axios from "axios";

import { GET_POSTS, POST_LOADING } from "./types";

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: null }));
};

export const setPostLoading = () => ({
  type: POST_LOADING
});
