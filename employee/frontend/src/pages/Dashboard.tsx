import React from 'react';
import { Medal } from 'lucide-react';

function Dashboard() {
  
  const employee = {
    name: "John Doe",
    email: "john.doe@company.com",
    company: "Tech Corp",
    coins: 150,
    events: [
      {
        eventName: "Annual Hackathon",
        eventReport: "Built a new feature...",
        eventPicture: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Employee Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-gray-500">Name</h2>
            <p className="font-medium">{employee.name}</p>
          </div>
          <div>
            <h2 className="text-gray-500">Email</h2>
            <p className="font-medium">{employee.email}</p>
          </div>
          <div>
            <h2 className="text-gray-500">Company</h2>
            <p className="font-medium">{employee.company}</p>
          </div>
          <div>
            <h2 className="text-gray-500">Coins</h2>
            <div className="flex items-center space-x-2">
              <Medal className="h-5 w-5 text-yellow-500" />
              <p className="font-medium">{employee.coins}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Submission History</h2>
        <div className="space-y-4">
          {employee.events.map((event, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">{event.eventName}</h3>
              <p className="text-gray-600 mt-2">{event.eventReport}</p>
              <img
                src={event.eventPicture}
                alt={event.eventName}
                className="mt-4 rounded-lg w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;