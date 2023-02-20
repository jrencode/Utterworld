import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from "../../../reusable_Functions/dateFormat"
import "./BlogDetails.css"

import { useParams } from "react-router-dom"
import { getPosts } from "../../../actions/posts"
import EditButton from "../../../reusable_Components/EditButton/EditButton"

const containsHtmlTags = (text) => {
  return /<[a-z][\s\S]*>/i.test(text)
}
console.log(containsHtmlTags)
const BlogDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const posts = useSelector((state) => state.posts)

  const [blog, setBlog] = useState(posts.find((post) => post._id === id))

  console.log(posts)

  useEffect(() => {
    // USING JSON-SERVER
    // const abortCont = new AbortController();
    // fetch('http://localhost:8000/blogs/' + id, {signal: AbortController.signal})
    //   .then(res => {
    //     if(!res.ok) {
    //       console.log('could not fetch the data from the resource')
    //     }
    //     return res.json()
    //   })
    //   .then((data) => {
    //     setBlog(data)
    //   })
    //   .catch(err => {
    //     if(err.name === "AbortError") {
    //       console.log('fetch aborted')
    //     }
    //     console.log(err.message)
    //   })
    //   return () => abortCont.abort();
    //USING MONGODB
  })
  return (
    <div className="blog-details">
      <article className="blog-details-container">
        <small className="blog-author">Author: {blog.author}</small>
        <img src={blog.selectedFile} alt="" className="blog-img" />
        <div className="crud-icons">
          <EditButton blogId={blog._id} />
        </div>

        <time className="blog-date">{formatDate(blog.createdAt)} </time>
        <h1 className="blog-title">{blog.title} </h1>
        <div className="blog-story">
          {containsHtmlTags(blog.story) ? (
            <div dangerouslySetInnerHTML={{ __html: blog.story }}></div>
          ) : (
            <div className="blog-story"> {blog.story} </div>
          )}
        </div>
      </article>
    </div>
  )
}

export default BlogDetails