import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

import './Navbar.css'

const Navbar = () => {

   const [menu, setMenu] = useState(false);

   const handleMenu = () => {
      setMenu(!menu)
   }

   return (
      <div className='navbar'>
         <div className='nav-container'>
            <h1 className='brand'>UTTER</h1>
            <ul className={menu ? 'nav-list active' : 'nav-list'}>
               <li className='p-4'>Home</li>
               <li className='p-4'>About</li>
               <li className='p-4'>Contact</li>
               <li className='p-4'>Notification</li>
               <li className='p-4'>Updates</li>
               <li className='p-4'>Login</li>
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
