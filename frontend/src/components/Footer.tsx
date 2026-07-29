import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 text-sm">Research Prep AI</h4>
          <p className="leading-relaxed">
            Empowering researchers and students with ethical AI tools designed for the rigors of modern academia.
          </p>
          <p className="text-[10px] text-slate-400">
            © 2026 Research Prep AI. Academic Excellence through Intelligence.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-slate-900 mb-3">PLATFORM</h5>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-brand-600 transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-brand-600 transition-colors">Pricing</a></li>
            <li><a href="#ethics" className="hover:text-brand-600 transition-colors">Research Ethics</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-900 mb-3">SUPPORT</h5>
          <ul className="space-y-2">
            <li><a href="#help" className="hover:text-brand-600 transition-colors">Help Center</a></li>
            <li><a href="#contact" className="hover:text-brand-600 transition-colors">Contact Us</a></li>
            <li><a href="#privacy" className="hover:text-brand-600 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-900 mb-3">LEGAL</h5>
          <ul className="space-y-2">
            <li><a href="#terms" className="hover:text-brand-600 transition-colors">Terms of Service</a></li>
            <li><a href="#cookie" className="hover:text-brand-600 transition-colors">Cookie Policy</a></li>
            <li><a href="#ethics" className="hover:text-brand-600 transition-colors">Integrity Mandate</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
