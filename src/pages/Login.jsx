import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Users, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeRole, setActiveRole] = useState('Super Admin');

  // 1-Click Auto-Fill Demo Accounts
  const demoAccounts = {
    'Super Admin': { email: 'admin@alliedmed.co.in', pass: 'AlliedAdmin@2026' },
    'Admin (HR)': { email: 'hr@alliedmed.co.in', pass: 'HrPass@2026' },
    'Manager': { email: 'manager@alliedmed.co.in', pass: 'Manager@2026' },
    'Employee': { email: 'emp@alliedmed.co.in', pass: 'Emp@2026' }
  };

  const handleRoleSelect = (role) => {
    setActiveRole(role);
    setEmail(demoAccounts[role].email);
    setPassword(demoAccounts[role].pass);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${activeRole} with ${email}`);
    // Future: Route to Dashboard / HRMS Command Center
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="liquid-glass"
        style={{ width: '420px', padding: '40px', position: 'relative', overflow: 'hidden' }}
      >
        {/* Subtle top glare */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, hsla(240, 100%, 65%, 0.2), hsla(280, 100%, 65%, 0.2))', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', border: '1px solid rgba(255,255,255,0.1)' }}>
            <ShieldCheck size={32} color="#fff" />
          </div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.5px' }}>Allied Medical HRMS</h1>
          <p style={{ margin: '8px 0 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Enterprise Process Automation Engine</p>
        </div>

        {/* 1-Click Demo Section */}
        <div style={{ marginBottom: '25px' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>Quick Access (Demo)</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Object.keys(demoAccounts).map((role) => (
              <button 
                key={role} 
                className={`btn-role-tab ${activeRole === role ? 'active' : ''}`}
                onClick={() => handleRoleSelect(role)}
                type="button"
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'rgba(255,255,255,0.4)' }} />
            <input 
              type="email" 
              placeholder="Corporate Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingLeft: '44px' }}
              required 
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'rgba(255,255,255,0.4)' }} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingLeft: '44px' }}
              required 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '4px 0 12px 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: '14px', height: '14px', margin: 0 }} /> Remember me
            </label>
            <a href="#" style={{ fontSize: '0.85rem', color: 'hsla(280, 100%, 75%, 1)', textDecoration: 'none' }}>Forgot Password?</a>
          </div>

          <button type="submit" className="btn-premium" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            Secure Login <ArrowRight size={18} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
