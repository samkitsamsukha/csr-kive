import React from 'react';
import { Trophy, Medal } from 'lucide-react';

function Leaderboard() {
  // Mock data - replace with actual data from Supabase
  const employees = [
    { id: 1, name: "John Doe", company: "Tech Corp", coins: 250 },
    { id: 2, name: "Jane Smith", company: "Tech Corp", coins: 200 },
    { id: 3, name: "Bob Johnson", company: "Tech Corp", coins: 150 },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="h-8 w-8 text-yellow-500" />
        <h1 className="text-2xl font-bold">Employee Leaderboard</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coins
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee, index) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {index === 0 && <Medal className="h-5 w-5 text-yellow-500 mr-2" />}
                    {index === 1 && <Medal className="h-5 w-5 text-gray-400 mr-2" />}
                    {index === 2 && <Medal className="h-5 w-5 text-orange-500 mr-2" />}
                    {index + 1}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{employee.company}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-900">{employee.coins}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;