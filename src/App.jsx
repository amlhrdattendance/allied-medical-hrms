import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import CompanySetup from './pages/CompanySetup';
import UserManagement from './pages/UserManagement';
import EmployeeMaster from './pages/EmployeeMaster';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import LeaveManagement from './pages/LeaveManagement';
import Payroll from './pages/Payroll';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Main Application Routes */}
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/employees" element={<Layout><EmployeeMaster /></Layout>} />
        <Route path="/attendance" element={<Layout><Attendance /></Layout>} />
        <Route path="/leave" element={<Layout><LeaveManagement /></Layout>} />
        <Route path="/payroll" element={<Layout><Payroll /></Layout>} />
        <Route path="/admin" element={<Layout><AdminPanel /></Layout>} />
        
        {/* Supporting Admin Routes */}
        <Route path="/setup" element={<Layout><CompanySetup /></Layout>} />
        <Route path="/users" element={<Layout><UserManagement /></Layout>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
