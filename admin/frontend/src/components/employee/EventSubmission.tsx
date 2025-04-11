import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Event } from '../../types';
import { format } from 'date-fns';

interface EventSubmissionProps {
  events: Event[];
}

const EventSubmission = ({ events }: EventSubmissionProps) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const event = events[Number(eventId)];

  const [formData, setFormData] = useState({
    employeeName: '',
    report: '',
    picture: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to the backend
    console.log('Submission created:', formData);
    navigate('/employee/dashboard');
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-teal-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Submit Event Report</h1>
          <button
            onClick={() => navigate('/employee/dashboard')}
            className="text-teal-100 hover:text-white"
          >
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <img
            src={event.eventImage}
            alt={event.eventName}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{event.eventName}</h2>
            <p className="text-gray-600 mb-2">
              Date: {format(new Date(event.eventDate), 'PPP')}
            </p>
            <p className="text-gray-600 mb-4">{event.eventDescription}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                value={formData.employeeName}
                onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report
              </label>
              <textarea
                required
                rows={6}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                value={formData.report}
                onChange={(e) => setFormData({ ...formData, report: e.target.value })}
                placeholder="Describe your participation and impact..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Picture URL
              </label>
              <input
                type="url"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                value={formData.picture}
                onChange={(e) => setFormData({ ...formData, picture: e.target.value })}
                placeholder="Enter the URL of your event picture"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors"
              >
                Submit Report
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventSubmission;