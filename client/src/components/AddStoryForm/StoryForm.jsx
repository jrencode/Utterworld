import React, {useState, useEffect, } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { createPost, updatePost } from '../../actions/posts';

import FileBase from 'react-file-base64';

import './StoryForm.css';

const StoryForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let editedId = useSelector(state => state.editItemId)
    const [editId, setEditId] = useState(editedId);
    const stories = useSelector(state => state.posts)

    console.log(editedId);
    console.log(stories);
    let initialData = {
        author: '',
        title: '',
        story: '',
        tags: '',
        selectedFile: '',
    }
    const [postData, setPostData] = useState(initialData);
    console.log(postData);
    console.log(typeof editedId);
    console.log(editedId.length);
    console.log(editId);
    
    if(editId.length > 0) {
        console.log('editing');
        const editStoryData = stories.filter(story => story._id === editedId)
        console.log(editStoryData[0])
        console.log(initialData);
        initialData = editStoryData[0]
        console.log(initialData);
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(postData);
        if(editedId.length > 0) {
            console.log(postData);
            dispatch(updatePost(editedId, postData));
            editedId = '';
            clear();
            navigate('/')
        } else {
            dispatch(createPost(postData));
        }
    }

    const clear = () => {
        setPostData({
            author: '',
            title: '',
            story: '',
            tags: '',
            selectedFile: '',
        })
        setEditId(0);
        
    }
    useEffect(() => {
        setEditId(editedId);
        setPostData(initialData);
    },[setPostData, setEditId])
    return (
    <div>
        <div className='story-form-container'>
            <h1>{editId.length > 0 ? 'Edit Story Form' : 'Add Story Form'}</h1>
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
                <div className='story-form-buttons'>
                    <button className='submit-button' type='submit'>Submit</button>
                    <button className='clear-button' onClick={() => clear()}>Clear</button>
                </div>
                
            </form>
        </div>


    </div>
  )
}

export default StoryForm