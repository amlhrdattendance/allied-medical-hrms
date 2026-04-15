import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';

const Attendance = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    fetchAttendance();
    return () => clearInterval(timer);
  }, []);

  const fetchAttendance = async () => {
    // Placeholder: Fetch attendance for the current user/period
    const dummyData = [
      { date: '2026-04-15', clockIn: '09:05 AM', clockOut: '--:--', status: 'Present', late: true },
      { date: '2026-04-14', clockIn: '08:55 AM', clockOut: '06:10 PM', status: 'Present', late: false },
      { date: '2026-04-13', clockIn: '09:00 AM', clockOut: '06:05 PM', status: 'Present', late: false },
    ];
    setAttendanceData(dummyData);
  };

  const handleClockToggle = async () => {
    setIsLoading(true);
    try {
        const endpoint = isClockedIn ? 'clock-out' : 'clock-in';
        const res = await fetch(`/api/attendance/${endpoint}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ 
                employeeId: JSON.parse(localStorage.getItem('user'))?.employee?.id || 'admin-id',
                location: "Main Office, Delhi",
                ipAddress: "192.168.1.1"
            })
        });
        const result = await res.json();
        if (result.success) {
            setIsClockedIn(!isClockedIn);
            fetchAttendance();
        } else {
            alert(result.error);
        }
    } catch (err) {
        alert("Failed to clock in/out. Backend disconnected?");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>Time & Attendance</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track your work hours and manage attendance logs.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary"><Filter size={18} /> Filters</button>
          <button className="btn btn-secondary"><Download size={18} /> Export PDF</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        {/* Clock Control */}
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: 0, color: 'var(--secondary)' }}>
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '8px' }}>
              {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={handleClockToggle}
            disabled={isLoading}
            style={{ 
              width: '200px', height: '200px', borderRadius: '50%', border: 'none',
              background: isClockedIn ? 'var(--danger)' : 'var(--primary)',
              color: 'white', cursor: 'pointer', position: 'relative',
              boxShadow: isClockedIn ? '0 10px 40px rgba(239, 68, 68, 0.4)' : '0 10px 40px rgba(79, 70, 229, 0.4)',
              transition: 'all 0.4s ease'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Clock size={48} />
              <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{isClockedIn ? 'Clock Out' : 'Clock In'}</span>
            </div>
            {isClockedIn && <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem' }}>Active Session</motion.div>}
          </motion.button>

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}>
              <MapPin size={16} color="var(--primary)" />
              <span style={{ color: 'var(--text-muted)' }}>Work Location: Head Office</span>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Recent Logs</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'var(--background)' }}>
              <tr>
                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Date</th>
                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Clock In</th>
                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Clock Out</th>
                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 24px', fontSize: '0.9rem', fontWeight: 500 }}>{row.date}</td>
                  <td style={{ padding: '16px 24px', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {row.clockIn}
                      {row.late && <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--danger)', color: 'white', fontSize: '0.65rem', fontWeight: 600 }}>Late</span>}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '0.9rem' }}>{row.clockOut}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem' }}>
                      <CheckCircle2 size={16} /> {row.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <button className="btn btn-ghost">Load More Records</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
