import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Calendar, Users } from 'lucide-react';
import { Admin } from '../../types';
import { format } from 'date-fns';

interface AdminDashboardProps {
  adminData: Admin;
}

const AdminDashboard = ({ adminData }: AdminDashboardProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-teal-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CSR-kive Admin</h1>
          <Link to="/" className="text-teal-100 hover:text-white">Logout</Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Organization Overview</h2>
            <div className="space-y-4">
              <p><strong>Name:</strong> {adminData.orgName}</p>
              <p><strong>Vision:</strong> {adminData.vision}</p>
              <p><strong>Mission:</strong> {adminData.mission}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                to="/admin/create-event"
                className="flex items-center text-teal-600 hover:text-teal-800"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Create New Event
              </Link>
              <Link
                to="/events"
                className="flex items-center text-teal-600 hover:text-teal-800"
              >
                <Calendar className="w-5 h-5 mr-2" />
                View All Events
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
            <div className="space-y-4">
              {adminData.event.map((event, index) => (
                <div key={index} className="border-b last:border-0 pb-4">
                  <h3 className="text-lg font-medium">{event.eventName}</h3>
                  <p className="text-gray-600">{format(new Date(event.eventDate), 'PPP')}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {event.submissions.length} submissions
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;