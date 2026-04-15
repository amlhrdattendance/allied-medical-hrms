import React, { useState } from 'react';
  import { 
    LayoutDashboard, 
    Users, 
    CalendarCheck, 
    CalendarClock, 
    Wallet, 
    Settings, 
    LogOut,
    Menu,
    X,
    ChevronRight,
    Search,
    Bell
  } from 'lucide-react';
  import { Link, useLocation } from 'react-router-dom';
  import { motion, AnimatePresence } from 'framer-motion';

  const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
      { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/employees', icon: Users, label: 'Employee Master' },
      { path: '/attendance', icon: CalendarCheck, label: 'Attendance' },
      { path: '/leave', icon: CalendarClock, label: 'Leave Management' },
      { path: '/payroll', icon: Wallet, label: 'Payroll' },
      { path: '/admin', icon: Settings, label: 'Admin Panel' },
    ];

    return (
      <motion.div 
        animate={{ width: isCollapsed ? '80px' : '280px' }}
        style={{
          height: '100vh',
          backgroundColor: 'var(--secondary)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 50,
          boxShadow: '4px 0 10px rgba(0,0,0,0.1)'
        }}
      >
        {/* Logo Section */}
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between' }}>
          {!isCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '18px' }}>AS</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.5px' }}>Ape Self</span>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, padding: '0 16px', marginTop: '20px' }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                style={{ textDecoration: 'none' }}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    marginBottom: '8px',
                    color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                    backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <item.icon size={20} />
                  {!isCollapsed && <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{item.label}</span>}
                  {isActive && !isCollapsed && (
                    <motion.div 
                      layoutId="activeIndicator"
                      style={{ position: 'absolute', right: '16px' }}
                    >
                      <ChevronRight size={14} />
                    </motion.div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Footer / User Profile */}
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            padding: '12px',
            borderRadius: '16px'
          }}>
            <div style={{ width: '36px', height: '36px', background: '#cbd5e1', borderRadius: '10px' }} />
            {!isCollapsed && (
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem', color: 'white' }}>Super Admin</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textOverflow: 'ellipsis', overflow: 'hidden' }}>admin@apeself.com</p>
              </div>
            )}
            {!isCollapsed && <LogOut size={16} style={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }} />}
          </div>
        </div>
      </motion.div>
    );
  };

  const Topbar = () => (
    <div style={{
      height: '70px',
      backgroundColor: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      <div style={{ position: 'relative', width: '300px' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Global Search..." 
          className="input-field"
          style={{ paddingLeft: '40px', borderRadius: '30px', background: 'var(--background)' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          background: 'var(--background)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative'
        }}>
          <Bell size={20} color="var(--text-muted)" />
          <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--danger)', border: '2px solid var(--surface)' }} />
        </div>
        
        <div style={{ height: '24px', width: '1px', background: 'var(--border)' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Ape Self Co.</span>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>HQ</div>
        </div>
      </div>
    </div>
  );

  const Layout = ({ children }) => {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Topbar />
          <main style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    );
  };

  export default Layout;
