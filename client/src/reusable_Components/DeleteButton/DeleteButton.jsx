import React from 'react'
import {FaTrash } from "react-icons/fa";

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../../actions/posts';
import './DeleteButton.modules.css'


const DeleteButton = ({blogId}) => {
  const reduxDispatch = useDispatch();

  const handleDelete = (blogId) => {
    console.log(blogId);
    reduxDispatch(deletePost(blogId))
}

return (
      <i className='delete-button' onClick={() => handleDelete(blogId)}> 
          <Link>
            <FaTrash/>
          </Link>
      </i>
  )
}

export default DeleteButton