import React, { useState } from 'react';
import { 
  Wallet, 
  FileCheck, 
  Download, 
  ArrowUpRight,
  Calculator,
  ShieldCheck,
  UserCheck,
  Printer
} from 'lucide-react';
import { motion } from 'framer-motion';

const Payroll = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    const stats = [
        { label: 'Total Net Pay', value: '₹38.4L', icon: Wallet, change: '+5.4%' },
        { label: 'Total Deductions', value: '₹4.2L', icon: Calculator, change: '+2.1%' },
        { label: 'Statutory (PF/ESI)', value: '₹2.8L', icon: ShieldCheck, change: '+0.5%' },
        { label: 'Active Employees', value: '1,240', icon: UserCheck, change: '+8' },
    ];

    const pastCycles = [
        { month: 'March 2026', processedOn: '2026-04-01', totalAmount: '38,10,000', status: 'Completed' },
        { month: 'February 2026', processedOn: '2026-03-01', totalAmount: '37,85,000', status: 'Completed' },
        { month: 'January 2026', processedOn: '2026-02-01', totalAmount: '37,40,000', status: 'Completed' },
    ];

    const handleProcessPayroll = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            alert("Payroll processed successfully for April 2026!");
        }, 3000);
    };

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>Payroll Module</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Configure salary structures, process monthly payroll, and manage statutory compliance.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-secondary"><Printer size={18} /> Print Summaries</button>
                    <button className="btn btn-primary" onClick={handleProcessPayroll} disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Process April 2026 Payroll"}
                    </button>
                </div>
            </div>

            {/* Payroll Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ padding: '8px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '8px' }}>
                                <stat.icon size={20} />
                            </div>
                            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>{stat.label}</span>
                        </div>
                        <h2 style={{ fontSize: '1.5rem', margin: '0 0 8px' }}>{stat.value}</h2>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>{stat.change} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>from last month</span></span>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                {/* Past Cycles */}
                <div className="card" style={{ padding: 0 }}>
                    <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FileCheck size={20} color="var(--primary)" />
                        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Past Payroll Cycles</h3>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: 'var(--background)' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Period</th>
                                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Processed On</th>
                                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Amount</th>
                                <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastCycles.map((cycle, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '16px 24px', fontWeight: 600 }}>{cycle.month}</td>
                                    <td style={{ padding: '16px 24px', fontSize: '0.9rem' }}>{cycle.processedOn}</td>
                                    <td style={{ padding: '16px 24px', fontSize: '0.9rem' }}>₹{cycle.totalAmount}</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <button className="btn btn-ghost" style={{ padding: '4px 8px' }}>
                                            <Download size={16} /> Payslips
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Statutory Rules Card */}
                <div className="card">
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '24px' }}>Statutory Rules</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <RuleItem label="Provident Fund (PF)" value="12% of Basic" cap="Max ₹1,800/month" color="var(--primary)" />
                        <RuleItem label="ESI" value="3.25% of Gross" cap="Gross < ₹21,000" color="var(--accent)" />
                        <RuleItem label="Professional Tax" value="Matrix-based" cap="As per State" color="var(--warning)" />
                        <RuleItem label="TDS (Income Tax)" value="Auto-calc" cap="As per IT Slab" color="var(--danger)" />
                    </div>
                    <button className="btn btn-secondary" style={{ width: '100%', marginTop: '32px' }}>Configure Formulas</button>
                </div>
            </div>
        </div>
    );
};

const RuleItem = ({ label, value, cap, color }) => (
    <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ width: '4px', background: color, borderRadius: '2px', flexShrink: 0 }} />
        <div>
            <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>{label}</p>
            <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{value} <span style={{ fontSize: '0.75rem', background: 'var(--background)', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>{cap}</span></p>
        </div>
    </div>
);

export default Payroll;
