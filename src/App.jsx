import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';
import CompanySetup from './pages/CompanySetup';
import UserManagement from './pages/UserManagement';
import EmployeeMaster from './pages/EmployeeMaster';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          {/* As soon as Super Admin logs in, they hit the Setup Flow */}
          <Route path="/" element={<Navigate to="/setup/company" replace />} />
          <Route path="/setup/company" element={<CompanySetup />} />
          <Route path="/user-management/roles" element={<UserManagement />} />
          <Route path="/onboard" element={<EmployeeMaster />} />
          
          {/* Fallbacks for other sidebar links shown in mockup */}
          <Route path="*" element={<div style={{ padding: '20px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}><h2>Construction Mode</h2><p>This module is pending build in the 'One-by-One' execution strategy.</p></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
