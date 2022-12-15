import React, { useState, useEffect } from 'react'

import Hero from '../Hero/Hero'
import Filter from '../Filter/Filter'
import Blogs from '../Blogs/Blogs'

const Home = () => {

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
    const abortCont = new AbortController();

    fetch('http://localhost:8000/blogs', {signal: AbortController.signal})
      .then(res => {
        if(!res.ok) {
          console.log('could not fetch the data from the resource')
        }
        return res.json()
      })
      .then((data) => {
        setBlogsList(data)
        setIsPending(false)
      })
      .catch(err => {
        if(err.name === "AbortError") {
          console.log('fetch aborted')
        }
        console.log(err.message)
      })
    
      return () => abortCont.abort();

      
  }, [blogsList])

  return (
    <div>
        <Hero/>
        <Filter />
        {isPending && <div>Loading...</div>}
        {blogsList && <Blogs blogsList={blogsList} handleDelete={handleDelete} /> }
    </div>
  )
}

export default Home