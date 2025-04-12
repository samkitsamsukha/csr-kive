import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import Employees from './components/admin/Employees';
import Leaderboard from './components/admin/Leaderboard';
import EventDetails from './components/admin/EventDetails';
import EmployeeDetails from './components/admin/EmployeeDetails';
import CreateEvent from './components/admin/CreateEvent';
import Audits from './components/admin/Audits';
import { mockData } from './data/mockData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<Employees  />} />
          <Route path="employees/:id" element={<EmployeeDetails  />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="events/create" element={<CreateEvent />} />
          <Route path="events/:id" element={<EventDetails/>} />
          <Route path="audits" element={<Audits />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;