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
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Logo Badge Header */}
            <div className="inline-block p-4 bg-[#F4EFEA] rounded-2xl border border-[#E8E2D9] mb-2 shadow-sm">
              <Logo size="lg" showText={false} />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Generate Publication-Ready{' '}
              <span className="text-brand-600 underline decoration-brand-200 decoration-wavy decoration-2">
                Research Papers
              </span>{' '}
              in Minutes
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              AI-powered research paper generation with citations, references, plagiarism analysis, AI reports, and journal formatting. Empowering the next generation of academic discovery.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/signup"
                className="flex items-center gap-2 bg-brand-600 text-white hover:bg-brand-700 px-6 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-brand-500/30 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                Generate Research Paper
              </Link>
              <a
                href="#pricing"
                className="flex items-center gap-2 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all"
              >
                View Quotas
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Researcher" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Researcher" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Researcher" />
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Trusted by 10,000+ researchers globally
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white border border-brand-100 p-6 rounded-3xl shadow-xl shadow-brand-500/10">
              <div className="bg-brand-50/50 rounded-2xl p-4 border border-brand-100 space-y-4">
                <div className="flex items-center justify-between border-b border-brand-100/60 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[10px] font-bold text-brand-600 bg-brand-100 px-2 py-0.5 rounded-full">
                    IEEE Format Ready
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-brand-200/60 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-slate-200/80 rounded w-full" />
                  <div className="h-3 bg-slate-200/80 rounded w-5/6" />
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl border border-slate-100 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider">Similarity Score</div>
                  <div className="text-xs font-bold text-brand-600">0.0% Unique Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Precision Tools for Scholarly Success
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From brainstorming to final submission, our suite of specialized AI tools handles the heavy lifting of academic formatting and research organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Scan,
                title: "OCR Topic Scanner",
                desc: "Instantly convert scanned physical documents and handwritten notes into structured research outlines using advanced vision models."
              },
              {
                icon: Mic,
                title: "Voice-to-Research",
                desc: "Dictate your theories and findings. Our AI synthesizes spoken words into academic-standard paragraphs with technical terminology."
              },
              {
                icon: Quote,
                title: "Citation Generation",
                desc: "Automated cross-referencing across CrossRef, arXiv, BioRxiv, and Semantic Scholar. Support for IEEE, APA, MLA, Chicago, and Harvard styles."
              },
              {
                icon: FileCheck,
                title: "Journal Formatting",
                desc: "One-click formatting for IEEE, Springer, and Elsevier. Ensures all margins, font sizes, and layout constraints are met."
              },
              {
                icon: BrainCircuit,
                title: "AI Critical Analysis",
                desc: "Receive automated peer-review style feedback to strengthen your arguments and identify potential research gaps before submission."
              },
              {
                icon: ShieldAlert,
                title: "Plagiarism Reports",
                desc: "Comprehensive integrity checks against 100M+ publications to ensure originality and proper scholarly attribution."
              }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-[#F8F9FD] border border-slate-100 p-6 rounded-3xl hover:border-brand-300 transition-all hover:shadow-soft group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{feat.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Publisher Logos */}
      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            FORMAT WITH CONFIDENCE FOR TOP-TIER JOURNALS
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['IEEE', 'Springer', 'Elsevier', 'ACM', 'Wiley', 'Nature', 'Science', 'MDPI'].map((pub) => (
              <div key={pub} className="bg-white py-4 px-6 rounded-2xl border border-slate-200/80 font-bold text-slate-600 shadow-sm flex items-center justify-center text-sm">
                {pub}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900">Simple, Scholarly Pricing</h2>
            <p className="text-slate-600 text-sm">Invest in your academic future with plans built for every stage of your career.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Student Plan Card */}
            <div className="bg-[#FDFCFB] border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-brand-400 transition-all shadow-sm">
              <div>
                <div className="inline-block bg-brand-100 text-brand-700 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  MOST POPULAR
                </div>
                <h3 className="text-xl font-bold text-slate-900">Student Plan</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">$75</span>
                  <span className="text-slate-500 text-sm">/ 3 Months</span>
                </div>
                <ul className="space-y-3 my-6 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" /> First 3 Papers Free
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" /> Unlimited Real CrossRef Citations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" /> Standard AI Integrity Analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" /> Export to IEEE LaTeX & Word
                  </li>
                </ul>
              </div>
              <Link
                to="/signup"
                className="w-full text-center bg-white border border-slate-200 text-slate-800 font-bold py-3 rounded-2xl hover:bg-slate-50 transition-colors text-xs"
              >
                Get Started
              </Link>
            </div>

            {/* Professional Plan Card */}
            <div className="bg-gradient-to-b from-brand-50 to-white border-2 border-brand-500 rounded-3xl p-8 flex flex-col justify-between shadow-glow">
              <div>
                <div className="inline-block bg-brand-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  RESEARCHER ELITE
                </div>
                <h3 className="text-xl font-bold text-slate-900">Professional Plan</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">$150</span>
                  <span className="text-slate-500 text-sm">/ 3 Months</span>
                </div>
                <ul className="space-y-3 my-6 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" /> First 2 Papers Free
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" /> Deep AI Logic Analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" /> Journal-Ready Compliance Check
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" /> Priority Ethics Consultation
                  </li>
                </ul>
              </div>
              <Link
                to="/signup"
                className="w-full text-center bg-brand-600 text-white font-bold py-3 rounded-2xl hover:bg-brand-700 transition-colors text-xs shadow-md shadow-brand-500/30"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto bg-brand-600 text-white rounded-3xl p-10 text-center space-y-6 shadow-xl shadow-brand-500/20">
          <h2 className="text-3xl font-extrabold">Accelerate Your Academic Impact</h2>
          <p className="text-brand-100 text-sm max-w-xl mx-auto">
            Join thousands of researchers who have reclaimed their time and focused on what truly matters: making groundbreaking discoveries.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-brand-600 hover:bg-brand-50 font-bold px-8 py-3.5 rounded-2xl transition-all shadow-md text-sm"
          >
            Start Writing for Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
