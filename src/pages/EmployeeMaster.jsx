import React, { useState } from 'react';
import { UserPlus, Calendar, Shield, Share2, Search, PlusCircle } from 'lucide-react';

const EmployeeMaster = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [isSaving, setIsSaving] = useState(false);

  // Form State matches Prisma schema exactly
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Male',
    dob: '',
    dateOfJoining: '',
    probationEnd: '',
    confirmationDate: '',
    panNumber: '',
    uanNumber: '',
    bankAccount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.firstName) {
      alert("First Name is required!");
      return;
    }
    
    setIsSaving(true);
    try {
      const res = await fetch('http://localhost:3001/api/onboarding/employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        alert(`✅ Employee Onboarded Successfully!\nAssigned ID: ${data.data.employeeCode}`);
        setFormData({
            firstName: '', lastName: '', email: '', phone: '', gender: 'Male', dob: '',
            dateOfJoining: '', probationEnd: '', confirmationDate: '',
            panNumber: '', uanNumber: '', bankAccount: ''
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch(err) {
      alert("Backend API is disconnected.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderTabIcon = (name) => {
    switch(name) {
      case 'General': return <UserPlus size={16} />;
      case 'Employment Dates': return <Calendar size={16} />;
      case 'Statutory Limits': return <Shield size={16} />;
      case 'Relational Mapping': return <Share2 size={16} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Inter, sans-serif' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>Employee Master</h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0 0' }}>Register and map structural constraints for new employees.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#cbd5e1' }} />
                <input type="text" placeholder="Search Master..." style={{ padding: '8px 12px 8px 30px', borderRadius: '4px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '0.85rem' }} />
            </div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* Left Side: Wizard Navigation */}
        <div style={{ width: '250px', background: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '24px 16px' }}>
          {['General', 'Employment Dates', 'Statutory Limits', 'Relational Mapping'].map(tab => (
            <div 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderRadius: '6px',
                cursor: 'pointer', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 500,
                background: activeTab === tab ? '#eff6ff' : 'transparent',
                color: activeTab === tab ? '#2563eb' : '#475569',
                borderLeft: activeTab === tab ? '4px solid #2563eb' : '4px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              {renderTabIcon(tab)} {tab}
            </div>
          ))}
        </div>

        {/* Right Side: Form View */}
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
            {activeTab === 'General' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <Input name="firstName" label="First Name *" value={formData.firstName} onChange={handleChange} placeholder="e.g. John" />
                    <Input name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} placeholder="e.g. Doe" />
                    <Input name="email" label="Official Email" value={formData.email} onChange={handleChange} type="email" placeholder="john.doe@alliedmed.co.in" />
                    <Input name="phone" label="Mobile Number" value={formData.phone} onChange={handleChange} placeholder="+91 9999999999" />
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#334155' }}>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} style={inputStyles}>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                    
                    <Input name="dob" label="Date of Birth" value={formData.dob} onChange={handleChange} type="date" />
                </div>
            )}

            {activeTab === 'Employment Dates' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <Input name="dateOfJoining" label="Date of Joining" value={formData.dateOfJoining} onChange={handleChange} type="date" />
                    <Input name="probationEnd" label="Probation End Date" value={formData.probationEnd} onChange={handleChange} type="date" />
                    <Input name="confirmationDate" label="Final Confirmation Date" value={formData.confirmationDate} onChange={handleChange} type="date" />
                </div>
            )}

            {activeTab === 'Statutory Limits' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <Input name="panNumber" label="PAN Number" value={formData.panNumber} onChange={handleChange} placeholder="ABCDE1234F" />
                    <Input name="uanNumber" label="UAN Number (PF)" value={formData.uanNumber} onChange={handleChange} placeholder="100XXXXXXXXX" />
                    <Input name="bankAccount" label="Bank Account Details" value={formData.bankAccount} onChange={handleChange} placeholder="Acct No / IFSC" />
                </div>
            )}

            {activeTab === 'Relational Mapping' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '16px', borderRadius: '6px', fontSize: '0.85rem', color: '#991b1b' }}>
                        <strong>Awaiting Setup Validation:</strong> Before assigning Branch or Department IDs, you must configure the Global Master List in the 'Group of Company' config area.
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', opacity: 0.5, pointerEvents: 'none' }}>
                        <Input label="Assigned Branch" value="Pending Master Creation" readOnly={true} />
                        <Input label="Assigned Department" value="Pending Master Creation" readOnly={true} />
                    </div>
                </div>
            )}

            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  onClick={handleSave} 
                  disabled={isSaving}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#10b981', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', opacity: isSaving ? 0.7 : 1 }}
                >
                  <PlusCircle size={16} /> 
                  {isSaving ? "Saving Master Record..." : "Onboard Employee"}
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

const inputStyles = { 
    width: '100%', 
    padding: '10px 12px', 
    border: '1px solid #cbd5e1', 
    borderRadius: '6px', 
    fontSize: '0.85rem',
    color: '#1e293b',
    boxSizing: 'border-box'
};

const Input = ({ label, name, value, onChange, placeholder, type = "text", readOnly = false }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#334155' }}>{label}</label>
    <input 
      type={type} name={name} value={value} onChange={onChange}
      placeholder={placeholder} style={inputStyles} readOnly={readOnly}
    />
  </div>
);

export default EmployeeMaster;
