import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Award } from 'lucide-react';
import { Event } from '../../types';
import { format } from 'date-fns';

interface EmployeeDashboardProps {
  events: Event[];
}

const EmployeeDashboard = ({ events }: EmployeeDashboardProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-teal-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CSR-kive Employee Portal</h1>
          <Link to="/" className="text-teal-100 hover:text-white">Logout</Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Available Events</h2>
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
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(new Date(event.eventDate), 'PPP')}
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Award className="w-4 h-4 mr-2" />
                    Reward: ${event.rewardAmount}
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.eventDescription}</p>
                  <Link
                    to={`/event/${index}/submit`}
                    className="block text-center bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition-colors"
                  >
                    Submit Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">My Submissions</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600">Track your event submissions and rewards here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;