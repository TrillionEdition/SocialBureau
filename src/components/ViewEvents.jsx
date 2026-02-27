import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEventsAPI, getEventByIdAPI } from '../..eventServices';
import LoadingSpinner from './LoadingSpinner';

const parseEvents = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.events)) return data.events;
  return [];
};

const ViewEvents = () => {
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['eventsList'],
    queryFn: () => getEventsAPI({ limit: 200 }),
  });

  const events = parseEvents(data);

  const eventQuery = useQuery({
    queryKey: ['event', selectedId],
    queryFn: () => getEventByIdAPI(selectedId),
    enabled: !!selectedId,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="p-6 text-red-400">Failed to load events</div>;

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">All Events & Registrations</h2>

        <div className="overflow-x-auto bg-gray-900 rounded-lg border border-gray-800">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-3 text-sm text-gray-300">Title</th>
                <th className="px-4 py-3 text-sm text-gray-300">Date</th>
                <th className="px-4 py-3 text-sm text-gray-300">Attendees</th>
                <th className="px-4 py-3 text-sm text-gray-300">Registrations</th>
                <th className="px-4 py-3 text-sm text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev._id} className="border-t border-gray-800 hover:bg-gray-850">
                  <td className="px-4 py-3 align-top">
                    <div className="font-semibold">{ev.title}</div>
                    <div className="text-xs text-gray-400">{ev.category || '—'}</div>
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-300">{ev.startDate ? new Date(ev.startDate).toLocaleString() : '—'}</td>
                  <td className="px-4 py-3 align-top text-sm">{(ev.attendees && ev.attendees.length) || 0}</td>
                  <td className="px-4 py-3 align-top text-sm">{(ev.registrations && ev.registrations.length) || 0}</td>
                  <td className="px-4 py-3 align-top">
                    <button
                      onClick={() => setSelectedId(ev._id)}
                      className="bg-red-600 px-3 py-1 text-sm rounded hover:opacity-90"
                    >
                      View Registrations
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Details modal / panel */}
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <div className="bg-black/70 fixed inset-0" onClick={() => setSelectedId(null)} />
            <div className="relative bg-gray-900 border border-gray-800 rounded-lg max-w-3xl w-full p-6 z-10">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">Event Registrations</h3>
                <button onClick={() => setSelectedId(null)} className="text-gray-400">✕</button>
              </div>

              {eventQuery.isLoading && <div className="py-6"><LoadingSpinner /></div>}

              {eventQuery.isError && <div className="py-6 text-red-400">Failed to load event details</div>}

              {eventQuery.data && (
                (() => {
                  const payload = eventQuery.data?.data || eventQuery.data;
                  const event = payload || {};
                  const attendees = Array.isArray(event.attendees) ? event.attendees : [];
                  const guests = Array.isArray(event.registrations) ? event.registrations : [];

                  return (
                    <div className="mt-4">
                      <div className="mb-4">
                        <div className="text-xl font-semibold">{event.title}</div>
                        <div className="text-sm text-gray-400">{event.venue || event.location}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                          <h4 className="font-semibold mb-2">Registrations</h4>
                          {guests.length === 0 ? (
                            <div className="text-gray-400">No registrations</div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {guests.map((g, idx) => (
                                <div key={idx} className="text-sm bg-gray-800 p-3 rounded">
                                  <div className="font-medium">{g.name || 'Guest'}</div>
                                  <div className="text-xs text-gray-400">{g.email}</div>
                                  <div className="text-xs text-gray-500">{g.createdAt ? new Date(g.createdAt).toLocaleString() : ''}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEvents;
