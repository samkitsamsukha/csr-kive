import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../../types';
import { format } from 'date-fns';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingSubmissionId, setEditingSubmissionId] = useState<string | null>(null);
  const [coinAmount, setCoinAmount] = useState<number>(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/67f97a70406569c0972224ac/events/${id}`);
        if (!response.ok) {
          throw new Error('Event not found or server error');
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const handleAssignCoins = (submissionId: string) => {
    // This should be connected to a PATCH request to update submission coins
    console.log('Assigning coins:', { submissionId, coins: coinAmount });
    setEditingSubmissionId(null);
    setCoinAmount(0);
  };

  const convertToRawGitHubURL = (url: string): string => {
    try {
      const githubPrefix = "https://github.com/";
      const rawPrefix = "https://raw.githubusercontent.com/";
  
      if (url.startsWith(githubPrefix)) {
        const parts = url.replace(githubPrefix, "").split("/");
        if (parts.length >= 5 && parts[2] === "blob") {
          const [username, repo, , branch, ...pathParts] = parts;
          return `${rawPrefix}${username}/${repo}/${branch}/${pathParts.join(
            "/"
          )}`;
        }
      }
      return url; // Return the original URL if it's not a valid GitHub link
    } catch (error) {
      console.error("Error converting GitHub URL:", error);
      return url;
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!event) return <div className="p-8">Event not found</div>;

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
          src={convertToRawGitHubURL(event.eventImage)}
          alt={event.eventName}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.eventName}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              {event.eventDate && !isNaN(new Date(event.eventDate).getTime()) ? (
                format(new Date(event.eventDate), 'PPP')
              ) : (
                'Invalid Date'
              )}
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              {event.eventLocation}
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2" />
              {event.submissions?.length || 0} submissions
            </div>
          </div>
          <p className="text-gray-600">{event.eventDescription}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Submissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {event.submissions?.map((submission) => (
            <div
              key={submission._id}
              className="border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 bg-gray-50 flex flex-col h-full"
            >
              <div className="flex items-center mb-4">
                
                <div>
                  <h3 className="text-lg font-medium">{submission.employeeName}</h3>
                  <p className="text-gray-500 text-sm">
                    Submitted on{' '}
                    {submission.submittedAt &&
                    !isNaN(new Date(submission.submittedAt).getTime())
                      ? format(new Date(submission.submittedAt), 'PPP')
                      : 'Date unavailable'}
                  </p>
                </div>
              </div>
              
              <div className="flex-grow">
                <p className="text-gray-700 mb-4 text-sm line-clamp-3">
                  {submission.report}
                </p>
                <img
                  src={convertToRawGitHubURL(submission.picture) || 'https://via.placeholder.com/300'} // Dummy photo
                  alt="Submission"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              
              <div className="mt-auto pt-2">
                {editingSubmissionId === submission._id ? (
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={coinAmount}
                      onChange={(e) => setCoinAmount(Number(e.target.value))}
                      className="border rounded px-3 py-1 w-24"
                      min="0"
                    />
                    <button
                      onClick={() => handleAssignCoins(submission._id)}
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
                    onClick={() => setEditingSubmissionId(submission._id)}
                    className="text-teal-600 hover:text-teal-800"
                  >
                    Assign Coins
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;