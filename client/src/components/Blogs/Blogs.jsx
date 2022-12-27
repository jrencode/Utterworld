import React, { useState, useEffect, useRef} from 'react'
import {FaTrash, FaThumbsUp, FaCommentAlt, FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';

import {Link } from 'react-router-dom'

import './Blogs.css'

const Blogs = ({ blogsList, handleDelete }) => {
    

    const [isReadMore, setIsReadMore] = useState(false);
    const [height, setHeight] = useState(null);
    const [slicedText, setSlicedText] = useState(480);
    const elementRef = useRef(null);

    const posts = useSelector((state) => state.posts)
    const searchTerm = useSelector((state) => state.searchTerm)
    
    console.log(searchTerm);
    console.log(posts.filter(post => post.title.trim().match(searchTerm)));
    
    let filteredPosts = posts;
    if(searchTerm.length !== 0) {
        //filteredPosts = posts.filter(post => post.title.normalize().trim().toLowerCase().indexOf(searchTerm.normalize().trim().toLowerCase()) !== -1)
        //filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        
        const pattern = new RegExp(searchTerm, 'gi')
        filteredPosts = posts.filter(post => post.title.trim().match(pattern))

        //filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    } 
    
    const detectHeight = () => {
        const newHeight = document.querySelector('.blog-details-body').clientHeight
        setHeight(newHeight);
        console.log(newHeight);

        if(newHeight > height) {
            setSlicedText(slicedText - 142 )
        } else {
            setSlicedText(slicedText + 142);
        }
    }
    useEffect(() => {
        if (posts.length !== 0) {
            window.addEventListener('resize', detectHeight)  
        
            return() => {
                window.removeEventListener('resize', detectHeight)
            }
        }   
    }, [height, posts, filteredPosts, searchTerm]); //empty dependency array so it only runs once at render

    const handleLike = () => {

    }
    const handleToggleMessage = () => {

    }


  return (
    <div className='blogs'>
        <div className="blogs-container">
                {filteredPosts.map((blog) => (
                    <article className="blog-card" key={blog._id}>
                        <div className="blog-img">
                            <img src={blog.selectedFile} alt="" />
                            <div className="blog-img-overlay">
                                <p className='MessageButton' onClick={() => handleToggleMessage(blog.id)}><FaCommentAlt/></p>
                                <p className='deleteButton' onClick={() => handleLike(blog.id)}><FaThumbsUp/></p>
                                <p className='deleteButton' onClick={() => handleLike(blog.id)}><FaHeart/></p>
                                <p className='LikeButton' onClick={() => handleDelete(blog.id)}><FaTrash/></p>
                            </div>
                        </div>
                        <div className="blog-details">
                            {blog.title.length > 70  && blog.title.slice(0, 60)}
                            <div>
                                <small className='blog-details-date'>{blog.createdAt.slice(0, 10)} </small>
                                <h5 className='blog-details-author'>Author: {blog.author} </h5>
                                <h4 className='blog-details-title'>{blog.title} | Length - {blog.story.length} | Height {height} </h4>
                                <p className='blog-details-body' ref={elementRef}>
                                    
                                    {blog.story.slice(0, 380)}
                                    {(blog.story.length > slicedText) && <Link className='more-button' to={`/blogs/${blog._id}`}>   more...</Link>}
                                </p>
                            </div> 
                        </div>
                    </article>
                ))}
        </div>
    </div>
  )
}

export default Blogs