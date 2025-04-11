import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText } from 'lucide-react';
import { Admin } from '../../types';
import { format } from 'date-fns';

interface DashboardProps {
  adminData: Admin;
}

const Dashboard = ({ adminData }: DashboardProps) => {
  const handleGenerateAudit = () => {
    // In a real app, this would generate an audit report
    console.log('Generating audit...');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="space-x-4">
          <Link
            to="/events/create"
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create Event
          </Link>
          <button
            onClick={handleGenerateAudit}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            <FileText className="w-5 h-5 mr-2" />
            Generate Audit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminData.events.map((event) => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={event.eventImage}
              alt={event.eventName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{event.eventName}</h3>
              <p className="text-gray-600 mb-2">
                {format(new Date(event.eventDate), 'PPP')}
              </p>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {event.eventDescription}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{event.submissions.length} submissions</span>
                <span>Reward: ${event.rewardAmount}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;