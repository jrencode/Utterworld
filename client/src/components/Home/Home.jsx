import React, { useState, useEffect } from 'react'

import Hero from '../Hero/Hero'
import Filter from '../Filter/Filter'
import Blogs from '../Blogs/Blogs'

const Home = () => {

  const [blogsList, setBlogsList] = useState(null);
  const [isPending, setIsPending] = useState(true)


  const handleDelete = (blogId) => {
    const newBlogs = blogsList.filter((blog) => blog.id !== blogId)
    setBlogsList(newBlogs)
  }

  useEffect(() => {
    setIsPending(false);
      
  }, [])

  return (
    <div>
        <Hero/>
        <Filter />
        {isPending && <div>Loading...</div>}
        <Blogs />
    </div>
  )
}

export default Home