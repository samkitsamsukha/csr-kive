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
        {employee.events.map((submission) => (
            <div
              key={submission._id}
              className="border-b last:border-0 pb-6 last:pb-0"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className='font-semibold text-xl text-teal-900'>{submission.eventName}</h3>
                  <h3 className="text-lg font-medium">{submission.eventReport}</h3>
                </div>
              </div>
              <img
                src={convertToRawGitHubURL(submission.eventPicture)}
                alt="Submission"
                className="h-64 w-fit object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;