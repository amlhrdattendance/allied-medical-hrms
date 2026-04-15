import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const res = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Server connection failed. Is the backend running?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            padding: '20px'
        }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
                style={{ width: '100%', maxWidth: '440px', padding: '48px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ 
                        width: '64px', 
                        height: '64px', 
                        background: 'var(--primary)', 
                        borderRadius: '16px', 
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)'
                    }}>
                        <Lock color="white" size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 8px' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>HR Portal | Ape Self Company</p>
                </div>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ 
                            background: '#fef2f2', 
                            border: '1px solid #fee2e2', 
                            color: '#b91c1c',
                            padding: '12px',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            marginBottom: '24px',
                            textAlign: 'center'
                        }}
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label className="input-label">Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="text" 
                                className="input-field" 
                                style={{ paddingLeft: '40px' }}
                                placeholder="superadmin"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="input-field" 
                                style={{ paddingLeft: '40px', paddingRight: '44px' }}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                required
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ 
                                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', 
                                    background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' 
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ width: '100%', padding: '14px', marginTop: '12px' }}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Sign In to Dashboard"}
                    </button>
                </form>

                <div style={{ marginTop: '32px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        Protected by Ape Self Systems &copy; 2026
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
