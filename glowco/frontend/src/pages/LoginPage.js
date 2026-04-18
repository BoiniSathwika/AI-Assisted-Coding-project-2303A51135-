import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function AuthForm({ mode }) {
  const isLogin   = mode === 'login';
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login, signup } = useAuth();
  const [form, setForm]   = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      toast.error('Please fill in all fields'); return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await signup(form.name, form.email, form.password);
      }
      toast.success(isLogin ? 'Welcome back!' : `Welcome, ${form.name.split(' ')[0]}!`);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width: '100%', padding: '12px 14px', border: '1px solid var(--border)',
    borderRadius: 10, background: 'transparent', color: 'var(--text)',
    fontSize: 14, outline: 'none', boxSizing: 'border-box', marginTop: 6,
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, padding: '36px 32px', width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{ fontSize: 36 }}>🌸</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--text)', fontWeight: 400, marginTop: 8, marginBottom: 4 }}>
            {isLogin ? 'Welcome back' : 'Join GlowCo'}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>
            {isLogin ? 'Sign in to your account' : 'Create your free account'}
          </p>
        </div>

        {/* Demo hint */}
        <div style={{ background: 'var(--accent-light)', borderRadius: 8, padding: '9px 12px', marginBottom: 20, fontSize: 12, color: 'var(--muted)' }}>
          💡 Demo admin: <strong style={{ color: 'var(--text)' }}>admin@glowco.com</strong> / <strong style={{ color: 'var(--text)' }}>admin123</strong>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>Full Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={inp} />
            </div>
          )}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" style={inp} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>Password</label>
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" style={inp} />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', background: 'var(--accent)', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', padding: '13px', borderRadius: 24, fontWeight: 600, fontSize: 15, opacity: loading ? 0.7 : 1 }}>
            {loading ? '...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', marginTop: 20 }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <Link to={isLogin ? '/signup' : '/login'} style={{ color: 'var(--accent)', fontWeight: 600 }}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </div>
    </div>
  );
}

export function LoginPage()  { return <AuthForm mode="login" />; }
export function SignupPage() { return <AuthForm mode="signup" />; }
export default LoginPage;
