import React, {useState, useEffect} from 'react'
import {FaGoogle } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'


import {signup, signin } from '../../actions/auth'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'

import './Auth.css';

const Auth = () => {
  const dispatch = useDispatch();
  const clientId = process.env.clientId;

  const initialState = {email: '', password: '', confirmPassword: ''}
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const location = useLocation()

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form.password);
    console.log(isSignup);
    if (isSignup) {
      checkPassword();
      dispatch(signup(form, history))
      console.log(form);
    } else {
      dispatch(signin(form, history))
    }
  }
  const checkPassword = () => {
    if(form.password === form.confirmPassword) {
      console.log('password matched')
    } else {
      console.log('password not matched')
    }
  }
  const switchForm = () => {
    setIsSignup(!isSignup);
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  const googleSuccess = () => {

  }
  const googleError = () => {

  }

  useEffect(() => {
    const initClient = () => {
       gapi.client.init({
          clientId: clientId,
          scope: '',
       })
    }
    gapi.load('client:auth2', initClient)
 }, [location])

  return (
    <div className='auth'>
      <div className="auth-container">
        <div className="form-container">
          <div className='sign'>
            <h4>Welcome to Utterworld</h4>
          </div>
          <form className='form' onSubmit={handleSubmit}>
            <label className='form-label'>Username or Email</label>
            <input name="email" label="Email Address" onChange={handleChange}/>
            <label className='form-label'>Password</label>
            <input name="password" label="Password" onChange={handleChange}/>
            {isSignup && 
              <>
                <label className='form-label'>Confirm Password</label>
                <input name="confirmPassword" label="Password" onChange={handleChange}/>
              </>
            }

            <div className="form-button">
              <button type="submit">{isSignup ? 'Sign Up' : 'Sign In'}</button>
            </div>
            <GoogleLogin
              
              clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
              render={(renderProps) => (
                
                <button className='google-login-button' onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">
                  <FaGoogle/>Sign in with Google
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
          </form>

          <div className='form-switch' onClick={switchForm}>
              {isSignup ? 'Already have an account? Sign in' : 'No Account Yet? Register Here'}
          </div>
        </div>  
        
      </div>
    </div>
  )
}

export default Auth