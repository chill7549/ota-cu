import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 border border-indigo-500/50 text-indigo-200 px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-md flex items-center space-x-2 text-xs font-bold animate-bounce border-indigo-500/40">
      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      <span>{message}</span>
    </div>
  );
}
