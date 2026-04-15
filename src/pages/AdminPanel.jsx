import React from 'react';
import { 
  Settings, 
  Users, 
  Building2, 
  ShieldAlert, 
  History, 
  Global, 
  BellRing,
  Database,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    const sections = [
        { 
            title: 'System Configuration',
            items: [
                { icon: Building2, label: 'Company Profile', desc: 'Manage basic info, logos, and contacts.', path: '/setup' },
                { icon: ShieldAlert, label: 'Role Permissions', desc: 'Define what each role can see and do.', path: '/users' },
                { icon: BellRing, label: 'Notification Settings', desc: 'Email, WhatsApp, and in-app alerts.', path: '#' },
            ]
        },
        { 
            title: 'Masters & Data',
            items: [
                { icon: Users, label: 'Employee Attributes', desc: 'Custom fields for employee master.', path: '#' },
                { icon: Database, label: 'Masters Management', desc: 'Branches, Departments, Designations.', path: '#' },
                { icon: History, label: 'Audit Logs', desc: 'Track all changes across the system.', path: '#' },
            ]
        }
    ];

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>Admin Control Center</h1>
                <p style={{ color: 'var(--text-muted)' }}>Global system settings, security, and administrative masters.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
                {sections.map((section, si) => (
                    <div key={si}>
                        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {section.title}
                        </h3>
                        {section.items.map((item, ii) => (
                            <Link key={ii} to={item.path} style={{ textDecoration: 'none' }}>
                                <motion.div 
                                    whileHover={{ x: 10, backgroundColor: 'var(--surface)' }}
                                    className="card" 
                                    style={{ 
                                        padding: '20px', 
                                        marginBottom: '16px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '20px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ width: '40px', height: '40px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <item.icon size={20} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: 0, fontSize: '1rem' }}>{item.label}</h4>
                                        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                                    </div>
                                    <ChevronRight size={18} color="var(--border)" />
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>

            {/* System Status Banner */}
            <div className="card" style={{ marginTop: '32px', background: 'var(--secondary)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
                    <div>
                        <p style={{ margin: 0, fontWeight: 600 }}>System Status: Operational</p>
                        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>All modules are running smoothly. Database sync active.</p>
                    </div>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
                    v1.0.4-stable
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
