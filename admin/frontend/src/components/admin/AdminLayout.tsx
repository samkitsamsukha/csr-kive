import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Trophy, FileText } from 'lucide-react';
import clsx from 'clsx';

const AdminLayout = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: Users, label: 'Employees', to: '/employees' },
    { icon: Trophy, label: 'Leaderboard', to: '/leaderboard' },
    { icon: FileText, label: 'View Audits', to: '/audits' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-teal-600">CSR-kive</h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50',
                  isActive && 'bg-teal-50 text-teal-600 border-r-4 border-teal-600'
                )
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;