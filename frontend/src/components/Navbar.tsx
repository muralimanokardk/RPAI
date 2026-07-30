import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { Sparkles, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-brand-400 transition-colors">Features</Link>
          <Link to="/#pricing" className="hover:text-brand-400 transition-colors">Pricing</Link>
          <Link to="/#about" className="hover:text-brand-400 transition-colors">Ethics & Safety</Link>
          <Link to="/#contact" className="hover:text-brand-400 transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 bg-brand-600/20 border border-brand-500/30 text-brand-300 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-brand-600/30 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
                title="Log Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-300 hover:text-brand-400 px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-brand-500/25 transition-all hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
