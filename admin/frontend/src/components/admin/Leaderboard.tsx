import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { Employee } from '../../types';

interface LeaderboardProps {
  employees: Employee[];
}

const Leaderboard = ({ employees }: LeaderboardProps) => {
  const sortedEmployees = [...employees].sort((a, b) => b.totalCoins - a.totalCoins);

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-yellow-100 border-yellow-500';
      case 1:
        return 'bg-gray-100 border-gray-500';
      case 2:
        return 'bg-orange-100 border-orange-500';
      default:
        return 'bg-white border-transparent';
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-orange-500" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold">{index + 1}</span>;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Leaderboard</h1>
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 space-y-4">
          {sortedEmployees.map((employee, index) => (
            <div
              key={employee.id}
              className={`flex items-center p-4 rounded-lg border ${getRankStyle(index)} transition-all hover:scale-[1.01]`}
            >
              <div className="flex items-center flex-1">
                <div className="w-12 flex justify-center">
                  {getRankIcon(index)}
                </div>
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{employee.name}</h3>
                  <p className="text-sm text-gray-600">{employee.department}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-bold text-lg">{employee.totalCoins}</p>
                  <p className="text-sm text-gray-600">coins earned</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;