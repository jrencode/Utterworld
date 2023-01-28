import React from 'react'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import BlogDetails from './components/Blogs/BlogDetails/BlogDetails';

import {BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import AddStoryForm from './components/AddStoryForm/StoryForm';
import EditPage from './components/EditPage/EditPage';


const App = () => {
   return (
      
         <div className='full-width'>
            <HashRouter>
            <Navbar />
               <div className='content'>
                  <>
                     <Route path='/' exact element={<Home />} />
                     <Route path='/auth' exact element={<Auth />} />
                     <Route path='/edit' exact element={<EditPage />} />
                     <Route path='/StoryForm' exact element={<AddStoryForm />} />
                     <Route path='/blogs/:id' exact element={<BlogDetails />} />
                  </>
               </div>
            </HashRouter>
         </div>
   )
}

export default App
