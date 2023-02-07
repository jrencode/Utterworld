import React, { useState, useEffect, useRef, useCallback} from 'react'
import {FaTrash, FaThumbsUp, FaCommentAlt, FaHeart, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector, connect } from 'react-redux';

import {Link } from 'react-router-dom'

import { useLocation } from 'react-router-dom';
import { getEditItem } from '../../actions/editItem';
import { deletePost } from '../../actions/posts';

import './Blogs.css'


const format = (text, textEnd) => {
    return text.slice(0, textEnd);
}


const Blogs = () => {
    let location = useLocation();
    const dispatch = useDispatch();

    // DATA FROM STORE
    const posts = useSelector((state) => state.posts)
    const searchTerm = useSelector((state) => state.searchTerm)
    const filters = useSelector((state) => state.filters)

    //const [isReadMore, setIsReadMore] = useState(false);
    const [height, setHeight] = useState(null);
    const [slicedText, setSlicedText] = useState(480);
    const [moreButton, setMoreButton] = useState(false);
    const elementRef = useRef(null);
    const [postsData, setPostsData] = useState(posts);

    console.log(location.pathname);
    console.log(postsData);
    const toggleMoreBtn = (body) => {
        return body.length > slicedText
    }

    const filteredPosts = useCallback(() => {
        if (searchTerm.length > 0 || Object.keys(filters).length > 0) {
          const pattern = new RegExp(searchTerm, 'gi');
          return posts.filter((post) => {
            if (location.pathname === '/') {
              return searchTerm.length > 0 ? post.title.trim().match(pattern) : posts;
            }
            return post.title.trim().match(pattern) &&
              post.createdAt.slice(5, 7) === filters.selectedMonth &&
              post.createdAt.slice(0, 4) === filters.selectedYear;
          });
        }
        return posts;
    }, [searchTerm, filters, posts, location.pathname]);
    
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
        setPostsData(filteredPosts);
        console.log(filteredPosts);
        console.log(postsData)
        if (posts.length !== 0) {
            window.addEventListener('resize', detectHeight)  
        
            return() => {
                window.removeEventListener('resize', detectHeight)
            }
        }   
    }, [filteredPosts]); //empty dependency array so it only runs once at render

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
                {postsData ? postsData.map((blog) => (
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
                                <small className='blog-details-date'>{format(blog.createdAt, 10)} </small>
                                <h5 className='blog-details-author'>Author: {blog.author} </h5>
                                <h4 className='blog-details-title'>{blog.title} | Length - {blog.story.length} | Height {height} </h4>
                                <p className='blog-details-body' ref={elementRef}>
                                    
                                    {format(blog.story, slicedText)}
                                    {toggleMoreBtn(blog.story) && <Link className='more-button' to={`/blogs/${blog._id}`}>   more...</Link>}
                                </p>
                            </div> 
                        </div>
                    </article>
                )) : <article className='blog-card'>Nothing to Display with this current Search or filter</article>}
        </div>
    </div>
  )
};

export default connect()(Blogs)