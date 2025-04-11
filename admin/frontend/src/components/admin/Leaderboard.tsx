import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Coins, Star, TrendingUp, Award } from 'lucide-react';
import { Employee } from '../../types';
import axios from 'axios';

const Leaderboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string>('');
  const [viewMode, setViewMode] = useState<'all' | 'top10'>('all');

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

  const sortedEmployees = [...employees]
    .sort((a, b) => b.coins - a.coins)
    .filter(emp => emp.name.toLowerCase().includes(filterValue.toLowerCase()));

  const displayedEmployees = viewMode === 'top10' ? sortedEmployees.slice(0, 10) : sortedEmployees;

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0: return {
        bg: 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-500',
        text: 'text-yellow-800'
      };
      case 1: return {
        bg: 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-400',
        text: 'text-gray-800'
      };
      case 2: return {
        bg: 'bg-gradient-to-r from-orange-100 to-orange-200 border-orange-400',
        text: 'text-orange-800'
      };
      default: {
        // Create a colorful pattern based on position
        const colorSchemes = [
          { bg: 'bg-blue-50 border-blue-300', text: 'text-blue-800' },
          { bg: 'bg-green-50 border-green-300', text: 'text-green-800' },
          { bg: 'bg-teal-50 border-teal-300', text: 'text-teal-800' },
          { bg: 'bg-pink-50 border-pink-300', text: 'text-pink-800' },
          { bg: 'bg-indigo-50 border-indigo-300', text: 'text-indigo-800' },
        ];
        
        return colorSchemes[(index - 3) % colorSchemes.length];
      }
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="w-8 h-8 text-yellow-500" />;
      case 1: return <Medal className="w-8 h-8 text-gray-500" />;
      case 2: return <Medal className="w-8 h-8 text-orange-500" />;
      case 3:
      case 4:
      case 5: return <Star className="w-6 h-6 text-blue-500" />;
      default: return <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 font-bold text-gray-700">{index + 1}</span>;
    }
  };

  const getRandomAvatar = (id: string) => {
    const styles = ['adventurer', 'adventurer-neutral', 'avataaars', 'big-ears', 'big-smile', 'bottts', 'croodles', 'fun-emoji', 'icons', 'identicon', 'initials', 'micah', 'miniavs', 'personas', 'pixel-art'];
    const style = styles[Math.floor(id.charCodeAt(0) % styles.length)];
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${id}`;
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      <p className="ml-3 text-lg font-medium">Loading leaderboard...</p>
    </div>
  );
  
  if (error) return (
    <div className="p-8 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center">
      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {error}
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-900 text-transparent bg-clip-text">Employee Leaderboard</h1>
          <p className="text-gray-600 mt-1">Top performers ranked by earned coins</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none w-full sm:w-64"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex rounded-lg overflow-hidden border border-gray-300">
            <button 
              onClick={() => setViewMode('all')} 
              className={`px-4 py-2 ${viewMode === 'all' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700'}`}
            >
              All
            </button>
            <button 
              onClick={() => setViewMode('top10')} 
              className={`px-4 py-2 ${viewMode === 'top10' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700'}`}
            >
              Top 10
            </button>
          </div>
        </div>
      </div>

      {/* Top 3 Winners Podium */}
      {sortedEmployees.length > 2 && (
        <div className="mb-10 hidden md:flex justify-center items-end space-x-4 h-48">
          {/* Second Place */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img 
                src={getRandomAvatar(sortedEmployees[1]?._id || '2')} 
                alt={sortedEmployees[1]?.name}
                className="w-16 h-16 rounded-full border-4 border-gray-400 object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-gray-300 rounded-full p-1">
                <Medal className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-center mt-3">
              <p className="font-bold text-gray-800">{sortedEmployees[1]?.name}</p>
              <div className="flex items-center justify-center mt-1">
                <Coins className="w-4 h-4 text-yellow-500 mr-1" />
                <p className="font-semibold">{sortedEmployees[1]?.coins}</p>
              </div>
            </div>
            <div className="h-28 w-20 bg-gray-300 rounded-t-lg mt-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
          </div>
          
          {/* First Place */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
              <img 
                src={getRandomAvatar(sortedEmployees[0]?._id || '1')} 
                alt={sortedEmployees[0]?.name}
                className="w-20 h-20 rounded-full border-4 border-yellow-400 object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-1">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-center mt-3">
              <p className="font-bold text-lg text-gray-800">{sortedEmployees[0]?.name}</p>
              <div className="flex items-center justify-center mt-1">
                <Coins className="w-4 h-4 text-yellow-500 mr-1" />
                <p className="font-bold text-lg">{sortedEmployees[0]?.coins}</p>
              </div>
            </div>
            <div className="h-40 w-24 bg-yellow-400 rounded-t-lg mt-4 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">1</span>
            </div>
          </div>
          
          {/* Third Place */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* <img 
                src={getRandomAvatar(sortedEmployees[2]?._id || '3')} 
                alt={sortedEmployees[2]?.name}
                className="w-16 h-16 rounded-full border-4 border-orange-400 object-cover"
              /> */}
              <div className="absolute -bottom-2 -right-2 bg-orange-400 rounded-full p-1">
                <Medal className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-center mt-3">
              <p className="font-bold text-gray-800">{sortedEmployees[2]?.name}</p>
              <div className="flex items-center justify-center mt-1">
                <Coins className="w-4 h-4 text-yellow-500 mr-1" />
                <p className="font-semibold">{sortedEmployees[2]?.coins}</p>
              </div>
            </div>
            <div className="h-20 w-20 bg-orange-400 rounded-t-lg mt-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-6">
          <div className="grid grid-cols-1 gap-3">
            {displayedEmployees.map((employee, index) => {
              const rankStyle = getRankStyle(index);
              
              return (
                <div
                  key={employee._id}
                  className={`flex items-center p-4 rounded-xl border ${rankStyle.bg} transition-all hover:shadow-md`}
                >
                  <div className="flex items-center flex-1 gap-4">
                    <div className="flex-shrink-0 w-12">
                      {getRankIcon(index)}
                    </div>
                    
                    {/* <img 
                      src={getRandomAvatar(employee._id)}
                      alt={employee.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                    /> */}
                    
                    <div>
                      <h3 className={`font-bold ${rankStyle.text}`}>{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.company}</p>
                    </div>
                  </div>
                  
                  <div className="text-right flex flex-row items-center gap-2 bg-white bg-opacity-50 py-2 px-4 rounded-full shadow-sm">
                    <Coins className="w-5 h-5 text-yellow-500"/>
                    <p className={`font-bold text-lg ${rankStyle.text}`}>{employee.coins}</p>
                  </div>
                </div>
              );
            })}
            
            {displayedEmployees.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="mt-4 text-lg font-medium">No employees match your search</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
          <p className="text-gray-600 text-sm">{displayedEmployees.length} employees shown</p>
          <div className="flex items-center text-teal-500">
            <TrendingUp className="w-5 h-5 mr-2" />
            <span className="font-medium from-teal-500 to-teal-400">Stats updated hourly</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;