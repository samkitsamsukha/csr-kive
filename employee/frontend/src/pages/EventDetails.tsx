import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Users, Trophy } from 'lucide-react';
import axios from 'axios';

function EventDetails() {
  const { id } = useParams();
  
  interface Event {
    _id: string;
    eventName: string;
    eventDescription: string;
    eventDate: string;
    eventImage: string;
    submissions?: { employeeId: string; report: string; picture: string }[];
    rewardAmount: number;
  }

  const [event, setEvent] = useState<Event | null>(null);
  const [report, setReport] = useState("");
  const [picture, setPicture] = useState("");

  // Mock Employee Data (Replace this with actual logic to fetch employee details)
  const employee = {
    _id: '67f98872c782341dec08fd94',
    name: 'Samkit Samsukha',
  };

  // Replace with actual admin ID
  const adminId = '67f97a70406569c0972224ac';

  const convertToRawGitHubURL = (url: string): string => {
    try {
      const githubPrefix = "https://github.com/";
      const rawPrefix = "https://raw.githubusercontent.com/";

      if (url.startsWith(githubPrefix)) {
        const parts = url.replace(githubPrefix, "").split("/");
        if (parts.length >= 5 && parts[2] === "blob") {
          const [username, repo, , branch, ...pathParts] = parts;
          return `${rawPrefix}${username}/${repo}/${branch}/${pathParts.join("/")}`;
        }
      }
      return url; // Return the original URL if it's not a valid GitHub link
    } catch (error) {
      console.error("Error converting GitHub URL:", error);
      return url;
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/${adminId}`);
        const foundEvent = res.data.events.find((e: Event) => e._id === id);
        setEvent(foundEvent);
      } catch (err) {
        console.error('Error fetching event:', err);
      }
    };

    fetchEvent();
  }, [id, adminId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employee) {
      alert("Employee is not logged in.");
      return;
    }

    if (!event) {
      alert("Event details not found.");
      return;
    }

    try {
      // Only send the fields that the backend controller expects
      const res = await axios.post(
        `http://localhost:5000/api/events/${adminId}/${id}/submit`,
        {
<<<<<<< HEAD
          employeeId: employee._id,
=======
          employeeId: "67f98872c782341dec08fd94",
>>>>>>> eef8e9a3806093abf58448e332c6c688869cfba5
          employeeName: "Samkit Samsukha",
          report,
          picture
        }
      );
      
      if (res.status !== 200) {
        throw new Error("Failed to submit report");
      }
      
      setReport("");
      setPicture("");
      setEvent((prevEvent) => {
              if (!prevEvent) return prevEvent;
              return {
                ...prevEvent,
                submissions: [
                  ...(prevEvent.submissions || []),
                  { employeeId: employee._id, report, picture },
                ],
              };
            });
      alert("Report submitted successfully!");
    } catch (error) {
      console.error("Error submitting report:", error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              alert("Event or admin not found. Please try again later.");
              break;
            case 400:
              alert("Invalid submission data. Please check your input and try again.");
              break;
            case 500:
              alert("Server error. Please try again later.");
              break;
            default:
              alert(`Error: ${error.response.data.message || "Failed to submit report"}`);
          }
        } else if (error.request) {
          alert("No response from server. Please check your internet connection and try again.");
        } else {
          alert("Error setting up the request. Please try again.");
        }
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (!event) return <div className="text-center py-10 text-gray-500">Loading event...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: Event Details */}
        <div className="border-1 border-gray-200 bg-teal-50 shadow-md">
          <img
            src={convertToRawGitHubURL(event.eventImage)}
            alt={event.eventName}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{event.eventName}</h1>
            <p className="text-gray-600 mb-6">{event.eventDescription}</p>

            <div className="space-y-4 text-gray-500">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(event.eventDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{event.submissions?.length || 0} submissions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>{event.rewardAmount} coins</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Submission Form */}
        <div className="p-6 border-gray-200">
          <h2 className="text-xl font-semibold mb-6">Submit Your Report</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Report
              </label>
              <textarea
                value={report}
                onChange={(e) => setReport(e.target.value)}
                className="w-full h-80 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter picture URL"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
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
