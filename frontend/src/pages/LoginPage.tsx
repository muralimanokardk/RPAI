import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authApi.login({ email, password });
      login(res.access_token, res.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid login credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between py-10 px-4">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Card Header Logo */}
        <div className="flex justify-center">
          <Logo size="lg" showText={false} />
        </div>

        {/* Card Box */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-xs text-slate-500">Elevating academic excellence through intelligence</p>
          </div>

          {/* Social OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => alert("Google OAuth configured via Client ID in backend settings.")}
              className="flex items-center justify-center gap-2 border border-slate-200 py-2.5 rounded-2xl text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => alert("Apple OAuth configured via Client ID in backend settings.")}
              className="flex items-center justify-center gap-2 border border-slate-200 py-2.5 rounded-2xl text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              <svg className="w-4 h-4 fill-slate-900" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.12-1.95.99-3.09-.97.04-2.15.65-2.85 1.47-.62.72-1.16 1.88-1.01 3.01 1.08.08 2.2-.57 2.87-1.39z"/></svg>
              Apple
            </button>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[10px] uppercase tracking-widest text-slate-400 font-semibold absolute">
              OR CONTINUE WITH EMAIL
            </span>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-2xl text-xs flex items-center gap-2 border border-red-100">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Academic Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-brand-600 font-semibold hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-10 py-3 text-xs focus:outline-none focus:border-brand-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-md shadow-brand-500/25 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-600 font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>

      <div className="text-center text-[10px] text-slate-400 space-x-4 pt-6">
        <a href="#privacy" className="hover:underline">Privacy Policy</a>
        <span>•</span>
        <a href="#terms" className="hover:underline">Terms of Service</a>
        <span>•</span>
        <a href="#ethics" className="hover:underline">Research Ethics</a>
      </div>
    </div>
  );
};
