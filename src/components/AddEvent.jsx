import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEventAPI } from '../..eventServices';
import Footer from './Footer';
import { FaCalendarPlus, FaImage, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

export const AddEvent = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    venue: '',
    imageFile: null,
    category: 'other',
    maxAttendees: '',
    tags: '',
    organizer: '',
    contactEmail: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const createMutation = useMutation({
    mutationFn: createEventAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      setSubmitStatus({
        type: 'success',
        message: 'Event created successfully!',
      });
      // Reset form
      setFormData({
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        location: '',
        venue: '',
        image: '',
        category: 'other',
        registrationLink: '',
        maxAttendees: '',
        tags: '',
        organizer: '',
        contactEmail: '',
      });
      setTimeout(() => setSubmitStatus({ type: '', message: '' }), 5000);
    },
    onError: (error) => {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to create event',
      });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prev) => ({ ...prev, imageFile: file }));
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine date and time
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

    // Build multipart form data for upload
    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description);
    payload.append('startDate', startDateTime.toISOString());
    payload.append('endDate', endDateTime.toISOString());
    if (formData.location) payload.append('location', formData.location);
    if (formData.venue) payload.append('venue', formData.venue);
    if (formData.category) payload.append('category', formData.category);
    if (formData.maxAttendees) payload.append('maxAttendees', String(formData.maxAttendees));
    if (formData.tags) payload.append('tags', formData.tags);
    if (formData.organizer) payload.append('organizer', formData.organizer);
    if (formData.contactEmail) payload.append('contactEmail', formData.contactEmail);
    if (formData.imageFile) payload.append('image', formData.imageFile);

    createMutation.mutate(payload);
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <FaCalendarPlus className="text-red-600" />
              Create New Event
            </h1>
            <p className="text-gray-400">
              Add a new event to your calendar and notify attendees
            </p>
          </div>

          {/* Status Message */}
          {submitStatus.message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success'
                  ? 'bg-green-600/20 text-green-200 border border-green-600'
                  : 'bg-red-600/20 text-red-200 border border-red-600'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-6 md:p-8 space-y-6">
            {/* Event Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition"
                placeholder="e.g., Web Development Workshop"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="5"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition resize-none"
                placeholder="Describe your event, what attendees will learn or experience..."
              />
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date & Time */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Start Date & Time <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition"
                  />
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition"
                  />
                </div>
              </div>

              {/* End Date & Time */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  End Date & Time <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition"
                  />
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition"
                  />
                </div>
              </div>
            </div>

            {/* Location and Venue */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition"
                  placeholder="City, State/Country"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Venue</label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition"
                  placeholder="Specific venue name or address"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <FaImage className="text-red-500" />
                Event Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-red-600 file:text-white"
              />
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Category and Max Attendees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition"
                >
                  <option value="workshop">Workshop</option>
                  <option value="webinar">Webinar</option>
                  <option value="conference">Conference</option>
                  <option value="meetup">Meetup</option>
                  <option value="training">Training</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <FaUsers className="text-red-500" />
                  Max Attendees
                </label>
                <input
                  type="number"
                  name="maxAttendees"
                  value={formData.maxAttendees}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition"
                  placeholder="Leave empty for unlimited"
                />
              </div>
            </div>

            {/* NOTE: Registration link removed — events will use internal registrations by default */}

            {/* Organizer and Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Organizer</label>
                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition"
                  placeholder="Organization or person name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition"
                  placeholder="contact@example.com"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold mb-2">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition"
                placeholder="design, development, marketing (comma separated)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple tags with commas
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createMutation.isPending ? 'Creating Event...' : 'Create Event'}
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEvent;
