import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Coins } from 'lucide-react';
import { Event } from '../../types';
import { format } from 'date-fns';

interface EventDetailsProps {
  events: Event[];
}

const EventDetails = ({ events }: EventDetailsProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);

  const [editingSubmissionId, setEditingSubmissionId] = useState<string | null>(null);
  const [coinAmount, setCoinAmount] = useState<number>(0);

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleAssignCoins = (submissionId: string) => {
    // In a real app, this would update the submission with new coins
    console.log('Assigning coins:', { submissionId, coins: coinAmount });
    setEditingSubmissionId(null);
    setCoinAmount(0);
  };

  return (
    <div className="p-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-teal-600 hover:text-teal-800"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <img
          src={event.eventImage}
          alt={event.eventName}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.eventName}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              {format(new Date(event.eventDate), 'PPP')}
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              {event.eventLocation}
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2" />
              {event.submissions.length} submissions
            </div>
          </div>
          <p className="text-gray-600">{event.eventDescription}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Submissions</h2>
        <div className="space-y-6">
          {event.submissions.map((submission) => (
            <div
              key={submission.id}
              className="border-b last:border-0 pb-6 last:pb-0"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium">{submission.employeeName}</h3>
                  <p className="text-gray-500 text-sm">
                    Submitted on {format(new Date(submission.submittedAt), 'PPP')}
                  </p>
                </div>
                <div className="flex items-center">
                  <Coins className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="font-medium">{submission.coins} coins</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{submission.report}</p>
              <img
                src={submission.picture}
                alt="Submission"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              {editingSubmissionId === submission.id ? (
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={coinAmount}
                    onChange={(e) => setCoinAmount(Number(e.target.value))}
                    className="border rounded px-3 py-1 w-24"
                    min="0"
                  />
                  <button
                    onClick={() => handleAssignCoins(submission.id)}
                    className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700"
                  >
                    Assign
                  </button>
                  <button
                    onClick={() => setEditingSubmissionId(null)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditingSubmissionId(submission.id)}
                  className="text-teal-600 hover:text-teal-800"
                >
                  Assign Coins
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;