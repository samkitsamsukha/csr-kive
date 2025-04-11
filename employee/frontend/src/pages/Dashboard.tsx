import React, { useEffect, useState } from 'react';
import { Medal } from 'lucide-react';
import axios from 'axios';

interface Employee {
  name: string;
  email: string;
  company: string;
  coins: number;
  submissions: {
    eventName: string;
    report: string;
    picture: string;
  }[];
}

function Dashboard() {
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {


    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/67f98872c782341dec08fd94`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  if (!employee) {
    return <div>Loading...</div>;
  }

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
          {employee.submissions && employee.submissions.map((submission, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">{submission.eventName}</h3>
              <p className="text-gray-600 mt-2">{submission.report}</p>
              <img
                src={submission.picture}
                alt={submission.eventName}
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