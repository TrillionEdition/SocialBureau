import React from "react";

const HomeFooter = () => {
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
        <h2 className="text-xl md:text-2xl text-white text-center md:text-left">
          Ready to Engineer Growth That Sticks?
        </h2>
        <button onClick={() => {
                  window.open(
                    "https://wa.me/918921840486?text=Hello, I would like to learn more.",
                    "_blank"
                  );
                }} className="bg-[#ff0000] text-white px-4 py-2 lg:m-20 rounded-md hover:bg-[#ff0000] transition flex items-center gap-2 mt-1 md:mt-0">
          <img src="/assets/phone.webp" alt="phone" className="h-5 md:h-6" />
          <span className="text-sm md:text-base font-medium">
            Book a Strategy Call
          </span>
        </button>
      </div>
    </div>
  );
};

export default HomeFooter;