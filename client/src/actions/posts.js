import {START_LOADING, CREATE, UPDATE } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const createPost = (post, history) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createPost(post);
  
      dispatch({ type: CREATE, payload: data });
  
      history.push(`/posts/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  
export const updatePost = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error);
    }
};