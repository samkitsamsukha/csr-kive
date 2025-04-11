import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Coins } from 'lucide-react';
import { Employee } from '../../types';

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/employee');
        if (!res.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await res.json();
        setEmployees(data);
        console.log(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Employees</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Link
            key={employee._id}
            to={`/employees/${employee._id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{employee.name}</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {employee.company}
                </div>
                <div className="flex items-center">
                  <Coins className="w-4 h-4 mr-2" />
                  {employee.coins} coins earned
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                {employee.events?.length || 0} submissions
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Employees;
