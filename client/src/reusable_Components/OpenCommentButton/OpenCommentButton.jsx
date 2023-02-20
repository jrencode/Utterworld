import React from 'react'
import {FaCommentAlt } from "react-icons/fa";

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
      <i className='openComment-button' onClick={() => handleOpenComment(blogId)}> 
          <Link to={`/StoryForm`}>
            <FaCommentAlt/>
          </Link>
      </i>
  )
}

export default OpenCommentButton