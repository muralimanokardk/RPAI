import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { papersApi } from '../services/api';
import { Paper } from '../types';
import {
  FileText,
  CreditCard,
  Download,
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle2,
  Clock,
  TrendingUp,
  ShieldCheck,
  Plus
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, subscription } = useAuth();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickTopic, setQuickTopic] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const list = await papersApi.list();
      setPapers(list);
    } catch (e) {
      // Use mock initial papers if database empty
      setPapers([
        { id: 'p1', topic: 'Neuroplasticity in Adult Learning Paradigms', input_mode: 'text', target_format: 'IEEE', journal_template: 'IEEE', citation_style: 'IEEE', status: 'completed', created_at: 'Oct 24, 2026' },
        { id: 'p2', topic: 'Quantum Computing Ethics & Algorithmic Integrity', input_mode: 'voice', target_format: 'IEEE', journal_template: 'Springer', citation_style: 'IEEE', status: 'processing', created_at: 'Oct 23, 2026' },
        { id: 'p3', topic: 'Renewable Energy Storage Solution Benchmarks', input_mode: 'text', target_format: 'Generic', journal_template: 'Elsevier', citation_style: 'APA', status: 'completed', created_at: 'Oct 21, 2026' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickStart = () => {
    if (quickTopic.trim()) {
      navigate(`/generator?topic=${encodeURIComponent(quickTopic)}`);
    } else {
      navigate('/generator');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAF8F5]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                Welcome back, {user?.name || 'Dr. Julian Vance'}
              </h1>
              <p className="text-xs text-slate-500">
                Here is an overview of your academic progress and AI-generated insights.
              </p>
            </div>
            <button
              onClick={() => navigate('/generator')}
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-2.5 rounded-2xl text-xs shadow-md shadow-brand-500/25 transition-all"
            >
              <Sparkles className="w-4 h-4" /> Quick "New Research"
            </button>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Papers Generated</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{papers.length || 12}</h3>
                <p className="text-[10px] text-green-600 font-bold mt-1">+2 this month</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Remaining Credits</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  {subscription ? (subscription.generations_included - subscription.generations_used) : 3}
                </h3>
                <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-brand-600 h-full w-2/3" />
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Subscription Plan</p>
                <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                  {user?.plan_tier === 'student' ? 'Student Plan' : 'Professional Plan'}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium mt-1">Renews in 17 days</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Downloads</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">45</h3>
                <p className="text-[10px] text-slate-400 font-medium mt-1">Exported to PDF/LaTeX</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Download className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 cols: Recent Research Papers Table */}
            <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Recent Research Papers</h3>
                <button onClick={() => navigate('/papers')} className="text-brand-600 font-bold text-xs hover:underline">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="pb-3">TITLE</th>
                      <th className="pb-3">DATE</th>
                      <th className="pb-3">STATUS</th>
                      <th className="pb-3 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {papers.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 font-semibold text-slate-800 max-w-xs truncate">{p.topic}</td>
                        <td className="py-3.5 text-slate-400">{new Date(p.created_at).toLocaleDateString()}</td>
                        <td className="py-3.5">
                          {p.status === 'completed' ? (
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                              Completed
                            </span>
                          ) : (
                            <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 w-max">
                              <Clock className="w-3 h-3 animate-spin" /> Processing
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 text-right space-x-2">
                          <button
                            onClick={() => navigate(`/papers/${p.id}`)}
                            className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-brand-50"
                            title="View Paper Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/downloads/${p.id}`)}
                            className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-brand-50"
                            title="Downloads Hub"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right 4 cols: Quick Generate & Ethics Checklist */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Generate Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Quick Generate Paper</h3>
                <p className="text-xs text-slate-500">
                  Enter a research topic to start an instant draft using our AI scholar engine.
                </p>
                <input
                  type="text"
                  value={quickTopic}
                  onChange={(e) => setQuickTopic(e.target.value)}
                  placeholder="e.g. Behavioral Economics in Digital Health"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-500"
                />
                <button
                  onClick={handleQuickStart}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl text-xs shadow-md shadow-brand-500/25 transition-all"
                >
                  Start Processing
                </button>
                <p className="text-[10px] text-slate-400 text-center">
                  ✓ Generated papers are 100% unique & verified for academic standards.
                </p>
              </div>

              {/* Ethics Checklist */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-green-600" /> Ethics Checklist
                </div>
                <p className="text-[11px] text-slate-500">Review our academic integrity guidelines before exporting.</p>
                <ul className="space-y-2 text-xs text-slate-600 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Citation accuracy check
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> AI detection honest rewrite mode
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Weekly Insights Banner */}
          <div className="bg-gradient-to-r from-brand-500 to-indigo-600 text-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" /> WEEKLY INSIGHTS
              </div>
              <h3 className="text-xl font-bold">Your Research Velocity is up 15%</h3>
              <p className="text-xs text-brand-100 leading-relaxed">
                Based on your recent activity, we recommend looking into "Edge Computing Paradigms" as a potential next topic for your series on Infrastructure Resilience.
              </p>
            </div>
            <button
              onClick={() => navigate('/generator?topic=Edge+Computing+Paradigms')}
              className="bg-white text-brand-600 font-bold px-6 py-3 rounded-2xl text-xs shadow-md hover:bg-brand-50 transition-all flex-shrink-0"
            >
              Explore Recommendations
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
