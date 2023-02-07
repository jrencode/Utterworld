import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPosts } from '../../actions/posts'
import { getSearchItem } from '../../actions/searchItem'

import './Navbar.css'

const Navbar = () => {
   const dispatch = useDispatch();

   const brand = 'UTTERWORLD'
   const [menu, setMenu] = useState(false);
   const [wordSearched, setWordSearched] = useState('');

   const navList = [
      { name: 'Home', link: '/' },
      { name: 'About', link: '/about'},
      { name: 'Contact', link: '/contact'},
      { name: 'Add', link: '/storyForm'},
      { name: 'Edit', link: '/edit'},
      { name: 'Login', link: '/auth'},
   ]
   console.log(navList.name)

   const handleMenu = () => {
      setMenu(!menu)
   }
   const handleChange = (e) => {
      setWordSearched(e.target.value);
      console.log(e.target.value);
      dispatch(getSearchItem(e.target.value))
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
               {navList.map(list => (
                  <Link className='link' to={list.link}>
                     <li>{list.name} </li>
                  </Link>
               ))} 
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
