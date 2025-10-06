import React from 'react';

// Sample data
const teamMembers = [
  { name: 'Hajira', title: 'Insights', image: '/assets/hajira.webp' },
  { name: 'Hajira', title: 'Insights', image: '/assets/hajira.webp' },
  { name: 'Hajira', title: 'Insights', image: '/assets/hajira.webp' },
  { name: 'Hajira', title: 'Insights', image: '/assets/hajira.webp' },
  { name: 'Hajira', title: 'Insights', image: '/assets/hajira.webp' },
  { name: 'Hajira', title: 'Insights', image: '/assets/hajira.webp' },
];

// Bold background palette
const colors = [
  '#ef4444', // red-500
  '#f59e0b', // amber-500
  '#10b981', // emerald-500
  '#3b82f6', // blue-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#14b8a6', // teal-500
  '#eab308', // yellow-500
];

const TeamLayout = () => (
  <section >
    <div className="flex flex-col md:flex-row justify-center">
      <div className="flex justify-center items-center gap-1 h-screen w-screen">
        {teamMembers.map((member, idx) => {
          const center = Math.floor(teamMembers.length / 2);
          const distance = Math.abs(idx - center);
          const minHeight = 20; // vh for center
          const step = 10; // growth outward
          const height = `${minHeight + distance * step}vh`;
          const bgColor = colors[idx % colors.length];

          return (
            <div
              key={idx}
              className="rounded-xl shadow-lg flex flex-col items-center 
                         transition-transform duration-300 ease-in-out hover:scale-101"
              style={{ height, width: "200px", backgroundColor: bgColor }}
            >
              <img
                src={member.image}
                alt={member.name} style={{ height, width: "190px"}}
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default TeamLayout;
