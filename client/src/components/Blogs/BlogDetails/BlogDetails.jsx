import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './BlogDetails.css'

import {useParams } from 'react-router-dom'
import { getPosts } from '../../../actions/posts'

const BlogDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [blog, setBlog] = useState([])
    const posts = useSelector((state) => state.posts)
    console.log(posts);
    

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
        dispatch(getPosts);
        const post = posts.find(post => post._id === id)
        setBlog(post);
          
      }, [])
  return (
    <div className='blog-details'>
        <div className="blog-details-container">
            <small>
                By Author: {blog._id}
            </small>
            <img src={blog.selectedFile} alt="" className='imgHero'/>
            <h5>Date: {blog.createdAt} </h5>
            <h2 className='blog-title'>{blog.title} </h2>
            <p>{blog.story} </p>
        </div>
    </div>
  )
}

export default BlogDetails