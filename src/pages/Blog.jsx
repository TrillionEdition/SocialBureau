import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogHeader from '../components/BlogHeader'
import BlogPosts from '../components/BlogPosts'
import Seo from '../components/Seo'
import { BlogFooter } from '../components/BlogFooter'

export const Blog = () => {
  return (
    <div className='bg-black'>
      <Seo
                    title="SocialBureau Blog | Marketing Intelligence Journal"
                    description="Stay updated with the latest marketing insights, trends, and strategies from SocialBureau. Your go-to source for digital marketing knowledge."
                    keywords="marketing insights blog, digital marketing articles, meta ads updates 2025, google marketing tools blog, ai marketing news, freelancer marketing guide, agency performance case studies, socialbureau insights, marketing research india, content marketing tips"
                    image="/assets/socialbureau.png"
                    url="https://www.socialbureau.in/blog"
                  />
        <Navbar/>
        <BlogHeader/>
        <BlogPosts/>
        <BlogFooter/>
        <Footer/>
    </div>
  )
}
