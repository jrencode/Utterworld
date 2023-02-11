import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDate, getMonthName, getYear, formatDate } from '../../../reusable_Functions/dateFormat'
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
        <article className="blog-details-container">
            <small>
                Author: {blog.author}
            </small>
            <img src={blog.selectedFile} alt="" className='imgHero'/>
            <time className='blog-date'>{formatDate(blog.createdAt)} </time>
            <h1 className='blog-title'>{blog.title} </h1>
            <p className='blog-story'>{blog.story} </p>
        </article>
    </div>
  )
}

export default BlogDetails