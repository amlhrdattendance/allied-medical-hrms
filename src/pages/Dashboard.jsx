import React from 'react';
import { 
  Users, 
  Clock, 
  Calendar, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const stats = [
    { label: 'Total Strength', value: '1,248', icon: Users, change: '+12%', positive: true },
    { label: 'Present Today', value: '1,102', icon: Clock, change: '-2%', positive: false },
    { label: 'Pending Leaves', value: '24', icon: Calendar, change: '+5', positive: false },
    { label: 'Monthly Payroll', value: '₹42.8L', icon: TrendingUp, change: '+8%', positive: true },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>Executive Overview</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back, Admin. Here's what's happening at Ape Self Company today.</p>
        </div>
        <button className="btn btn-primary">Generate Reports</button>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5 }}
            className="card" 
            style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={24} />
              </div>
              <MoreVertical size={20} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
            </div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>{stat.label}</p>
              <h2 style={{ margin: '8px 0', fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: stat.positive ? 'var(--accent)' : 'var(--danger)' }}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span style={{ fontWeight: 600 }}>{stat.change}</span>
                <span style={{ color: 'var(--text-muted)' }}>vs last month</span>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: stat.positive ? 'var(--accent)' : 'var(--danger)', opacity: 0.1 }} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Areas */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Attendance Trends (Placeholder for Chart) */}
        <div className="card" style={{ minHeight: '400px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Daily Attendance Trends</h3>
            <select className="input-field" style={{ width: 'auto', padding: '6px 12px' }}>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div style={{ height: '300px', background: 'var(--background)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border)' }}>
            <p style={{ color: 'var(--text-muted)' }}>Live Charting Interface Initializing...</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '24px' }}>Recent Activities</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-light)', flexShrink: 0 }} />
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500 }}>New Employee Onboarded</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>John Doe joined the IT Department.</p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600 }}>2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-ghost" style={{ width: '100%', marginTop: '32px' }}>View All Logs</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
