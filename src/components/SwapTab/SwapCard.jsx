import React from 'react';
import { MapPin, Megaphone, CheckCircle, Share2, Sparkles } from 'lucide-react';

export default function SwapCard({ swap, onToggleStatus, onPinLocation, onShareCard }) {
  const isCompleted = swap.status === 'COMPLETED';

  return (
    <div 
      className={`p-4 rounded-xl shadow-md border transition-all relative overflow-hidden ${
        swap.isBoosted 
          ? 'bg-slate-900/95 border-amber-500/40 shadow-amber-500/10' 
          : 'glass-card border-slate-800/80'
      }`}
    >
      {/* Boost Badge */}
      {swap.isBoosted && (
        <div className="mb-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-[11px] font-extrabold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full w-fit">
            <Megaphone className="w-3 h-3 text-amber-400 animate-bounce" />
            <span>📢 100원 확성기로 상단 노출 중</span>
          </div>
          <span className="text-[10px] text-slate-500">{swap.time}</span>
        </div>
      )}

      {/* Main Exchange Info */}
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-2 flex-1 pr-2">
          {/* Have Item */}
          <div className="flex items-center text-sm">
            <span className="w-12 text-xs font-bold text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded text-center mr-2 flex-shrink-0">
              양도
            </span>
            <span className="font-bold text-slate-100 leading-snug">{swap.have}</span>
          </div>

          {/* Want Item */}
          <div className="flex items-center text-sm">
            <span className="w-12 text-xs font-bold text-indigo-400 bg-indigo-950/80 px-1.5 py-0.5 rounded text-center mr-2 flex-shrink-0 border border-indigo-800/50">
              구함
            </span>
            <span className="font-extrabold text-indigo-300 leading-snug">{swap.want}</span>
          </div>
        </div>

        {/* Status Badge */}
        <button
          onClick={() => onToggleStatus(swap.id)}
          className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all flex-shrink-0 ${
            isCompleted
              ? 'bg-slate-800 text-slate-400 border-slate-700'
              : 'bg-indigo-950 text-indigo-300 border-indigo-500/50 hover:bg-indigo-900'
          }`}
        >
          {isCompleted ? '교환완료' : '교환가능'}
        </button>
      </div>

      {/* Footer Info */}
      <div className="pt-2.5 border-t border-slate-800/80 flex justify-between items-center text-xs">
        <div className="flex items-center space-x-2 text-slate-400 truncate max-w-[65%]">
          <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
          <span className="truncate text-[11px]">📍 접선: {swap.loc}</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Twitter / GitHub Blind Card Generator */}
          <button 
            onClick={() => onShareCard(swap)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-all text-[11px] flex items-center space-x-1"
            title="트위터/깃허브 공유용 메타 카드 생성"
          >
            <Share2 className="w-3 h-3 text-sky-400" />
            <span className="hidden sm:inline">공유 카드</span>
          </button>

          {!isCompleted && (
            <button 
              onClick={() => onPinLocation(swap)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-indigo-900 text-white text-xs font-bold rounded-lg border border-slate-700 transition-all flex items-center space-x-1"
            >
              <MapPin className="w-3 h-3 text-indigo-400" />
              <span>위치 핑 찍기</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
