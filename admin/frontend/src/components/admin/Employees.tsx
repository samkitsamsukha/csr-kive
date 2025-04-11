import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Coins } from 'lucide-react';
import { Employee } from '../../types';

interface EmployeesProps {
  employees: Employee[];
}

const Employees = ({ employees }: EmployeesProps) => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Employees</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Link
            key={employee.id}
            to={`/employees/${employee.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{employee.name}</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {employee.position}
                </div>
                <div className="flex items-center">
                  <Coins className="w-4 h-4 mr-2" />
                  {employee.totalCoins} coins earned
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                {employee.submissions.length} submissions
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Employees;