import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPosts } from '../../actions/posts'
import { getWords } from '../../actions/searchItem'

import './Navbar.css'

const Navbar = () => {
   const dispatch = useDispatch();

   const brand = 'UTTERWORLD'
   const [menu, setMenu] = useState(false);
   const [wordSearched, setWordSearched] = useState('');

   const handleMenu = () => {
      setMenu(!menu)
   }
   const handleChange = (e) => {
      setWordSearched(e.target.value);
      console.log(e.target.value);
      dispatch(getWords(e.target.value))
   }
   useEffect(() => {
      dispatch(getPosts());
   },[dispatch] );

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
               <li className=''>
                  <Link className='link' to="/">Home</Link>
               </li>
               <li className=''>About</li>
               <li className=''>Contact</li>
               <li className=''>
                  <Link className='link' to="/AddStory">AddStory</Link>
               </li>
               <li className=''>
                  <Link className='link' to="/Edit">Edit</Link>
               </li>
               <li className=''>
                  <Link className='link' to="/auth">Login</Link>
               </li> 
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
