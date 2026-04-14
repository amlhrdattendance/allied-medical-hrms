import React from 'react';

const CompanySetup = () => {
  return (
    <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Top Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', padding: '0 16px' }}>
        <Tab label="Company" active />
        <Tab label="PF" />
        <Tab label="ESI" />
        <Tab label="PT" />
        <Tab label="LWF" />
        <Tab label="Establishment Details" />
      </div>

      {/* Form Content Area */}
      <div style={{ padding: '24px', display: 'flex', gap: '32px', flex: 1, overflowY: 'auto' }}>
        
        {/* Left Column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <InputGroup label="Company Name *" value="Allied Medical Limited" placeholder="Enter Company Name" />
          <InputGroup label="Date of Establishment" placeholder="Establish Date" type="date" />
          <InputGroup label="CIN/LPIN" value="L27100MH1907PLC000260" icon="i" />
          <InputGroup label="TAN" value="RAJA99999B" icon="i" />
          <InputGroup label="Website" value="https://alliedmed.co.in/" />
        </div>

        {/* Middle Column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <InputGroup label="Address 1 *" value="Plot No 76-77, Udyog Vihar, Phase IV, Gurugram, 122005" />
          <InputGroup label="Address 2" placeholder="Area / Street Name / City" />
          <InputGroup label="Address 3" placeholder="District / State" />
          <InputGroup label="Phone 1 *" value="8368372352" />
          <InputGroup label="Phone 2" placeholder="99XXXXX99" />
          
          <div style={{ marginTop: '10px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e293b' }}>Note: This ShortName will be used in ESS Login URL</span>
            <InputGroup label="Company Short Name" placeholder="Short Name" icon="i" style={{ marginTop: '8px' }}/>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Only alphanumeric & lowercase, no special character is allowed, max 10 Char</span>
          </div>
        </div>

        {/* Right Applicability Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: '#1e293b' }}>Applicable</h3>
            <ToggleRow label="PF ( Provident Fund )" active />
            <ToggleRow label="ESI ( Employee State Insurance )" active />
            <ToggleRow label="PT ( Professional Tax )" active />
            <ToggleRow label="TDS ( Tax Deducted at Source )" active />
            <ToggleRow label="TDS efiling Mar to Feb" subtext="i" inactive />
            <ToggleRow label="LWF ( Labour Welfare Fund )" active />
          </div>

          <div style={{ border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '16px', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '8px', right: '8px', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>| remove</div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#1e293b', textAlign: 'left' }}>Company Logo</h3>
            <img src="https://alliedmed.co.in/wp-content/uploads/2021/04/allied-logo.png" alt="Allied Logo" style={{ maxWidth: '100%', height: 'auto', marginBottom: '12px' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#f59e0b', fontSize: '0.8rem', fontWeight: 600 }}>
              <span>⚠️ Max.Size 1 MB</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
            <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
              💾 Save
            </button>
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
    fontSize: '0.9rem',
    borderBottom: active ? '2px solid #2563eb' : '2px solid transparent',
    cursor: 'pointer'
  }}>
    {label}
  </div>
);

const InputGroup = ({ label, value, placeholder, type = "text", icon, style }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', ...style }}>
    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#334155' }}>{label}</label>
    <div style={{ position: 'relative' }}>
      <input 
        type={type} 
        value={value} 
        placeholder={placeholder}
        style={{ 
          width: '100%', 
          padding: '10px 12px', 
          border: '1px solid #cbd5e1', 
          borderRadius: '6px', 
          fontSize: '0.85rem',
          color: '#1e293b',
          boxSizing: 'border-box'
        }} 
        readOnly={!!value}
      />
      {icon && <span style={{ position: 'absolute', right: '12px', top: '10px', color: '#94a3b8', border: '1px solid #cbd5e1', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>{icon}</span>}
    </div>
  </div>
);

const ToggleRow = ({ label, active, subtext, inactive }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
    <span style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
      {label} {subtext && <span style={{ border: '1px solid #cbd5e1', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>{subtext}</span>}
    </span>
    <div style={{ 
      width: '36px', 
      height: '20px', 
      background: inactive ? '#e2e8f0' : '#bae6fd', 
      borderRadius: '10px', 
      position: 'relative',
      cursor: 'pointer'
    }}>
      <div style={{ 
        width: '16px', 
        height: '16px', 
        background: inactive ? '#94a3b8' : '#3b82f6', 
        borderRadius: '50%', 
        position: 'absolute', 
        top: '2px', 
        left: inactive ? '2px' : '18px',
        transition: 'all 0.2s'
      }} />
    </div>
  </div>
);

export default CompanySetup;
