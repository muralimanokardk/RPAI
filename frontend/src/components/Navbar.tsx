import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { Sparkles, LogOut, User as UserIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-brand-600 transition-colors">Features</Link>
          <Link to="/#pricing" className="hover:text-brand-600 transition-colors">Pricing</Link>
          <Link to="/#about" className="hover:text-brand-600 transition-colors">Ethics & Safety</Link>
          <Link to="/#contact" className="hover:text-brand-600 transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 bg-brand-50 text-brand-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-brand-100 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all"
                title="Log Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-700 hover:text-brand-600 px-3 py-2 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-brand-600 text-white hover:bg-brand-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm shadow-brand-500/30 transition-all hover:scale-105"
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
