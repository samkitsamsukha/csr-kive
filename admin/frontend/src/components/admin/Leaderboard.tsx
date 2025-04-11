import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Coins } from 'lucide-react';
import { Employee } from '../../types';
import axios from 'axios';

const Leaderboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/employee');
        setEmployees(res.data);
        setLoading(false);
      } catch {
        setError('Failed to fetch employees.');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const sortedEmployees = [...employees].sort((a, b) => b.coins - a.coins);

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0: return 'bg-yellow-100 border-yellow-500';
      case 1: return 'bg-gray-100 border-gray-500';
      case 2: return 'bg-orange-100 border-orange-500';
      default: return 'bg-white border-transparent';
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1: return <Medal className="w-6 h-6 text-gray-500" />;
      case 2: return <Medal className="w-6 h-6 text-orange-500" />;
      default: return <span className="w-6 h-6 flex items-center justify-center font-bold">{index + 1}</span>;
    }
  };

  if (loading) return <div className="p-8">Loading leaderboard...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Leaderboard</h1>
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 space-y-4">
          {sortedEmployees.map((employee, index) => (
            <div
              key={employee._id}
              className={`flex items-center p-4 rounded-lg border ${getRankStyle(index)} transition-all hover:scale-[1.01]`}
            >
              <div className="flex items-center flex-1">
                <div className="w-12 flex justify-center">{getRankIcon(index)}</div>
                
                <div>
                  <h3 className="font-semibold">{employee.name}</h3>
                  <p className="text-sm text-gray-600">{employee.company}</p>
                </div>
              </div>
              <div className="text-right flex flex-row gap-2">
                <div><Coins className='text-yellow-500'/></div><p className="font-bold text-lg">{employee.coins}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
