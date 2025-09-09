import React from 'react'

export const TeamHeader = () => {
  return (
    <div
  className="flex border-b-1 border-[#ff0000] flex-col justify-center items-center text-center bg-cover bg-center bg-no-repeat px-4 pt-15 md:pb-10 pb-10 w-[100vw]"
  
>
  <h2
    className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-white"
    style={{ fontFamily: "Playfair Display, serif" }}
  >
    Meet Our Team
  </h2>
  <p className="text-xl text-gray-300 font-light max-w-2xl">
    The dedicated professionals behind our success, committed to excellence and innovation in everything we do.
  </p>
</div>

  )
}
