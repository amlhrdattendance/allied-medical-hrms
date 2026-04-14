import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Settings, UserPlus, Clock, DollarSign, FileBarChart, Building2, Bell, Search, HelpCircle, ChevronDown } from 'lucide-react';

const DashboardLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#f4f7f6', color: '#333', fontFamily: 'Inter, sans-serif' }}>
      
      {/* LEFT SIDEBAR */}
      <div style={{ width: '220px', backgroundColor: '#fff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
        
        {/* Logo Area */}
        <div style={{ height: '60px', display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ width: '24px', height: '24px', background: 'linear-gradient(135deg, #2563eb, #3b82f6, #60a5fa)', borderRadius: '4px', marginRight: '10px' }} />
          <span style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>Allied HRMS</span>
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />} label="Config" active />
          <NavItem to="/onboard" icon={<UserPlus size={18} />} label="OnBoard" />
          <NavItem to="/attendance" icon={<Clock size={18} />} label="T&A" />
          <NavItem to="/user-management/roles" icon={<UserPlus size={18} />} label="User Management" highlight />
          <NavItem to="/salary" icon={<DollarSign size={18} />} label="Salary" />
          <NavItem to="/reports" icon={<FileBarChart size={18} />} label="Reports" />
          
          <div style={{ height: '1px', background: '#e2e8f0', margin: '12px 0' }} />
          <NavItem to="/setup/company" icon={<Settings size={18} />} label="Company Settings" />
          <NavItem to="/group" icon={<Building2 size={18} />} label="Group of Company" />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* TOP NAVBAR */}
        <div style={{ height: '60px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
          
          {/* Left: Company Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>Allied Medical Limited</h2>
          </div>

          {/* Right: Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
            {/* Search Bar */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '6px 16px', color: '#64748b', fontSize: '0.85rem' }}>
              CTRL + Space to open Smart <Search size={14} style={{ marginLeft: '12px' }}/>
            </div>

            {/* Date Badge */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '4px 16px', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
              Mar/2026
            </div>

            <HelpCircle size={18} color="#64748b" style={{ cursor: 'pointer' }} />
            <Bell size={18} color="#64748b" style={{ cursor: 'pointer' }} />

            {/* Profile Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f0f9ff', padding: '6px 12px', borderRadius: '20px', border: '1px solid #bae6fd', cursor: 'pointer' }}>
              <div style={{ width: '20px', height: '20px', background: '#3b82f6', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600 }}>S</div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0369a1' }}>Superadmin</span>
            </div>

          </div>
        </div>

        {/* INJECTED PAGE CONTENT */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <Outlet />
        </div>

      </div>
    </div>
  );
};

// Sidebar Navigation Item Helper
const NavItem = ({ to, icon, label, active, highlight }) => {
  return (
    <NavLink 
      to={to} 
      style={({ isActive }) => ({
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        padding: '10px 14px', 
        borderRadius: '8px', 
        textDecoration: 'none', 
        color: (isActive || highlight) ? '#2563eb' : '#64748b',
        background: (isActive || highlight) ? '#eff6ff' : 'transparent',
        fontWeight: (isActive || highlight) ? 600 : 500,
        fontSize: '0.85rem',
        transition: 'all 0.2s ease'
      })}
    >
      <div style={{ color: highlight ? '#2563eb' : 'inherit' }}>{icon}</div>
      {label}
    </NavLink>
  );
};

export default DashboardLayout;
