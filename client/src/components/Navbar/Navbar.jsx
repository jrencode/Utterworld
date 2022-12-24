import React, { useState } from 'react'

import { Link, useNavigate, useLocation } from 'react-router-dom'

import './Navbar.css'

const Navbar = () => {

   const brand = 'UTTERWORLD'
   const [menu, setMenu] = useState(false);

   const handleMenu = () => {
      setMenu(!menu)
   }

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
                        <input className='search' type="text" placeholder='Search' />
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
