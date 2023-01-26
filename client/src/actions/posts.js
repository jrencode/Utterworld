import {START_LOADING, CREATE, UPDATE, FETCH_ALL, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data })

  } catch (error) {
    
  }
}

export const createPost = (post) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createPost(post);
  
      dispatch({ type: CREATE, payload: data });

    } catch (error) {
      console.log(error);
    }
  };
  
export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
      console.log(id, updatedPost);
      const { data } = await api.updatePost(id, updatedPost);
      
      if(data) {
        dispatch({ type: UPDATE, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const {data} = await api.deletePost(id);

    if (data) {
      dispatch({type: DELETE, payload: id})
    }
    
  } catch (error) {
    console.log(error);
  }
}