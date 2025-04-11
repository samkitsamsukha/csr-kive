import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase, Building2, Calendar, Coins } from 'lucide-react';
import { Employee } from '../../types';
import { format } from 'date-fns';

interface EmployeeDetailsProps {
  employees: Employee[];
}

const EmployeeDetails = ({ employees }: EmployeeDetailsProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = employees.find(e => e.id === id);

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="p-8">
      <button
        onClick={() => navigate('/employees')}
        className="mb-6 text-teal-600 hover:text-teal-800"
      >
        ← Back to Employees
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{employee.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Briefcase className="w-5 h-5 mr-2" />
                {employee.position}
              </div>
              <div className="flex items-center text-gray-600">
                <Building2 className="w-5 h-5 mr-2" />
                {employee.department}
              </div>
              <div className="flex items-center text-gray-600">
                <Coins className="w-5 h-5 mr-2" />
                {employee.totalCoins} coins earned
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Submission History</h2>
        <div className="space-y-6">
          {employee.submissions.map((submission) => (
            <div
              key={submission.id}
              className="border-b last:border-0 pb-6 last:pb-0"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium">{submission.report}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {format(new Date(submission.submittedAt), 'PPP')}
                  </div>
                </div>
                <div className="flex items-center">
                  <Coins className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="font-medium">{submission.coins} coins</span>
                </div>
              </div>
              <img
                src={submission.picture}
                alt="Submission"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;