import React, {useState} from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { createPost, updatePost } from '../../actions/posts';

import FileBase from 'react-file-base64';

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

        console.log(postData);

        dispatch(createPost(postData));

    }

    const clear = () => {
        setPostData(null)
    }
  return (
    <div>
        <div className='story-form-container'>
            <h1>Add Story Form</h1>
            <form className='story-form' action="" onSubmit={handleSubmit}>
                <label htmlFor="">Author</label>
                <input type="text" value={postData.author} onChange={(e) => setPostData({...postData, author: e.target.value})}/>
                <label htmlFor="">Title</label>
                <input type="text" value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                <label htmlFor="">Tags</label>
                <input type="text" value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value})}/>
                <label htmlFor="">Story Body</label>
                <textarea name="" id="" cols="30" rows="10" value={postData.story} onChange={(e) => setPostData({...postData, story: e.target.value })} />
                <label htmlFor="">Image</label>
                <FileBase type="file" id="img" name="img" accept="image/*" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                <button type='submit'>Submit</button>
            </form>
        </div>


    </div>
  )
}

export default StoryForm