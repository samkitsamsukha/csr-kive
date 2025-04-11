import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText } from 'lucide-react';
import { format } from 'date-fns';
import axios from 'axios';
import { Admin } from '../../types';

const Dashboard = () => {
  const [adminData, setAdminData] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

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
    const fetchAdmin = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/67f97a70406569c0972224ac'); // adjust URL if needed
        setAdminData(res.data);
        console.log('Admin data:', res.data);
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!adminData) return <div>No data found</div>;

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
            // onClick={handleGenerateAudit}
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
            key={event._id}
            to={`/events/${event._id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={convertToRawGitHubURL(event.eventImage)}
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
              <p className="text-teal-600 mb-4 line-clamp-2">
                {event.eventLocation}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{event.submissions?.length || 0} submissions</span>
                <span>Reward: {event.rewardAmount} coins</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
