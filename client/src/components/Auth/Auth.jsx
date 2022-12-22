import React, {useState, useEffect} from 'react'
import {FaGoogle } from "react-icons/fa";
import {useDispatch} from 'react-redux'
import {useNavigate, useLocation } from 'react-router-dom'


import {signup, signin } from '../../actions/auth'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'

import './Auth.css';

const Auth = () => {
  const clientId = process.env.clientId;

  const initialState = {email: '', password: '', confirmPassword: ''}
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const location = useLocation()

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatchEvent(signup(form, history))
    } else {
      dispatchEvent(signin(form, history))
    }
  }

  const handleChange = () => {

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
            <input name="email" label="Email Address" handleChange={handleChange}/>
            <label className='form-label'>Password</label>
            <input name="password" label="Password" handleChange={handleChange}/>
            <label className='form-label'>Confirm Password</label>
            <input name="password" label="Password" handleChange={handleChange}/>

            <div className="form-button">
              <button>{isSignup ? 'Sign In' : 'Sign Up'}</button>
            </div>
            <GoogleLogin
              
              clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
              render={(renderProps) => (
                
                <button className='google-login-button' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">
                  <FaGoogle/>Sign in with Google
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
          </form>

          <div className='form-switch'>
              {isSignup ? 'No Account Yet? Register Here': ''}
          </div>
        </div>  
        
      </div>
    </div>
  )
}

export default Auth