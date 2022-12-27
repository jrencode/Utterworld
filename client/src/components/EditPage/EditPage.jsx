import React from 'react'
import Blogs from '../Blogs/Blogs';
import EditPageFilter from '../EditPageFilter/EditPageFilter'

import './EditPage.css';

const EditPage = () => {
  
  return (
    <div className='EditPage-container'>
        <EditPageFilter/>
        <Blogs/>
    </div>
  )
}

export default EditPage