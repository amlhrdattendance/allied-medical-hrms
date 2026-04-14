import React from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

const UserManagement = () => {
  return (
    <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Top Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', padding: '0 16px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex' }}>
          <Tab label="Roles" active />
          <Tab label="Role Access Settings" />
          <Tab label="Employee" />
          <Tab label="User" />
          <Tab label="Assign Company To User" />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Internal Tab Search */}
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#cbd5e1' }} />
            <input type="text" placeholder="Search..." style={{ padding: '8px 12px 8px 30px', borderRadius: '4px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.85rem' }} disabled />
          </div>
          
          {/* Add Role Button */}
          <button style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <Plus size={16} /> Add Role Master
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '24px', flex: 1 }}>
        
        {/* Toggle Pills */}
        <div style={{ display: 'flex', marginBottom: '24px', background: '#f8fafc', padding: '4px', borderRadius: '6px', border: '1px solid #e2e8f0', width: 'fit-content' }}>
          <div style={{ background: '#bfdbfe', color: '#1d4ed8', padding: '6px 24px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>ESS</div>
          <div style={{ color: '#64748b', padding: '6px 24px', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}>Payroll</div>
        </div>

        {/* Data Table */}
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ display: 'flex', background: '#e0f2fe', padding: '12px 24px', fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>
            <div style={{ flex: 1 }}>Role Name</div>
            <div style={{ flex: 1, textAlign: 'center' }}>Module</div>
            <div style={{ width: '100px', textAlign: 'center' }}>Action</div>
          </div>
          
          {/* Row */}
          <div style={{ display: 'flex', borderTop: '1px solid #e2e8f0', padding: '16px 24px', fontSize: '0.85rem', color: '#334155', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>ESS</div>
            <div style={{ flex: 1, textAlign: 'center' }}>ESS</div>
            <div style={{ width: '100px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <Edit2 size={16} color="#94a3b8" style={{ cursor: 'pointer' }} />
              <Trash2 size={16} color="#ef4444" style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// UI Helpers
const Tab = ({ label, active }) => (
  <div style={{ 
    padding: '16px 20px', 
    color: active ? '#2563eb' : '#64748b', 
    fontWeight: active ? 600 : 500,
    fontSize: '0.85rem',
    borderBottom: active ? '2px solid #2563eb' : '2px solid transparent',
    cursor: 'pointer'
  }}>
    {label}
  </div>
);

export default UserManagement;
