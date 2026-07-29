import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { authApi } from '../services/api';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [tokenMsg, setTokenMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi.forgotPassword(email);
      setSent(true);
      if (res.reset_token) {
        setTokenMsg(res.reset_token);
      }
    } catch (err) {
      alert("Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between py-10 px-4">
      <div className="max-w-md w-full mx-auto space-y-6">
        <div className="flex justify-center">
          <Logo size="lg" showText={false} />
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">Reset Password</h2>
            <p className="text-xs text-slate-500">Enter your academic email to receive a password reset link</p>
          </div>

          {sent ? (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-700">
                Password reset instructions have been dispatched to <b>{email}</b>.
              </p>
              {tokenMsg && (
                <div className="bg-slate-50 p-3 rounded-2xl border text-[11px] text-slate-600">
                  <span>Demo Token: </span>
                  <code className="font-mono bg-slate-200 px-1 py-0.5 rounded text-brand-700">{tokenMsg}</code>
                  <div className="mt-2">
                    <button
                      onClick={() => navigate(`/reset-password?token=${tokenMsg}`)}
                      className="text-brand-600 font-bold underline"
                    >
                      Click here to enter reset form
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-md shadow-brand-500/25 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}

          <div className="pt-2 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-600">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
