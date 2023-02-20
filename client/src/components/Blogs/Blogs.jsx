import React, { useState, useEffect, useRef, useCallback} from 'react'
import {FaTrash, FaThumbsUp, FaCommentAlt, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';

import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

import { getEditItem } from "../../actions/editItem"
import { deletePost } from "../../actions/posts"
import DeleteButton from "../../reusable_Components/DeleteButton/DeleteButton"
import EditButton from "../../reusable_Components/EditButton/EditButton"
import OpenCommentButton from "../../reusable_Components/OpenCommentButton/OpenCommentButton"
import { formatDate } from "../../reusable_Functions/dateFormat"
import { getDate } from "../../reusable_Functions/dateFormat"

import "./Blogs.css"

const event = new Date()

// British English uses day-month-year order and 24-hour time without AM/PM
console.log(event.toLocaleString("en-GB", { TimeZone: "Asia/Manila" }))
const format = (text, textEnd) => {
  if (text.length > textEnd) {
    text = text.slice(0, textEnd) + "..."
  }

  const containsTags = containsHtmlTags(text)
  if (containsTags) {
    return <div dangerouslySetInnerHTML={{ __html: text }}></div>
  } else {
    return text
  }
}
const containsHtmlTags = (text) => {
  return /<[a-z][\s\S]*>/i.test(text)
}

const Blogs = () => {
  let location = useLocation()
  const dispatch = useDispatch()

  // DATA FROM STORE
  const posts = useSelector((state) => state.posts)
  const searchTerm = useSelector((state) => state.searchTerm)
  const filters = useSelector((state) => state.filters)
  const isSorted = useSelector((state) => state.isSorted)
  const isShuffle = useSelector((state) => state.shuffleItem)
  const isImagesChecked = useSelector((state) => state.imagesIsChecked)

  //const [isReadMore, setIsReadMore] = useState(false);
  const [height, setHeight] = useState(null)
  const [slicedText, setSlicedText] = useState(480)
  const elementRef = useRef(null)
  const [postsData, setPostsData] = useState(posts)

  const toggleMoreBtn = (body) => {
    return body.length > slicedText
  }

  if (isSorted) {
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
  if (!isSorted) {
    posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  }
  if (isShuffle) {
    posts.sort(() => Math.random() - 0.5)
  }

  const filteredPosts = useCallback(() => {
    let filteredData = posts

    if (searchTerm.length > 0 || Object.keys(filters).length > 0) {
      const pattern = new RegExp(searchTerm, "gi")
      filteredData = posts.filter((post) => {
        if (location.pathname === "/") {
          return searchTerm.length > 0
            ? post.title.trim().match(pattern)
            : posts
        }
        console.log(
          filters.selectedMonth,
          filters.selectedYear,
          filters.selectedDate,
          getDate(post.createdAt).toString()
        )
        console.log(post.title.trim)
        return (
          post.title.trim().match(pattern) &&
          post.createdAt.slice(5, 7) === filters.selectedMonth &&
          post.createdAt.slice(0, 4) === filters.selectedYear &&
          getDate(post.createdAt).toString() === filters.selectedDate
        )
      })
    }
    console.log(filteredData)

    return filteredData
  }, [searchTerm, filters, posts])

  const detectHeight = () => {
    const newHeight = document.querySelector(".blog-details-body").clientHeight
    setHeight(newHeight)

    if (newHeight > height) {
      setSlicedText(slicedText - 142)
    } else {
      setSlicedText(slicedText + 142)
    }
  }
  useEffect(() => {
    setPostsData(filteredPosts)
    if (posts) {
      window.addEventListener("resize", detectHeight)

      return () => {
        window.removeEventListener("resize", detectHeight)
      }
    }
    console.log("updated")
  }, [filteredPosts, posts]) //empty dependency array so it only runs once at render

  const handleLike = () => {}
  const handleToggleMessage = () => {}
  const handleEditStory = (blogId) => {
    dispatch(getEditItem(blogId))
  }
  const handleDelete = (blogId) => {
    console.log(blogId)
    dispatch(deletePost(blogId))
  }

  return (
    <div className="blogs">
      <div className="blogs-container">
        {postsData ? (
          postsData.map((blog) => (
            <article className="blog-card" key={blog._id}>
              <div
                className={isImagesChecked ? "blog-img" : "blog-img-inactive"}
              >
                <img src={blog.selectedFile} alt="" />
              </div>
              <div className="blog-details">
                {/* {blog.title.length > 70  && blog.title.slice(0, 60)} */}
                <div>
                  <small className="blog-details-date">
                    {formatDate(blog.createdAt)}
                  </small>
                  <h5 className="blog-details-author">
                    Author: {blog.author}{" "}
                  </h5>
                  <h4 className="blog-details-title">{blog.title}</h4>
                  <div className="blog-details-body" ref={elementRef}>
                    {format(blog.story, slicedText)}
                    {toggleMoreBtn(blog.story) && (
                      <Link className="more-button" to={`/blogs/${blog._id}`}>
                        {" "}
                        more...
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {location.pathname === "/edit" ? (
                <div className="edit-icons">
                  <div className="top-icons">
                    <DeleteButton className="single-icon" blogId={blog._id} />
                    <EditButton className="single-icon" blogId={blog._id} />
                  </div>
                  <div className="bottom-icons">
                    <OpenCommentButton
                      className="single-icon"
                      blogId={blog._id}
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </article>
          ))
        ) : (
          <article className="blog-card">Loading...</article>
        )}
      </div>
    </div>
  )
}

export default Blogs