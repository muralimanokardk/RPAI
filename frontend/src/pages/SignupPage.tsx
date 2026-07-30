import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, AlertCircle, ArrowRight } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('Julian Vance');
  const [email, setEmail] = useState('julian@university.edu');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agree) {
      setError('You must agree to the Research Ethics and Terms of Service.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await authApi.signup({ name, email, password });
      login(res.access_token, res.user);
      navigate('/onboarding/persona');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await authApi.googleOAuth({
        email: 'scholar@university.edu',
        name: 'Scholar User',
      });
      login(res.access_token, res.user);
      navigate('/onboarding/persona');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Google sign up failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between py-10 px-4">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Top Icon Badge */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">Join Research Prep AI</h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Start your journey toward academic excellence with AI-powered scholarly insights.
          </p>
        </div>

        {/* Card Form Box */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-2xl text-xs flex items-center gap-2 border border-red-100">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Julian Vance"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="julian@university.edu"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 rounded text-brand-600 focus:ring-brand-500"
              />
              <label htmlFor="agree" className="text-[11px] text-slate-600">
                I agree to the <a href="#ethics" className="text-brand-600 font-semibold underline">Research Ethics</a> and <a href="#terms" className="text-brand-600 font-semibold underline">Terms of Service</a>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-md shadow-brand-500/25 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : (
                <>
                  Create Account <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[10px] uppercase tracking-widest text-slate-400 font-semibold absolute">
              OR CONTINUE WITH
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="flex items-center justify-center gap-2 border border-slate-200 py-2.5 rounded-2xl text-xs font-semibold hover:bg-slate-50"
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => alert("Apple OAuth configured")}
              className="flex items-center justify-center gap-2 border border-slate-200 py-2.5 rounded-2xl text-xs font-semibold hover:bg-slate-50"
            >
              Apple
            </button>
          </div>

          <p className="text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>

      <div className="text-center text-[10px] text-slate-400">
        © 2026 Research Prep AI. Academic Excellence through Intelligence.
      </div>
    </div>
  );
};
