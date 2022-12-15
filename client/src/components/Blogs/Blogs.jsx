import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import {FaTrash} from "react-icons/fa";
import {Link } from 'react-router-dom'

import './Blogs.css'

const Blogs = ({blogsList, handleDelete} ) => {

    const [isReadMore, setIsReadMore] = useState(false);
    const [height, setHeight] = useState(null);
    const [slicedText, setSlicedText] = useState(480)
    const elementRef = useRef(null);
    
    const detectHeight = () => {
        const newHeight = document.querySelector('.blog-details-body').clientHeight
        setHeight(newHeight);
        console.log(newHeight);

        if(newHeight > height) {
            setSlicedText(slicedText - 18)
        } else {
            setSlicedText(newHeight);
        }
    }
    useEffect(() => {
        window.addEventListener('resize', detectHeight)

        
        
        return() => {
            window.removeEventListener('resize', detectHeight)
        }
    }, [height]); //empty dependency array so it only runs once at render


  return (
    <div className='blogs'>
        <div className="blogs-container">
                {blogsList.map((blog) => (
                    <article className="blog-card" key={blog.id}>
                        <div className="blog-img">
                            <img src="images/greenNature.jpg" alt="" />
                        </div>
                        <div className="blog-details">
                            <div>
                                <small className='blog-details-date'>Date</small>
                                <h5 className='blog-details-author'>Author: {blog.author} </h5>
                                <h4 className='blog-details-title'>{blog.title} | Length - {blog.body.length} | Height {height} </h4>
                                <p className='blog-details-body' ref={elementRef}>
                                    
                                    {blog.body.slice(0, 480)}
                                    {(blog.body.length > 480) && <Link className='more-button' to={`/blogs/${blog.id}`}>   more...</Link>}
                                </p>
                            </div> 
                            <p className='deleteButton' onClick={() => handleDelete(blog.id)}><FaTrash/></p>

                        </div>
                        
                    </article>
                ))}
                
        </div>
    </div>
  )
}

export default Blogs