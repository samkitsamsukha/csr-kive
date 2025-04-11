import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import Employees from './components/admin/Employees';
import Leaderboard from './components/admin/Leaderboard';
import EventDetails from './components/admin/EventDetails';
import EmployeeDetails from './components/admin/EmployeeDetails';
import CreateEvent from './components/admin/CreateEvent';
import { mockData } from './data/mockData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard adminData={mockData} />} />
          <Route path="employees" element={<Employees employees={mockData.employees} />} />
          <Route path="employees/:id" element={<EmployeeDetails employees={mockData.employees} />} />
          <Route path="leaderboard" element={<Leaderboard employees={mockData.employees} />} />
          <Route path="events/create" element={<CreateEvent />} />
          <Route path="events/:id" element={<EventDetails events={mockData.events} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;