import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onboardingApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';

export const OnboardingPersonaPage: React.FC = () => {
  const [selected, setSelected] = useState<'student' | 'professional'>('student');
  const [loading, setLoading] = useState(false);
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const handleContinue = async () => {
    setLoading(true);
    try {
      await onboardingApi.setPersona(selected);
      await refreshUser();
      if (selected === 'student') {
        navigate('/onboarding/student-verification');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert("Failed to save preference.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between py-12 px-4">
      <div className="max-w-3xl w-full mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900">Select your expertise</h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Tailor your AI research assistant experience based on your current academic or professional focus.
          </p>
        </div>

        {/* 2 Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Academic Student Card */}
          <div
            onClick={() => setSelected('student')}
            className={`cursor-pointer bg-white p-8 rounded-3xl border-2 transition-all relative flex flex-col justify-between ${
              selected === 'student'
                ? 'border-brand-500 shadow-glow bg-gradient-to-b from-brand-50/30 to-white'
                : 'border-slate-100 shadow-sm hover:border-slate-200'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">Academic Student</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Optimized for undergraduates and postgraduates. Get help with literature reviews, thesis structuring, and automated citations for your coursework.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" /> Thesis Workflow Optimization
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" /> APA/MLA Auto-Formatting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" /> Student Discount Pricing ($75/3mo)
                </li>
              </ul>
            </div>

            <button
              type="button"
              className={`w-full mt-8 py-3 rounded-2xl text-xs font-bold transition-all ${
                selected === 'student'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              Select Student Plan
            </button>
          </div>

          {/* Professional Researcher Card */}
          <div
            onClick={() => setSelected('professional')}
            className={`cursor-pointer bg-white p-8 rounded-3xl border-2 transition-all relative flex flex-col justify-between ${
              selected === 'professional'
                ? 'border-slate-800 shadow-xl'
                : 'border-slate-100 shadow-sm hover:border-slate-200'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">Professional Researcher</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Designed for PhD candidates, Professors, and Corporate R&D. Advanced data synthesis, grant writing tools, and multi-team collaboration.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-800" /> Grant & Patent Draft Assistance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-800" /> Advanced Data Visualization
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-800" /> Team Workspace & Sharing
                </li>
              </ul>
            </div>

            <button
              type="button"
              className={`w-full mt-8 py-3 rounded-2xl text-xs font-bold transition-all ${
                selected === 'professional'
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              Select Professional Plan
            </button>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={handleContinue}
            disabled={loading}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-brand-500/25 disabled:opacity-50"
          >
            {loading ? 'Processing...' : (
              <>
                Continue <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="text-center text-[10px] text-slate-400">
        © 2026 Research Prep AI. Academic Excellence through Intelligence.
      </div>
    </div>
  );
};
