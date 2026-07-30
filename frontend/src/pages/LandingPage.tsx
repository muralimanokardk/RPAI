import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Logo } from '../components/Logo';
import {
  Scan,
  Mic,
  Quote,
  FileCheck,
  BrainCircuit,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-800 rounded-full text-xs font-semibold text-brand-400 mb-2 shadow-inner">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Academic Precision 3D Engine Ready</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Generate Publication-Ready{' '}
              <span className="gradient-text">
                Research Papers
              </span>{' '}
              in Minutes
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              Elevate your research with real CrossRef/Semantic Scholar verified citations, automated journal formatting for IEEE and Springer, and non-negotiable ethical guardrails.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/signup"
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-7 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-brand-500/30 transition-all hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                Start Free Draft <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#pricing"
                className="flex items-center gap-2 bg-slate-900/90 text-slate-200 hover:bg-slate-800 border border-slate-800 px-6 py-4 rounded-2xl font-bold text-sm transition-all"
              >
                View Journal Formats
              </a>
            </div>

            <div className="pt-6 flex flex-wrap gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Real Verified DOIs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No Auto-Fabricated Data</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Razorpay Test Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Card Stack Preview */}
          <div className="lg:col-span-5">
            <div className="glass-card p-8 rounded-3xl shadow-2xl relative border border-slate-800 space-y-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 blur-3xl rounded-full -mr-12 -mt-12" />
              
              <div className="space-y-4 relative z-10">
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-brand-400">01. ABSTRACT & KEYWORDS</span>
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono">100% Verified</span>
                  </div>
                  <div className="h-2.5 bg-slate-800 rounded-full w-3/4 animate-pulse" />
                  <div className="h-2.5 bg-slate-800 rounded-full w-1/2" />
                </div>

                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-indigo-400">07. AUTO-FORMATTED REFERENCES</span>
                    <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded text-[10px] font-mono">IEEE / SPRINGER FORMAT</span>
                  </div>
                  <div className="h-2.5 bg-slate-800 rounded-full w-full" />
                  <div className="h-2.5 bg-slate-800 rounded-full w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl font-extrabold text-white">Engineered for Scholarly Excellence</h2>
          <p className="text-slate-400 text-sm">Empowering researchers, students, and academics with strict ethical guardrails and live API integrations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center border border-brand-500/20">
              <Quote className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Live Citation Verification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Direct CrossRef & Semantic Scholar API integration guarantees authentic DOIs. Never fabricates citations.</p>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Journal Templates</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Export publication-ready documents formatted strictly for IEEE, Springer LNCS, and Elsevier.</p>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Honest AI & Plagiarism Audit</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Generates raw Plagiarism and AI detection reports with clear draft editing labels.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
