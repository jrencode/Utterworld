import React, {useState, useEffect, } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { createPost, updatePost } from '../../actions/posts';
import Cookies from 'js-cookie';

import FileBase from 'react-file-base64';
import ReactQuill, { Quill } from "react-quill"

import "./StoryForm.css"
import "react-quill/dist/quill.snow.css"

const StoryForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  let editedId = useSelector((state) => state.editItemId)
  const [editId, setEditId] = useState(editedId)
  const stories = useSelector((state) => state.posts)
  const userEmail = Cookies.get("auth_email")

  console.log(editedId)
  console.log(stories)
  let initialFormData = {
    author: userEmail ? `${userEmail}` : "",
    title: "",
    story: "",
    tags: "",
    selectedFile: "",
  }
  const [postData, setPostData] = useState(initialFormData)

  if (editId.length > 0) {
    console.log("editing")
    const editStoryData = stories.filter((story) => story._id === editedId)
    if (userEmail) {
      initialFormData = { ...editStoryData[0], author: userEmail }
    }
    initialFormData = editStoryData[0]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(postData)
    if (editId.length > 0) {
      console.log(postData)
      dispatch(updatePost(editId, { ...postData, author: userEmail }))
      navigate("/edit")
      clear()
    } else {
      dispatch(createPost(postData))
      navigate("/edit")
    }
  }

  const clear = () => {
    console.log("cleared")
    setPostData({
      author: userEmail ? `${userEmail}` : "",
      title: "",
      story: "",
      tags: "",
      selectedFile: "",
    })
    setEditId("")
  }
  useEffect(() => {
    setEditId(editedId)
    setPostData(initialFormData)
  }, [setPostData, setEditId, editedId])
  return (
    <div>
      <div className="story-form-container">
        <h1>{editId.length > 0 ? "Edit Story Form" : "Add Story Form"}</h1>
        <form className="story-form" action="" onSubmit={handleSubmit}>
          <label htmlFor="">Author</label>
          <input
            type="text"
            value={postData.author}
            onChange={(e) =>
              setPostData({ ...postData, author: e.target.value })
            }
          />
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <label htmlFor="">Tags</label>
          <input
            type="text"
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
          />
          <label htmlFor="">Story Body</label>
          <article className="post-body">
            <div className="quillEditor-container">
              <ReactQuill
                className="quillEditor"
                theme="snow"
                value={postData.story}
                onChange={(value) => setPostData({ ...postData, story: value })}
              />
            </div>
          </article>
          <label htmlFor="">Image</label>
          <FileBase
            className="filebase"
            type="file"
            id="img"
            name="img"
            accept="image/*"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
          <div className="story-form-buttons">
            <button className="submit-button" type="submit">
              Submit
            </button>
            <div className="clear-button" onClick={() => clear()}>
              Clear
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StoryForm