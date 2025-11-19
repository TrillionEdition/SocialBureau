import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEventsAPI, addToGoogleCalendar, downloadCalendarFile, registerForEventAPI } from '../../services/eventServices';
import { useQueryClient } from '@tanstack/react-query';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaDownload, FaExternalLinkAlt, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const Events = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registerForm, setRegisterForm] = useState({ name: '', email: '' });
  const [registerStatus, setRegisterStatus] = useState({ type: '', message: '' });
  const [isRegistering, setIsRegistering] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['events', filter, selectedCategory],
    queryFn: () => {
      const params = {};
      if (filter === 'upcoming') params.upcoming = 'true';
      if (filter === 'past') params.past = 'true';
      if (selectedCategory !== 'all') params.category = selectedCategory;
      return getEventsAPI(params);
    },
    staleTime: 1000 * 60 * 5,
  });

  const events = data?.data || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAddToCalendar = (event, type) => {
    if (type === 'google') {
      addToGoogleCalendar(event);
    } else if (type === 'download') {
      downloadCalendarFile(event._id);
    }
  };

  const categories = ['all', 'workshop', 'webinar', 'conference', 'meetup', 'training', 'other'];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950 to-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Events</h1>
                <p className="text-lg text-gray-300">
                  Join us for workshops, webinars, and networking events
                </p>
              </div>
              <button
                onClick={() => navigate('/events/add')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 shadow-lg"
              >
                <FaPlus />
                Add Event
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Time Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === 'all'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === 'upcoming'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === 'past'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Past Events
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-red-600"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
            </div>
          )}

          {/* Events Grid */}
          {!isLoading && events.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">No events found</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Event Image */}
                {event.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Event Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-red-600/20 text-red-400 text-xs font-semibold rounded-full">
                      {event.category}
                    </span>
                    {new Date(event.startDate) > new Date() && (
                      <span className="px-3 py-1 bg-green-600/20 text-green-400 text-xs font-semibold rounded-full">
                        Upcoming
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{event.title}</h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-sm text-gray-300">
                      <FaCalendarAlt className="mt-1 text-red-500" />
                      <div>
                        <div>{formatDate(event.startDate)}</div>
                        <div className="text-xs text-gray-500">
                          {formatTime(event.startDate)} - {formatTime(event.endDate)}
                        </div>
                      </div>
                    </div>

                    {(event.location || event.venue) && (
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span>{event.location || event.venue}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {/* Add to Calendar Dropdown */}
                    <div className="relative group">
                      <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition flex items-center gap-2">
                        <FaCalendarAlt />
                        Add to Calendar
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        <button
                          onClick={() => handleAddToCalendar(event, 'google')}
                          className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-t-lg flex items-center gap-2"
                        >
                          <FaExternalLinkAlt className="text-xs" />
                          Google Calendar
                        </button>
                        <button
                          onClick={() => handleAddToCalendar(event, 'download')}
                          className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-b-lg flex items-center gap-2"
                        >
                          <FaDownload className="text-xs" />
                          Download .ics
                        </button>
                      </div>
                    </div>

                    {/* Registration Link */}
                    {event.registrationLink ? (
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold text-sm transition"
                      >
                        Register Now
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowRegisterModal(true);
                          setRegisterForm({ name: '', email: '' });
                          setRegisterStatus({ type: '', message: '' });
                        }}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold text-sm transition"
                      >
                        Register
                      </button>
                    )}
                  </div>

                  {/* Attendee Count */}
                  {event.maxAttendees && (
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="text-xs text-gray-400">
                        {((event.attendees?.length || 0) + (event.registrations?.length || 0))} / {event.maxAttendees} attendees
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                        <div
                          className="bg-red-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${Math.min(
                              (((event.attendees?.length || 0) + (event.registrations?.length || 0)) / event.maxAttendees) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Register Modal */}
      {showRegisterModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 rounded-lg w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-3 text-white">Register for "{selectedEvent.title}"</h3>
            {registerStatus.message && (
              <div className={`mb-3 p-2 rounded ${registerStatus.type === 'success' ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}`}>
                {registerStatus.message}
              </div>
            )}
            <form onSubmit={async (e) => {
              e.preventDefault();
              setIsRegistering(true);
              setRegisterStatus({ type: '', message: '' });
              try {
                const payload = { name: registerForm.name, email: registerForm.email };
                const resp = await registerForEventAPI(selectedEvent._id, payload);
                if (resp?.success) {
                  setRegisterStatus({ type: 'success', message: resp.message || 'Registered successfully' });
                  setTimeout(() => {
                    setShowRegisterModal(false);
                    queryClient.invalidateQueries(['events']);
                  }, 1200);
                } else {
                  setRegisterStatus({ type: 'error', message: resp.message || 'Registration failed' });
                }
              } catch (err) {
                setRegisterStatus({ type: 'error', message: err.response?.data?.message || 'Registration failed' });
              } finally {
                setIsRegistering(false);
              }
            }} className="space-y-3">
              <div>
                <label className="text-sm text-gray-300">Your Name</label>
                <input value={registerForm.name} onChange={(e) => setRegisterForm(prev => ({...prev, name: e.target.value}))} className="w-full px-3 py-2 bg-gray-800 rounded text-gray-100" />
              </div>
              <div>
                <label className="text-sm text-gray-300">Email <span className="text-red-500">*</span></label>
                <input required value={registerForm.email} onChange={(e) => setRegisterForm(prev => ({...prev, email: e.target.value}))} type="email" className="w-full px-3 py-2 bg-gray-800 rounded text-gray-100" />
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowRegisterModal(false)} className="px-4 py-2 bg-gray-400 rounded">Cancel</button>
                <button type="submit" disabled={isRegistering} className="px-4 py-2 bg-red-600 rounded text-white">{isRegistering ? 'Registering...' : 'Register'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Events;
