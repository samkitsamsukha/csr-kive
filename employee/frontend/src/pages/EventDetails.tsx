import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Users, Trophy } from 'lucide-react';

function EventDetails() {
  const { id } = useParams();
  const [report, setReport] = useState('');
  const [picture, setPicture] = useState('');

  // Mock data - replace with actual data from Supabase
  const event = {
    id: 1,
    title: "Annual Hackathon",
    description: "Build innovative solutions in 24 hours",
    date: "2024-03-15",
    participants: 50,
    reward: 100,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission to Supabase
    console.log({ report, picture });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-600 mb-6">{event.description}</p>
          
          <div className="flex items-center space-x-6 mb-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>{event.participants} participants</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span>{event.reward} coins</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Report
              </label>
              <textarea
                value={report}
                onChange={(e) => setReport(e.target.value)}
                className="w-full h-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your report here..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Picture URL
              </label>
              <input
                type="url"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter picture URL"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;