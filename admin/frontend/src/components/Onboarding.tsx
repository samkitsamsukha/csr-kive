import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to CSR-kive</h1>
          <p className="text-teal-100 text-lg">Manage and track your corporate social responsibility initiatives</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all group"
          >
            <Building2 className="w-12 h-12 text-teal-600 mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Admin Portal</h2>
            <p className="text-gray-600">Manage CSR events and track employee participation</p>
          </button>

          <button
            onClick={() => navigate('/employee/dashboard')}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all group"
          >
            <Users className="w-12 h-12 text-teal-600 mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Employee Portal</h2>
            <p className="text-gray-600">View events and submit your contributions</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;