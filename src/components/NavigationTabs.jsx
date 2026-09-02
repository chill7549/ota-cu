import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function NavigationTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex bg-slate-900 border-b border-slate-800 sticky top-[57px] z-20 shadow-md">
      <button 
        onClick={() => setActiveTab('raid')}
        className={`flex-1 py-3 text-sm font-bold text-center flex items-center justify-center space-x-2 transition-all relative ${
          activeTab === 'raid' 
            ? 'text-indigo-400 font-extrabold' 
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <AlertCircle className={`w-4 h-4 ${activeTab === 'raid' ? 'text-indigo-400 animate-pulse' : 'text-slate-500'}`} />
        <span>🚨 실시간 현장 레이드</span>
        {activeTab === 'raid' && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        )}
      </button>

      <button 
        onClick={() => setActiveTab('swap')}
        className={`flex-1 py-3 text-sm font-bold text-center flex items-center justify-center space-x-2 transition-all relative ${
          activeTab === 'swap' 
            ? 'text-indigo-400 font-extrabold' 
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <RefreshCw className={`w-4 h-4 ${activeTab === 'swap' ? 'text-indigo-400' : 'text-slate-500'}`} />
        <span>🔄 굿즈 & 코드 스왑</span>
        {activeTab === 'swap' && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        )}
      </button>
    </div>
  );
}
