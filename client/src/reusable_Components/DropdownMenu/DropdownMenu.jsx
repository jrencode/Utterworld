import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './DropdownMenu.modules.css'

const Dropdown = ({handleMenu, loginEmail, logout}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
      setIsDropdownOpen(false);
    };

    const liElement = document.querySelector('.dropdown');
    liElement.addEventListener('mouseenter', handleMouseEnter);
    liElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      liElement.removeEventListener('mouseenter', handleMouseEnter);
      liElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
        <li className="dropdown"> <span className="profileImage"></span> <span>{loginEmail}</span> <span className='arrow-down'>&#9660;</span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <Link to="/profile" onClick={() => handleMenu()}>
                  <li className='dropdown-list'>Profile</li>
                </Link>
                <Link to='/StoryForm' onClick={() => handleMenu()}>
                  <li className='dropdown-list'>ADD +</li>
                </Link>
                <Link  to="/edit" onClick={() => handleMenu()}>
                  <li className='dropdown-list'>Edit</li>
                </Link>
                <Link to="/settings"onClick={() => handleMenu()}>
                  <li className='dropdown-list'>Settings</li>
                </Link>
                <Link onClick={() => handleMenu()}>
                  <li className='dropdown-list' onClick={() => logout()}>Logout</li>
                </Link>
                
              </ul>
            </div>
          )}
        </li>
  );
}

export default Dropdown;