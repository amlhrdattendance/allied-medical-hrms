import React, { useState } from 'react';
import { 
  CalendarClock, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Clock,
  History,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LeaveManagement = () => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const balances = [
    { type: 'Casual Leave (CL)', allocated: 12, balance: 8.5, color: '#4f46e5' },
    { type: 'Earned Leave (EL)', allocated: 24, balance: 18, color: '#10b981' },
    { type: 'Sick Leave (SL)', allocated: 10, balance: 6, color: '#f59e0b' },
  ];

  const recentRequests = [
    { id: '1', type: 'EL', from: '2026-04-20', to: '2026-04-22', days: 3, status: 'Approved', reason: 'Family function' },
    { id: '2', type: 'CL', from: '2026-04-10', to: '2026-04-10', days: 1, status: 'Rejected', reason: 'Critical project delivery' },
    { id: '3', type: 'SL', from: '2026-03-25', to: '2026-03-25', days: 1, status: 'Approved', reason: 'Medical appointment' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>Leave Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Apply for leave, check balances, and track approval status.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowApplyModal(true)}>
          <Plus size={20} /> Apply for Leave
        </button>
      </div>

      {/* Leave Balances */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {balances.map((leave, i) => (
          <div key={i} className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{leave.type}</span>
              <CalendarClock size={20} style={{ color: leave.color }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>{leave.balance}</h2>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>/ {leave.allocated} Days</span>
            </div>
            <div style={{ height: '8px', background: 'var(--background)', borderRadius: '4px', marginTop: '16px', position: 'relative', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(leave.balance / leave.allocated) * 100}%` }}
                style={{ height: '100%', background: leave.color, borderRadius: '4px' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* History Table */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <History size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Request History</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'var(--background)' }}>
              <tr>
                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Type</th>
                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Duration</th>
                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Days</th>
                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((req) => (
                <tr key={req.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 600 }}>{req.type}</td>
                  <td style={{ padding: '16px 24px', fontSize: '0.9rem' }}>{req.from} to {req.to}</td>
                  <td style={{ padding: '16px 24px', fontSize: '0.9rem' }}>{req.days} Day(s)</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
                      background: req.status === 'Approved' ? 'var(--accent-light)' : (req.status === 'Rejected' ? '#fee2e2' : 'var(--primary-light)'),
                      color: req.status === 'Approved' ? 'var(--accent)' : (req.status === 'Rejected' ? 'var(--danger)' : 'var(--primary)')
                    }}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Guidelines */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <FileText size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Guidelines</h3>
          </div>
          <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', marginTop: '6px', flexShrink: 0 }} />
              EL can be availed for a minimum of 3 days.
            </li>
            <li style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', marginTop: '6px', flexShrink: 0 }} />
              Applications must be submitted 48 hours in advance for planned leaves.
            </li>
            <li style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', marginTop: '6px', flexShrink: 0 }} />
              Medical certificate is mandatory for SL exceeding 2 days.
            </li>
          </ul>
        </div>
      </div>

      {/* Application Modal (Simple Backdrop for Demo) */}
      {showApplyModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card" style={{ width: '100%', maxWidth: '500px', padding: '32px' }}>
            <h3 style={{ marginBottom: '24px' }}>Apply for Leave</h3>
            <div className="input-group">
                <label className="input-label">Leave Type</label>
                <select className="input-field">
                    <option>Casual Leave (CL)</option>
                    <option>Earned Leave (EL)</option>
                    <option>Sick Leave (SL)</option>
                </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="input-group">
                    <label className="input-label">From Date</label>
                    <input type="date" className="input-field" />
                </div>
                <div className="input-group">
                    <label className="input-label">To Date</label>
                    <input type="date" className="input-field" />
                </div>
            </div>
            <div className="input-group">
                <label className="input-label">Reason</label>
                <textarea className="input-field" style={{ height: '100px', resize: 'none' }} placeholder="Please provide a brief reason..."></textarea>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setShowApplyModal(false)}>Submit Request</button>
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowApplyModal(false)}>Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;
