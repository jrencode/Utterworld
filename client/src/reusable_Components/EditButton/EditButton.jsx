import React from 'react'
import {FaEdit } from "react-icons/fa";

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEditItem } from '../../actions/editItem';
import './EditButton.modules.css'


const EditButton = ({blogId}) => {
  const reduxDispatch = useDispatch();

  const handleEditStory = (blogId) => {
    reduxDispatch(getEditItem(blogId))
  }

return (
      <i className='editButton' onClick={() => handleEditStory(blogId)}> 
          <Link to={`/StoryForm`}>
            <FaEdit/>
          </Link>
      </i>
  )
}

export default EditButton