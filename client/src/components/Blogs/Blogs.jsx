import React, { useState, useEffect, useRef} from 'react'
import {FaTrash, FaThumbsUp, FaCommentAlt, FaHeart, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';

import {Link } from 'react-router-dom'

import { useLocation } from 'react-router-dom';
import { getEditItem } from '../../actions/editItem';
import { deletePost } from '../../actions/posts';

import './Blogs.css'

const Blogs = () => {
    let location = useLocation();
    const dispatch = useDispatch();

    //const [isReadMore, setIsReadMore] = useState(false);
    const [height, setHeight] = useState(null);
    const [slicedText, setSlicedText] = useState(480);
    const elementRef = useRef(null);

    // DATA FROM STORE
    const posts = useSelector((state) => state.posts)
    const searchTerm = useSelector((state) => state.searchTerm)
    const filters = useSelector((state) => state.filters)
    
    let filteredPosts = posts;

    console.log(location.pathname);
  
    

    
    if(searchTerm.length > 0 || Object.keys(filters).length > 0) {
        //filteredPosts = posts.filter(post => post.title.normalize().trim().toLowerCase().indexOf(searchTerm.normalize().trim().toLowerCase()) !== -1)
        //filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        
        console.log( (typeof selectedYear), filters.selectedYear, filters.selectedMonth);
        
        const pattern = new RegExp(searchTerm, 'gi')
        filteredPosts = posts.filter(post => {
            if(location.pathname === '/') { // Search filter only in Home Component
                if(searchTerm.length > 0) {
                    return post.title.trim().match(pattern)
                } else {
                    return filteredPosts;
                }
                
            } else {
                return post.title.trim().match(pattern) &&
                    post.createdAt.slice(5, 7) === filters.selectedMonth &&
                    post.createdAt.slice(0, 4) === filters.selectedYear
            }
            
        });
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
        console.log('udpated')
        if (posts.length !== 0) {
            window.addEventListener('resize', detectHeight)  
        
            return() => {
                window.removeEventListener('resize', detectHeight)
            }
        }   
    }, [height, posts, searchTerm, detectHeight]); //empty dependency array so it only runs once at render

    const handleLike = () => {

    }
    const handleToggleMessage = () => {

    }
    const handleEditStory = (blogId) => {
        dispatch(getEditItem(blogId))
    }
    const handleDelete = (blogId) => {
        console.log(blogId);
        dispatch(deletePost(blogId))
    }

  return (
    <div className='blogs'>
        <div className="blogs-container">
                {filteredPosts.length > 0 ? filteredPosts.map((blog) => (
                    <article className="blog-card" key={blog._id}>
                        <div className="blog-img">
                            <img src={blog.selectedFile} alt="" />
                            <div className="blog-img-overlay">
                                <p className='MessageButton' onClick={() => handleToggleMessage(blog.id)}><FaCommentAlt/></p>
                                <p className='LikeButton' onClick={() => handleLike(blog.id)}><FaThumbsUp/></p>
                                <p className='deleteButton' onClick={() => handleDelete(blog._id)}><FaTrash/></p>
                                
                                <p className='editButton' onClick={() => handleEditStory(blog._id)}> 
                                    <Link to={`/StoryForm`}>
                                        <FaEdit/>
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="blog-details">
                            {/* {blog.title.length > 70  && blog.title.slice(0, 60)} */}
                            <div>
                                <div>{blog.createdAt.toLocaleString('en-US', {day: '2-digit'})} </div>
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
                )) : <article className='blog-card'>Nothing to Display with this current Search or filter</article>}
        </div>
    </div>
  )
}

export default Blogs