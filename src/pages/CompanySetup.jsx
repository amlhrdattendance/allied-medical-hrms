import React, { useState, useEffect } from 'react';

const CompanySetup = () => {

  const [formData, setFormData] = useState({
    companyName: '',
    dateEstablished: '',
    cinLpin: '',
    tan: '',
    website: '',
    address1: '',
    address2: '',
    address3: '',
    phone1: '',
    phone2: '',
    shortName: '',
    pfEnabled: true,
    esiEnabled: true,
    ptEnabled: true,
    tdsEnabled: false,
    lwfEnabled: true
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Hydrate from Real Backend
    fetch('/api/company/setup')
      .then(res => res.json())
      .then(json => {
        if (json.data) {
          setFormData(json.data);
        }
      })
      .catch(e => console.log('Backend not active yet'));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleToggle = (key) => {
    setFormData(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const executeSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/company/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if(result.success) {
        alert("✅ Real HRMS Data Saved via Prisma Database!");
      }
    } catch(err) {
      alert("Error: Backend disconnected");
    } finally {
      setIsSaving(false);
    }
  };

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
          <InputGroup label="Company Name *" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter Company Name" />
          <InputGroup label="Date of Establishment" name="dateEstablished" value={formData.dateEstablished || ''} onChange={handleChange} placeholder="Establish Date" type="date" />
          <InputGroup label="CIN/LPIN" name="cinLpin" value={formData.cinLpin || ''} onChange={handleChange} icon="i" />
          <InputGroup label="TAN" name="tan" value={formData.tan || ''} onChange={handleChange} icon="i" />
          <InputGroup label="Website" name="website" value={formData.website || ''} onChange={handleChange} />
        </div>

        {/* Middle Column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <InputGroup label="Address 1 *" name="address1" value={formData.address1 || ''} onChange={handleChange} placeholder="Line 1" />
          <InputGroup label="Address 2" name="address2" value={formData.address2 || ''} onChange={handleChange} placeholder="Area / Street Name / City" />
          <InputGroup label="Address 3" name="address3" value={formData.address3 || ''} onChange={handleChange} placeholder="District / State" />
          <InputGroup label="Phone 1 *" name="phone1" value={formData.phone1 || ''} onChange={handleChange} />
          <InputGroup label="Phone 2" name="phone2" value={formData.phone2 || ''} onChange={handleChange} placeholder="99XXXXX99" />
          
          <div style={{ marginTop: '10px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e293b' }}>Note: This ShortName will be used in ESS Login URL</span>
            <InputGroup label="Company Short Name" name="shortName" value={formData.shortName || ''} onChange={handleChange} placeholder="Short Name" icon="i" style={{ marginTop: '8px' }}/>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Only alphanumeric & lowercase, no special character is allowed, max 10 Char</span>
          </div>
        </div>

        {/* Right Applicability Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: '#1e293b' }}>Applicable</h3>
            <ToggleRow label="PF ( Provident Fund )" active={formData.pfEnabled} onToggle={() => handleToggle('pfEnabled')} />
            <ToggleRow label="ESI ( Employee State Insurance )" active={formData.esiEnabled} onToggle={() => handleToggle('esiEnabled')} />
            <ToggleRow label="PT ( Professional Tax )" active={formData.ptEnabled} onToggle={() => handleToggle('ptEnabled')} />
            <ToggleRow label="TDS ( Tax Deducted at Source )" active={formData.tdsEnabled} onToggle={() => handleToggle('tdsEnabled')} />
            <ToggleRow label="LWF ( Labour Welfare Fund )" active={formData.lwfEnabled} onToggle={() => handleToggle('lwfEnabled')} />
          </div>

          <div style={{ border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '16px', textAlign: 'center', position: 'relative' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#1e293b', textAlign: 'left' }}>Company Logo</h3>
            <div style={{ background: '#f1f5f9', width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', color: '#94a3b8', fontSize: '0.8rem' }}>Upload Allied HRMS Logo image here</div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
            <button onClick={executeSave} disabled={isSaving} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', opacity: isSaving ? 0.7 : 1 }}>
              {isSaving ? 'Saving to Database...' : '💾 Save Data'}
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

const InputGroup = ({ label, name, value, onChange, placeholder, type = "text", icon, style }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', ...style }}>
    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#334155' }}>{label}</label>
    <div style={{ position: 'relative' }}>
      <input 
        type={type}
        name={name}
        value={value} 
        onChange={onChange}
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
      />
      {icon && <span style={{ position: 'absolute', right: '12px', top: '10px', color: '#94a3b8', border: '1px solid #cbd5e1', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>{icon}</span>}
    </div>
  </div>
);

const ToggleRow = ({ label, active, onToggle, subtext }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
    <span style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
      {label} {subtext && <span style={{ border: '1px solid #cbd5e1', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>{subtext}</span>}
    </span>
    <div onClick={onToggle} style={{ 
      width: '36px', 
      height: '20px', 
      background: !active ? '#e2e8f0' : '#bae6fd', 
      borderRadius: '10px', 
      position: 'relative',
      cursor: 'pointer'
    }}>
      <div style={{ 
        width: '16px', 
        height: '16px', 
        background: !active ? '#94a3b8' : '#3b82f6', 
        borderRadius: '50%', 
        position: 'absolute', 
        top: '2px', 
        left: !active ? '2px' : '18px',
        transition: 'all 0.2s'
      }} />
    </div>
  </div>
);

export default CompanySetup;
