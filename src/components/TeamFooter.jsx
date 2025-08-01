import React from 'react'

export const TeamFooter = () => {
    const teamMembers = [
  { name: "Alen Jacob", top: "39%", left: "39%" },
  { name: "Abhishek Sathyan", top: "35%", left: "48%" },
  { name: "Sham S K", top: "38%", left: "57%" },
  { name: "Elizebath Thomas", top: "50%", left: "5%" },
  { name: "Hajira Mohammed", top: "39%", left: "17%" },
  { name: "Nithya M", top: "37%", left: "32%" },
  { name: "Shankar Krishnan", top: "38%", left: "71%" },
  { name: "Haridas", top: "44%", left: "78%" },
  { name: "Rimshad", top: "53%", left: "87%" },
];
  return (
    <div className="max-w-6xl mx-auto text-center mb-16 pt-25">
        <div className="relative w-full max-w-4xl mx-auto">
      {/* Team Image */}
      <img
        src="assets/team.jpeg"
        alt="Our Team"
        className="w-full h-auto rounded-lg"
      />

      {/* Hotspots */}
      {teamMembers.map((member, index) => (
  <div
    key={index}
    className="absolute group"
    style={{ top: member.top, left: member.left }}
  >
    {/* Circular hotspot */}
    <div className="w-13 h-15  rounded-full opacity-50 group-hover:opacity-100 transition-all duration-200" />

    {/* Connecting Line */}
    <div className="absolute left-1/2 top-[-48px] w-px h-10 bg-white transform -translate-x-1/2 group-hover:opacity-100 opacity-0 transition duration-300" />

    {/* Name Tooltip */}
    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 group-hover:scale-100 scale-0 transition duration-300 min-w-[150px]">
      <div className="bg-black text-white text-md px-3 py-2 shadow-lg transform skew-x-12">
        <div className="transform -skew-x-12">{member.name}</div>
      </div>
    </div>
  </div>
))}

    </div>
          <p className="text-xl text-gray-300 font-light pt-20">Ready to work with our exceptional team?</p>
            <a
            href="/careers" 
            className="inline-block border hover:border-white rounded-full p-3 px-5 my-10 text-lg font-medium bg-[#ff0000] border-[#ff0000] hover:bg-black hover:scale-105 text-white transition"
          >
            Get in Touch
          </a>
        </div> 
  )
}
