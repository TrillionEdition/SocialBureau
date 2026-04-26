import React from 'react'

export const TeamHeader = () => {
  return (
    <div
      className="min-h-[55vh] flex border-b-1 border-[#ff0000] flex-col justify-center items-center text-center bg-cover bg-center bg-no-repeat px-4 py-10 md:px-10 md:py-20 w-full"
    >
      <h2
        className="text-white text-4xl md:text-7xl font-serif leading-tight max-w-3xl mx-auto"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        The Team Behind <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
          Social<span className="text-[#ff0000]">B</span>ureau
        </a>
      </h2>
      <h4 className="text-2xl md:text-3xl mb-6 text-red-700">Where Innovation Meets Execution</h4>
      <p className="text-lg md:text-xl text-gray-300 font-light max-w-3xl text-center mx-auto px-2">
        At <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
          Social<span className="text-[#ff0000]">B</span>ureau
        </a>, every project is powered by people who think beyond conventional marketing.

        Our team blends technical expertise, creative storytelling, and strategic intelligence. The perfect mix that fuels <a
          href="https://trillionedition.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold cursor-pointer"
        >
          TrillionEdition LLP
        </a>’s vision to build the world’s first API-driven marketing ecosystem.
      </p>
    </div>

  )
}

