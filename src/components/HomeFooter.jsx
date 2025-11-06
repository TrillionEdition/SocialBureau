import React from "react";
import { useNavigate } from "react-router-dom";

const HomeFooter = () => {
  const navigate=useNavigate();
  return (
    <div className="w-full">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-5 md:px-12 lg:px-50 gap-4 bg-transparent">
        <div className="flex items-center space-x-2">
          <img
            src="/assets/trillionedition.webp"
            alt="TrillionEdition"
            className="h-14 md:h-20 cursor-pointer"
            onClick={() =>
              window.open("https://trillionedition.com", "_blank")
            }
          />
          <span className="text-base md:text-lg text-white">
            A TrillionEdition Venture
          </span>
        </div>
        <p className="text-base md:text-lg text-white text-center md:text-right">
          The consultancy trusted by leading edge businesses globally.
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-black py-20 md:py-10 rounded-lg px-10 md:px-12 lg:px-30 gap-4 mt-4">
        <div>
        <h2 className="text-xl md:text-2xl text-white text-center md:text-left">
          Let’s Build the Future of Marketing Together
        </h2>
        <p className="text-white pt-3">Join hundreds of forward-thinking businesses using API-driven marketing to automate their growth.</p>
        </div>
        <button name="book" 
        // onClick={() => {
        //           window.open(
        //             "https://wa.me/918921840486?text=Hello, I would like to learn more.",
        //             "_blank"
        //           );
        //         }} 
        onClick={()=>(navigate('/contact'))}
                className="bg-[#ff0000] text-white px-4 py-2 lg:m-20 rounded-md hover:bg-red-600 transition flex items-center gap-2 mt-1 md:mt-0">
          <img src="/assets/phone.webp" alt="phone" className="h-5 md:h-6" />
          <span className="text-sm md:text-base font-medium">
             Contact Us
          </span>
        </button>
      </div>
    </div>
  );
};

export default HomeFooter;