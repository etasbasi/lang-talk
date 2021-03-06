import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES,
  CHANGE_AVATAR,
  CLEAR_ERRORS
} from "./types";
import { toast } from "materialize-css";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => {
      history.push("/dashboard");
      toast({ html: "Profile info updated" });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This cannot be undone")) {
    axios
      .delete("api/profile")
      .then(res => {
        dispatch({ type: SET_CURRENT_USER, payload: {} });
        toast({ html: "Profile Deleted" });
      })
      .catch(err => dispatch({ GET_ERRORS, payload: err.response.data }));
  }
};

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res => dispatch({ type: GET_PROFILES, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILES, payload: null }));
};

export const getProfileById = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/user/${id}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: null }));
};

export const changeAvatar = avatar => dispatch => {
  // dispatch(setProfileLoading());
  let formData = new FormData();
  formData.append("avatar", avatar);
  axios
    .post("/api/profile/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(res => {
      toast({ html: "Avatar updated" });
      dispatch({ type: CLEAR_ERRORS });
      dispatch(setProfileLoading());
      dispatch({ type: CHANGE_AVATAR, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
