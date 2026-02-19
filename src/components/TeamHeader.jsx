import React from 'react'

export const TeamHeader = () => {
  return (
    <div
      className="h-[80vh] flex border-b-1 border-[#ff0000] flex-col justify-center items-center text-center bg-cover bg-center bg-no-repeat px-10 pt-15 md:pb-10 pb-10 w-[100vw]"

    >
      <h2
        className="h-[80vh] text-white text-7xl flex border-b-1 border-[#ff0000] flex-col justify-center items-center text-center bg-cover bg-center bg-no-repeat pt-5 md:pb-10 pb-10 w-full"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        The Team Behind <a style={{ fontFamily: "MyFont, sans-serif" }} href='https://socialbureau.in'>
          Social<span className="text-[#ff0000]">B</span>ureau
        </a><br />
      </h2>
      <h4 className="text-2xl md:text-3xl mb-6 text-red-700">Where Innovation Meets Execution</h4>
      <p className="text-xl text-gray-300 font-light max-w-6xl text-justify md:text-center">
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
