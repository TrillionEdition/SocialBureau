import React from 'react'
import Footer from '../components/Footer'
import BlogHeader from '../components/BlogHeader'
import BlogPosts from '../components/BlogPosts'
import Seo from '../components/Seo'
import TreasureHuntDiamond from '../components/TreasureHuntDiamond'
// import { BlogFooter } from '../components/BlogFooter'

export const Blog = () => {
  return (
    <div className='bg-[#FFFFFF]'>
      <Seo
        title="SocialBureau Blog | Marketing Intelligence Journal"
        description="Stay updated with the latest marketing insights, trends, and strategies from SocialBureau. Your go-to source for digital marketing knowledge."
        keywords="marketing insights blog, digital marketing articles, meta ads updates 2025, google marketing tools blog, ai marketing news, freelancer marketing guide, agency performance case studies, socialbureau insights, marketing research india, content marketing tips"
        image="/assets/socialbureau.png"
        url="https://www.socialbureau.in/blog"
        canonicalUrl="https://www.socialbureau.in/blog"
      />
      <BlogHeader />
      <BlogPosts />
      <TreasureHuntDiamond 
        stepRequired={4} 
        clueText="Apps talk to each other using APIs—Application Programming Interfaces. Follow the trail to the service that markets these powerful connections." 
      />
      {/* <BlogFooter/> */}
    </div>
  )
}

