import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPosts, getPostsByAuthor } from '../../actions/posts'
import { getSearchItem } from '../../actions/displayItem'
import { useNavigate } from 'react-router-dom'
import * as actionType from '../../constants/actionTypes'
import decode from 'jwt-decode'
import Cookies from 'js-cookie'

import { useLocation } from 'react-router-dom';

import './Navbar.modules.css'
import Dropdown from '../../reusable_Components/DropdownMenu/DropdownMenu'

const Navbar = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   let location = useLocation();
   const authData = useSelector((state) => state.authReducer)
   const token = Cookies.get('auth_token');
   const loginEmail = Cookies.get('auth_email')

   const nav = [
      { name: 'Home', link: '/' },
      { name: 'About', link: '/about'},
      { name: 'Contact', link: '/contact'},
   ]
   console.log(token);
   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
   const brand = 'UTTERWORLD'
   const [menu, setMenu] = useState(false);
   const [wordSearched, setWordSearched] = useState('');

   const [navList, setNavList] = useState(nav)

   const handleMenu = () => {
      setMenu(!menu)
   }
   const handleChange = (e) => {
      setWordSearched(e.target.value);
      dispatch(getSearchItem(e.target.value))
   }

   const logout = () => {
      dispatch({ type: actionType.LOGOUT });
      navigate('/auth')

      setUser(null)
      Cookies.remove('auth_token')
      Cookies.remove('auth_email')
   }
   
   useEffect(() => {
      console.log(token);
      setNavList(nav);
      if(token) {
         const decodedToken = decode(token);
         console.log('Token will expire in: ' + new Date(decodedToken.exp * 1000));

         if(new Date(decodedToken.exp * 1000) < new Date().getTime()) {
            logout();
         }
      }
      
      if(location.pathname === '/') {
         dispatch(getPosts());
      }
      if(location.pathname === '/edit') {
         dispatch(getPostsByAuthor());
      }
      
   },[dispatch, user?.token, location.pathname] );

   return (
      <div className='navbar'>
         <div className='nav-container'>
            <div className='nav-left'>
               <h1 className='brand'
                  component={Link}
                  to="/">
                  <Link to="/">{brand} </Link>
               </h1>
               <div id="searchBar">
                  <form method="get" action="">
                        <input className='search' type="text" placeholder='Search Title' value={wordSearched} onChange={handleChange}/>
                  </form>
               </div>
            </div>
            
            <ul className={menu ? 'nav-list active' : 'nav-list'}>
               {navList.map(list => (
                  <Link className='link' to={list.link} key={list.name} onClick={handleMenu}>
                     <li to={list.link}>{list.name} </li>
                  </Link>
                  
               ))}
               {token ? <Dropdown className="link" handleMenu={handleMenu} loginEmail={loginEmail} logout={logout}/> : ''}
               
               { token ? ''  : <Link className='link' to="/auth"> <li>Login</li> </Link> }
               
            </ul>
            
            
            <div className='menubar' onClick={handleMenu}>
               <div className={menu ? 'line lineOne active' : 'line lineOne'} ></div>
               <div className={menu ? 'line lineTwo hide' : 'line lineOne'}></div>
               <div className={menu ? 'line lineThree active' : 'line lineOne'}></div>
            </div>
         </div>
      </div>
   )
}

export default Navbar
