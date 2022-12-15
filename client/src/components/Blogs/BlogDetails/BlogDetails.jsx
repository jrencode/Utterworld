import React, {useState, useEffect} from 'react'

import './BlogDetails.css'

import {useParams } from 'react-router-dom'

const BlogDetails = () => {
    const { id } = useParams();

    const [blog, setBlog] = useState([])

    useEffect(() => {
        const abortCont = new AbortController();

        
    
        fetch('http://localhost:8000/blogs/' + id, {signal: AbortController.signal})
          .then(res => {
            if(!res.ok) {
              console.log('could not fetch the data from the resource')
            }
            return res.json()
          })
          .then((data) => {
            setBlog(data)
          })
          .catch(err => {
            if(err.name === "AbortError") {
              console.log('fetch aborted')
            }
            console.log(err.message)
          })
        
          return () => abortCont.abort();
    
          
      }, [])
  return (
    <div className='blog-details'>
        <div className="blog-details-container">
            <small>
                By Author: {id}
            </small>
            <img src="/images/greenNature.jpg" alt="" className='imgHero'/>
            <h5>December 15 2022</h5>
            <h2 className='blog-title'>{blog.title} </h2>
            <p>{blog.body} </p>
        </div>
    </div>
  )
}

export default BlogDetails