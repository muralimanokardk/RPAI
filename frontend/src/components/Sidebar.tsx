import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  FilePlus2,
  FileText,
  BarChart3,
  ShieldCheck,
  CreditCard,
  Settings,
  Plus,
  HelpCircle,
  LogOut
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Generate Paper', path: '/generator', icon: FilePlus2 },
    { label: 'My Papers', path: '/papers', icon: FileText },
    { label: 'Analysis Reports', path: '/reports', icon: BarChart3 },
    { label: 'Subscription', path: '/billing', icon: CreditCard },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 min-h-screen flex flex-col justify-between p-4 select-none">
      <div>
        {/* Top Logo */}
        <div className="mb-6 px-2">
          <Logo size="sm" />
        </div>

        {/* User Card */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center font-bold text-brand-700">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="overflow-hidden">
            <h4 className="font-semibold text-xs text-slate-900 truncate">{user?.name || 'Dr. Julian Vance'}</h4>
            <p className="text-[10px] text-brand-600 font-medium tracking-wide uppercase">
              {user?.plan_tier === 'student' ? 'Student Plan' : 'Professional Plan'}
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/30'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* New Research CTA Button */}
        <div className="mt-6 px-1">
          <button
            onClick={() => navigate('/generator')}
            className="w-full flex items-center justify-center gap-2 bg-brand-600 text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-brand-500/25 hover:bg-brand-700 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            New Research
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-slate-100 space-y-1">
        <button 
          onClick={() => navigate('/help')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          Help Center
        </button>
        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          Log Out
        </button>
      </div>
    </aside>
  );
};
