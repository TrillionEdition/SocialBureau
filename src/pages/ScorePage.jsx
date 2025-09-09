import React from 'react'
import Navbar from '../components/Navbar'
import HomeMouse from '../components/HomeMouse'
import InteractiveForm from '../components/BusinessScore'

export const ScorePage = () => {
  return (
    <div className='bg-black'>
        <Navbar/>
        {/* <HomeMouse/> */}
        <InteractiveForm/>
    </div>
  )
}
