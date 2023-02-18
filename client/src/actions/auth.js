import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import Cookies from 'js-cookie';

export const signin = (formData, history) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
      console.log(data);
      dispatch({ type: AUTH, payload: data });
      Cookies.set('auth_email', data.result.email)
      Cookies.set('auth_token', data.token); // set the 'auth_token' cookie with the token received from the API
      history('/');
    } catch (error) {
      console.log(error);
    }
  };
  
  export const signup = (formData, history) => async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
  
      dispatch({ type: AUTH, payload: data });
      Cookies.set('auth_email', data.result.email)
      Cookies.set('auth_token', data.token); // set the 'auth_token' cookie with the token received from the API
      history('/');
    } catch (error) {
      console.log(error);
    }
  };