import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, Coins } from 'lucide-react';
import { Employee } from '../../types';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/employee/${id}`);
        if (!res.ok) throw new Error('Failed to fetch employee data');
        const data = await res.json();
        setEmployee(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
  }

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!employee) return <div className="p-8">Employee not found</div>;

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
          <div className="p-6 w-full">
          <div className="flex flex-row items-center space-x-4 mb-4">
  <div className="w-12 h-12 flex items-center justify-center font-bold rounded-full text-xl bg-teal-200">
    {getInitials(employee.name)}
  </div>
  <div className="text-2xl font-bold">{employee.name}</div>
</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Building2 className="w-5 h-5 mr-2" />
                {employee.company}
              </div>
              <div className="flex items-center text-gray-600">
                <Coins className="w-5 h-5 mr-2" />
                {employee.coins} coins earned
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Submission History</h2>
        <div className="space-y-6">
          {employee.events.map((submission) => (
            <div
              key={submission._id}
              className="border-b last:border-0 pb-6 last:pb-0"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3>{submission.eventName}</h3>
                  <h3 className="text-lg font-medium">{submission.eventReport}</h3>
                </div>
              </div>
              <img
                src={submission.eventPicture}
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
