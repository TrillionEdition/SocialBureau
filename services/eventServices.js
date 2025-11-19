import axios from 'axios';
import { BASE_URL } from '../utils/urls';

axios.defaults.withCredentials = true;

// Get all events with filters
export const getEventsAPI = async (params = {}) => {
  const response = await axios.get(`${BASE_URL}/event/list`, { params });
  return response.data;
};

// Get upcoming events
export const getUpcomingEventsAPI = async (limit = 10) => {
  const response = await axios.get(`${BASE_URL}/event/upcoming`, {
    params: { limit },
  });
  return response.data;
};

// Get single event by ID
export const getEventByIdAPI = async (id) => {
  const response = await axios.get(`${BASE_URL}/event/${id}`);
  return response.data;
};

// Create new event
export const createEventAPI = async (eventData) => {
  // If a FormData is passed (multipart/form-data with file upload), send it directly
  if (eventData instanceof FormData) {
    const response = await axios.post(`${BASE_URL}/event/add`, eventData);
    return response.data;
  }

  const response = await axios.post(`${BASE_URL}/event/add`, eventData);
  return response.data;
};

// Update event
export const updateEventAPI = async (id, eventData) => {
  const response = await axios.patch(`${BASE_URL}/event/${id}`, eventData);
  return response.data;
};

// Delete event
export const deleteEventAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/event/${id}`);
  return response.data;
};

// Download calendar file
export const downloadCalendarFile = async (id) => {
  const response = await axios.get(`${BASE_URL}/event/${id}/calendar`, {
    responseType: 'blob',
  });
  
  // Create download link
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `event-${id}.ics`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
  
  return response.data;
};

// Register for event
// Register for event: payload can be { userId } or { name, email }
export const registerForEventAPI = async (id, payload) => {
  const response = await axios.post(`${BASE_URL}/event/${id}/register`, payload);
  return response.data;
};

// Add to Google Calendar
export const addToGoogleCalendar = (event) => {
  const startDate = new Date(event.startDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endDate = new Date(event.endDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
    event.description
  )}&location=${encodeURIComponent(event.location || event.venue || '')}`;
  
  window.open(googleCalendarUrl, '_blank');
};
