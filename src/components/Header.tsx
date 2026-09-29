import React from 'react';
import { ScreenType } from '../types';
import { ATELIER_INFO } from '../data/content';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onOpenDrawer,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-[#fcf9f2]/90 backdrop-blur-xl border-b border-[#e5dfd3]/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Drawer Trigger + Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open Studio Navigation"
            onClick={onOpenDrawer}
            className="w-10 h-10 flex items-center justify-center text-[#1c1c18] rounded-full transition-colors hover:bg-[#ebe8e1] active:scale-95 focus:outline-none"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <img
              alt="StitchCraft Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src={ATELIER_INFO.logoUrl}
            />
            <span className="font-serif text-2xl tracking-tight text-[#1c1c18] font-medium">
              StitchCraft
            </span>
          </button>
        </div>

        {/* Right: Atelier Concierge Info + Profile Avatar */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#775a19]">
              Atelier Concierge
            </p>
            <p className="text-sm font-semibold text-[#1c1c18]">Savile Row</p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('sizing')}
            aria-label="View Fit Dossier & Sizing"
            className="relative flex items-center focus:outline-none group"
            title="Your Fit Dossier"
          >
            <img
              alt="Master Tailor Concierge"
              className="w-9 h-9 rounded-full object-cover ring-1 ring-[#775a19]/40 transition-transform group-hover:scale-105"
              src={ATELIER_INFO.tailorAvatar}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#775a19] rounded-full ring-2 ring-[#fcf9f2]" />
          </button>
        </div>
      </div>
    </header>
  );
};
