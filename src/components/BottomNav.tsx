import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenBooking: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  onOpenBooking,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 bg-[#fcf9f2]/95 backdrop-blur-xl border-t border-[#e5dfd3]/80 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {/* Studio / Home */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center w-14 h-12 transition-colors focus:outline-none ${
            currentScreen === 'home'
              ? 'text-[#1c1c18] font-bold'
              : 'text-[#4a4640] hover:text-[#1c1c18]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">home</span>
          <span className="text-[10px] uppercase tracking-wider mt-0.5">Studio</span>
        </button>

        {/* Suits / Lookbook */}
        <button
          type="button"
          onClick={() => onNavigate('lookbook')}
          className={`flex flex-col items-center justify-center w-14 h-12 transition-colors focus:outline-none ${
            currentScreen === 'lookbook'
              ? 'text-[#1c1c18] font-bold'
              : 'text-[#4a4640] hover:text-[#1c1c18]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">style</span>
          <span className="text-[10px] uppercase tracking-wider mt-0.5">Suits</span>
        </button>

        {/* Book Center Button */}
        <button
          type="button"
          onClick={onOpenBooking}
          className="flex items-center justify-center px-4 h-11 bg-[#181716] text-white rounded-full gap-1.5 shadow-[0_4px_12px_-2px_rgba(24,23,22,0.2)] hover:bg-[#2c2a27] active:scale-95 transition-all focus:outline-none"
        >
          <span className="material-symbols-outlined text-[#ffdea5] text-lg">
            calendar_month
          </span>
          <span className="text-xs uppercase tracking-wider font-semibold">Book</span>
        </button>

        {/* Craft */}
        <button
          type="button"
          onClick={() => onNavigate('craft')}
          className={`flex flex-col items-center justify-center w-14 h-12 transition-colors focus:outline-none ${
            currentScreen === 'craft'
              ? 'text-[#1c1c18] font-bold'
              : 'text-[#4a4640] hover:text-[#1c1c18]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">styler</span>
          <span className="text-[10px] uppercase tracking-wider mt-0.5">Craft</span>
        </button>

        {/* Client / Sizing */}
        <button
          type="button"
          onClick={() => onNavigate('sizing')}
          className={`flex flex-col items-center justify-center w-14 h-12 transition-colors focus:outline-none ${
            currentScreen === 'sizing'
              ? 'text-[#1c1c18] font-bold'
              : 'text-[#4a4640] hover:text-[#1c1c18]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">straighten</span>
          <span className="text-[10px] uppercase tracking-wider mt-0.5">Client</span>
        </button>
      </div>
    </nav>
  );
};
