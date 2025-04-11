import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Trophy } from 'lucide-react';
import axios from 'axios';

function Events() {
  const navigate = useNavigate();
  interface Event {
    _id: string;
    eventName: string;
    eventDescription: string;
    eventDate: string;
    eventImage: string;
    submissions?: { userId: string; submissionDate: string }[];
    rewardAmount: number;
  }

  const [events, setEvents] = useState<Event[]>([]);
  
  const adminId = '67f97a70406569c0972224ac'; // Replace with actual admin ID or fetch from context/session

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


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/${adminId}`);
        setEvents(res.data.events);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, [adminId]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => navigate(`/events/${event._id}`)}
          >
            <img
              src={convertToRawGitHubURL(event.eventImage)}
              alt={event.eventName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{event.eventName}</h3>
              <p className="text-gray-600 text-sm mb-4">{event.eventDescription}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{event.submissions?.length || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span>{event.rewardAmount} coins</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
