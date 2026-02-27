import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUpcomingEventsAPI, addToGoogleCalendar } from '../..eventServices';
import { Link } from 'react-router-dom';

const UpcomingEvents = ({ limit = 4 }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['upcomingEvents', limit],
    queryFn: () => getUpcomingEventsAPI(limit),
  });

  if (isLoading) return null;
  if (isError) return null;

  // API may return either an array or an object like { success: true, data: [...] }
  let events = [];
  if (Array.isArray(data)) events = data;
  else if (Array.isArray(data?.data)) events = data.data;
  else if (Array.isArray(data?.events)) events = data.events;
  else events = [];

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-white">Upcoming Events</h3>
        <Link to="/events" className="text-sm text-red-500 hover:underline">See all</Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {events.length === 0 && (
          <div className="text-gray-400">No upcoming events</div>
        )}

        {events?.map((ev) => (
  <div
    key={ev._id}
    className="w-full md:min-w-[220px] rounded-xl overflow-hidden border border-gray-800 
      bg-white/5 backdrop-blur-sm cursor-pointer transition-all duration-300
      hover:scale-[1.02] hover:border-red-500/60 hover:shadow-lg hover:shadow-red-500/20
      active:scale-[0.98] md:w-auto"
  >
    <Link to={`/events/${ev._id}`} className="block">
      
      {/* IMAGE */}
      <div className="w-full h-40 bg-white/5 md:h-32">
        {ev.image ? (
          <img
            src={ev.image}
            alt={ev.title}
            className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No image
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h4 className="text-base font-semibold text-white line-clamp-2">
          {ev.title}
        </h4>

        {/* DATE & TIME WITH ICONS */}
        <div className="flex items-center gap-3 mt-3 text-gray-300 text-sm">

          {/* DATE ICON */}
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2"
                 viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(ev.startDate).toLocaleDateString()}
          </div>

          {/* TIME ICON */}
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2"
                 viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
            {new Date(ev.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    </Link>

    {/* BUTTON */}
    <div className="px-4 pb-4">
      <button
        onClick={() => addToGoogleCalendar(ev)}
        className="text-xs text-white bg-red-600 px-3 py-2 rounded-md w-full
          hover:bg-red-700 active:scale-95 transition-all duration-200"
      >
        Add to Calendar
      </button>
    </div>
  </div>
))}

      </div>
    </section>
  );
};

export default UpcomingEvents;
