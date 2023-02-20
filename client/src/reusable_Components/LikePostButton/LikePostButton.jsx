import React from 'react'
import {FaThumbsUp } from "react-icons/fa";

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../../actions/posts';
import './OpenCommentButton.modules.css'


const OpenCommentButton = ({blogId}) => {
  const reduxDispatch = useDispatch();

  const handleOpenComment = (blogId) => {
    console.log(blogId);
    reduxDispatch(deletePost(blogId))
}

return (
      <i className='like-button' onClick={() => handleOpenComment(blogId)}> 
          <Link to={`/`}>
            <FaThumbsUp/>
          </Link>
      </i>
  )
}

export default OpenCommentButton