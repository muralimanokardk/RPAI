import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { authApi } from '../services/api';
import { Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authApi.resetPassword({ token, new_password: newPassword });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Reset failed.');
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
            <h2 className="text-2xl font-bold text-slate-900">Set New Password</h2>
            <p className="text-xs text-slate-500">Choose a secure password for your ResearchPrepAI account</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-2xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center space-y-3 py-4">
              <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto" />
              <p className="text-sm font-bold text-slate-800">Password reset successful!</p>
              <p className="text-xs text-slate-500">Redirecting to login page...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-md shadow-brand-500/25 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
