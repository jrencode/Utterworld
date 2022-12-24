import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getPosts } from '../../actions/posts'

import Hero from '../Hero/Hero'
import Filter from '../Filter/Filter'
import Blogs from '../Blogs/Blogs'

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const [blogsList, setBlogsList] = useState(null);
  const [isPending, setIsPending] = useState(true)
  /*const [blogsList, setBlogsList] = useState([
    { title: 'My new website', body: 'lorem ipsum', author: 'mario', id: 1},
    { title: 'Welcome party!', body: 'lorem ipsum', author: 'yoshi', id: 2},
    { title: 'Web development tips', body: 'lorem ipsum', author: 'mario', id: 3},
    { title: 'My new website', body: 'lorem ipsum', author: 'mario', id: 4},
    { title: 'Welcome party!', body: 'lorem ipsum', author: 'yoshi', id: 5},
    { title: 'Web development tips', body: 'lorem ipsum', author: 'mario', id: 6},
  ])*/

  const handleDelete = (blogId) => {
    const newBlogs = blogsList.filter((blog) => blog.id !== blogId)
    setBlogsList(newBlogs)
  }

  useEffect(() => {

    dispatch(getPosts());
    setIsPending(false);
      
  }, [blogsList])

  return (
    <div>
        <Hero/>
        <Filter />
        {isPending && <div>Loading...</div>}
        <Blogs handleDelete={handleDelete} />
    </div>
  )
}

export default Home