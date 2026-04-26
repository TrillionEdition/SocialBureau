import React from 'react'

export const WorksHeader = () => {
  return (
    <div
    className="flex flex-col justify-center items-center text-center pt-15 md:pt-0 md:h-[40vh] bg-cover bg-center bg-no-repeat px-4 md:pb-0 pb-20 w-[100vw]"
    >
    <h2
        className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-white"
        style={{ fontFamily: "Playfair Display, serif" }}
    >
        Our Works
    </h2>
    <p className="text-xl text-gray-300 font-light max-w-2xl">
        A Glimpse into What We Deliver
    </p>
    </div>
  )
}

