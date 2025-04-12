import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, Download } from 'lucide-react';
import { format } from 'date-fns';
import axios from 'axios';
import { Admin } from '../../types';

const Dashboard = () => {
  const [adminData, setAdminData] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const handleGenerateAudit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Use the admin ID from the context or a default value
      const adminId = '67f97a70406569c0972224ac'; // Replace with actual admin ID from context
      
      // Call the Flask API to generate reports
      const response = await axios.get(`http://localhost:5001/api/generate-report/${adminId}`);
      
      if (response.data && response.data.reports) {
        setReports(response.data.reports);
        setSuccess(`Successfully generated ${response.data.reports.length} reports!`);
      } else {
        setError('Failed to generate reports. No reports returned.');
      }
    } catch (err) {
      console.error('Error generating reports:', err);
      setError('Failed to generate reports. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async (reportName: string) => {
    try {
      const adminId = '67f97a70406569c0972224ac'; // Replace with actual admin ID from context
      
      // Call the Flask API to download a specific report
      window.open(`http://localhost:5001/api/generate-single-report/${adminId}/${reportName.replace('_report.pdf', '')}`, '_blank');
    } catch (err) {
      console.error('Error downloading report:', err);
      alert('Failed to download report. Please try again later.');
    }
  };

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
            onClick={handleGenerateAudit}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
          >
            <FileText className="w-5 h-5 mr-2" />
            {loading ? 'Generating...' : 'Generate Audit'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}

      {reports.length > 0 && (
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Reports</h2>
          <div className="space-y-2">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">{report}</span>
                <button
                  onClick={() => handleDownloadReport(report)}
                  className="inline-flex items-center px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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
