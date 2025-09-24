import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogHeader from '../components/BlogHeader'
import BlogPosts from '../components/BlogPosts'

export const Blog = () => {
  return (
    <div className='bg-black'>
        <Navbar/>
        <BlogHeader/>
        <BlogPosts/>
        <Footer/>
    </div>
  )
}
