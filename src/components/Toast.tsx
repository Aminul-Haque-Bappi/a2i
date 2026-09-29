import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'verified' }) => {
  if (!message) return null;

  return (
    <aside
      aria-label="Notification"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-[#181716] text-white py-3 px-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 border border-[#775a19]/40 animate-fade-in"
    >
      <span className="material-symbols-outlined text-[#ffdea5] text-lg shrink-0">
        {icon}
      </span>
      <p className="text-xs text-[#fcf9f2] font-medium leading-tight">{message}</p>
    </aside>
  );
};
