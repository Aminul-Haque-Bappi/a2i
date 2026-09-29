import React from 'react';
import { ScreenType } from '../types';
import { ATELIER_INFO } from '../data/content';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenBooking: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  currentScreen,
  onNavigate,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#181716]/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className="absolute top-0 left-0 w-4/5 max-w-sm h-full bg-[#f6f3ec] shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-out border-r border-[#e5dfd3]"
        role="dialog"
        aria-modal="true"
        aria-label="Atelier Navigation"
      >
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#e5dfd3] pb-4">
            <div className="flex items-center gap-2.5">
              <img
                alt="StitchCraft Logo"
                className="h-7 w-auto object-contain"
                src={ATELIER_INFO.logoUrl}
              />
              <span className="font-serif text-xl text-[#1c1c18] font-medium">
                Atelier Directory
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Navigation"
              className="w-9 h-9 flex items-center justify-center text-[#4a4640] hover:text-[#1c1c18] hover:bg-[#ebe8e1] rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <p className="text-[11px] font-bold text-[#775a19] uppercase tracking-widest">
            Directory & Services
          </p>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                onClose();
              }}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-md text-left transition-colors font-medium text-sm ${
                currentScreen === 'home'
                  ? 'text-[#775a19] bg-[#f1eee7] font-semibold'
                  : 'text-[#4a4640] hover:text-[#1c1c18] hover:bg-[#ebe8e1]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">home</span>
              <span>Home Atelier</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate('craft');
                onClose();
              }}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-md text-left transition-colors font-medium text-sm ${
                currentScreen === 'craft'
                  ? 'text-[#775a19] bg-[#f1eee7] font-semibold'
                  : 'text-[#4a4640] hover:text-[#1c1c18] hover:bg-[#ebe8e1]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">design_services</span>
              <span>Our Craft & Services</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate('lookbook');
                onClose();
              }}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-md text-left transition-colors font-medium text-sm ${
                currentScreen === 'lookbook'
                  ? 'text-[#775a19] bg-[#f1eee7] font-semibold'
                  : 'text-[#4a4640] hover:text-[#1c1c18] hover:bg-[#ebe8e1]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">auto_stories</span>
              <span>The Lookbook</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate('sizing');
                onClose();
              }}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-md text-left transition-colors font-medium text-sm ${
                currentScreen === 'sizing'
                  ? 'text-[#775a19] bg-[#f1eee7] font-semibold'
                  : 'text-[#4a4640] hover:text-[#1c1c18] hover:bg-[#ebe8e1]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">straighten</span>
              <span>Sizing Guide & Fit Dossier</span>
            </button>
          </nav>
        </div>

        {/* Bottom CTA Block */}
        <div className="flex flex-col gap-3 pt-6 border-t border-[#e5dfd3]">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full py-3.5 px-4 bg-[#181716] text-white text-center text-xs font-semibold uppercase tracking-widest rounded-md flex items-center justify-center gap-2 hover:bg-[#2c2a27] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-base text-[#ffdea5]">
              calendar_month
            </span>
            <span>Book a Fitting Session</span>
          </button>
          <p className="text-[11px] text-center text-[#4a4640]">
            Savile Row & At-Home Private Consultations
          </p>
        </div>
      </aside>
    </div>
  );
};
