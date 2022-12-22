import React, {useState} from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { createPost, updatePost } from '../../actions/posts';

import './StoryForm.css';

const StoryForm = () => {
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        author: '',
        title: '',
        story: '',
        tags: '',
        selectedFile: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createPost({
        }))
    }
  return (
    <div>
        <div className='story-form-container'>
            <h1>Add Story Form</h1>
            <form className='story-form' action="" onSubmit={handleSubmit}>
                <label htmlFor="">Author</label>
                <input type="text" />
                <label htmlFor="">Title</label>
                <input type="text" />
                <label htmlFor="">Story Body</label>
                <textarea name="" id="" cols="30" rows="10"></textarea>
                <label htmlFor="">Image</label>
                <input type="file" id="img" name="img" accept="image/*"/>
                <button type='submit'>Submit</button>
            </form>
        </div>


    </div>
  )
}

export default StoryForm