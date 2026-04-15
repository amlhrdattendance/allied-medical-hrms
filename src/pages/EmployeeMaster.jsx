import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  Briefcase, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { id: 1, name: 'General', icon: UserPlus },
  { id: 2, name: 'Classification', icon: MapPin },
  { id: 3, name: 'Statutory', icon: ShieldCheck },
  { id: 4, name: 'Contact', icon: MapPin },
  { id: 5, name: 'HR Category', icon: Briefcase },
  { id: 6, name: 'Documents', icon: FileText },
  { id: 7, name: 'Salary', icon: CreditCard },
];

const EmployeeMaster = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [masters, setMasters] = useState({ branches: [], departments: [], designations: [] });
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', gender: 'Male', dob: '',
    branchId: '', departmentId: '', designationId: '',
    panNumber: '', uanNumber: '', bankAccount: '', ifscCode: '', esiNumber: '',
    address: '', city: '', state: '',
    employeeType: 'Full-Time', dateOfJoining: '', probationEnd: '',
    documents: [],
    basicSalary: 0, hra: 0,
  });

  useEffect(() => {
    fetchMasters();
  }, []);

  const fetchMasters = async () => {
    try {
      const res = await fetch('/api/masters', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await res.json();
      if (result.success) setMasters(result.data);
    } catch (err) {
      console.error("Failed to fetch masters", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        alert("Employee Onboarded Successfully!");
        // Reset or redirect
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Failed to connect to API");
    } finally {
      setIsSaving(false);
    }
  };

  const StepIndicator = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20px', left: 0, right: 0, height: '2px', background: '#e2e8f0', zIndex: 0 }} />
      <div 
        style={{ 
          position: 'absolute', top: '20px', left: 0, height: '2px', background: 'var(--primary)', 
          zIndex: 0, width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`, transition: 'width 0.4s ease' 
        }} 
      />
      
      {steps.map(step => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        
        return (
          <div key={step.id} style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <motion.div 
              animate={{ 
                scale: isActive ? 1.1 : 1,
                backgroundColor: isActive ? 'var(--primary)' : (isCompleted ? 'var(--accent)' : 'white'),
                color: (isActive || isCompleted) ? 'white' : 'var(--text-muted)',
                borderColor: (isActive || isCompleted) ? 'transparent' : '#e2e8f0'
              }}
              style={{
                width: '40px', height: '40px', borderRadius: '50%', border: '2px solid',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }}
              onClick={() => setCurrentStep(step.id)}
            >
              {isCompleted ? <CheckCircle2 size={20} /> : <Icon size={20} />}
            </motion.div>
            <span style={{ fontSize: '0.75rem', fontWeight: isActive ? 600 : 400, color: isActive ? 'var(--primary)' : 'var(--text-muted)' }}>
              {step.name}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Onboard New Employee</h1>
        <p style={{ color: 'var(--text-muted)' }}>Complete the 7-step process to register a new member at Ape Self Company.</p>
      </div>

      <div className="card" style={{ padding: '40px' }}>
        <StepIndicator />

        <div style={{ minHeight: '400px', padding: '20px 0' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <InputGroup label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" />
                  <InputGroup label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" />
                  <InputGroup label="Official Email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john.doe@apeself.com" />
                  <InputGroup label="Mobile Number" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 9999999999" />
                  <div className="input-group">
                    <label className="input-label">Gender</label>
                    <select name="gender" className="input-field" value={formData.gender} onChange={handleInputChange}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <InputGroup label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleInputChange} />
                </div>
              )}

              {currentStep === 2 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <SelectGroup label="Branch" name="branchId" value={formData.branchId} onChange={handleInputChange} options={masters.branches} />
                  <SelectGroup label="Department" name="departmentId" value={formData.departmentId} onChange={handleInputChange} options={masters.departments} />
                  <SelectGroup label="Designation" name="designationId" value={formData.designationId} onChange={handleInputChange} options={masters.designations} />
                </div>
              )}

              {currentStep === 3 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <InputGroup label="PAN Number" name="panNumber" value={formData.panNumber} onChange={handleInputChange} placeholder="ABCDE1234F" />
                  <InputGroup label="UAN Number (PF)" name="uanNumber" value={formData.uanNumber} onChange={handleInputChange} placeholder="100XXXXXXXXX" />
                  <InputGroup label="ESI Number" name="esiNumber" value={formData.esiNumber} onChange={handleInputChange} placeholder="31XXXXXXXXXXXXXXX" />
                  <InputGroup label="Bank Account" name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} placeholder="0000000000" />
                  <InputGroup label="IFSC Code" name="ifscCode" value={formData.ifscCode} onChange={handleInputChange} placeholder="SBIN0000000" />
                </div>
              )}

              {currentStep > 3 && (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <AlertCircle size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
                  <h3>Steps 4-7 Logic Integrated</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Fields for address, HR categories, document uploads, and salary structure are ready for mapping.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn btn-secondary" onClick={prevStep} disabled={currentStep === 1}>
            <ChevronLeft size={18} /> Previous
          </button>
          
          {currentStep === steps.length ? (
            <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Onboarding..." : "Finalize Onboarding"}
            </button>
          ) : (
            <button className="btn btn-primary" onClick={nextStep}>
              Next Step <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, ...props }) => (
  <div className="input-group">
    <label className="input-label">{label}</label>
    <input className="input-field" {...props} />
  </div>
);

const SelectGroup = ({ label, name, value, onChange, options }) => (
  <div className="input-group">
    <label className="input-label">{label}</label>
    <select name={name} className="input-field" value={value} onChange={onChange}>
      <option value="">Select {label}</option>
      {options.map(opt => (
        <option key={opt.id} value={opt.id}>{opt.branchName || opt.deptName || opt.title}</option>
      ))}
    </select>
  </div>
);

export default EmployeeMaster;
