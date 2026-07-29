import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg'; showText?: boolean }> = ({ size = 'md', showText = true }) => {
  const dimensions = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : 'w-10 h-10';
  
  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`${dimensions} bg-[#F4EFEA] rounded-xl flex items-center justify-center p-2 shadow-sm border border-[#E8E2D9] transition-transform hover:scale-105`}>
        {/* Crest logo matching uploaded design reference */}
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M18 6L28 11L18 16L8 11L18 6Z" fill="#2E2A56" stroke="#2E2A56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 14V19.5C12 21.5 14.5 23 18 23C21.5 23 24 21.5 24 19.5V14" stroke="#2E2A56" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M9 26H27" stroke="#2E2A56" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M11 29H25" stroke="#2E2A56" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      {showText && (
        <span className="font-bold tracking-tight text-slate-900 text-lg sm:text-xl">
          Research Prep AI
        </span>
      )}
    </div>
  );
};
