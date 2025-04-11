import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../../types';
import { format } from 'date-fns';

interface EventListProps {
  events: Event[];
}

const EventList = ({ events }: EventListProps) => {
  const location = useLocation();
  const isAdmin = location.pathname.includes('admin');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-teal-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Events</h1>
          <Link
            to={isAdmin ? '/admin/dashboard' : '/employee/dashboard'}
            className="text-teal-100 hover:text-white"
          >
            Back to Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={event.eventImage}
                alt={event.eventName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.eventName}</h3>
                <div className="space-y-2 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(new Date(event.eventDate), 'PPP')}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.eventLocation}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {event.submissions.length} submissions
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{event.eventDescription}</p>
                {isAdmin && event.submissions.length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-semibold mb-2">Recent Submissions</h4>
                    <div className="space-y-2">
                      {event.submissions.map((submission, idx) => (
                        <div key={idx} className="text-sm text-gray-600">
                          {submission.employeeName}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;