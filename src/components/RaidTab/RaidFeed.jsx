import React from 'react';
import { ThumbsUp, ExternalLink, MessageSquare, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export default function RaidFeed({ raidData, onLike, activeFilter }) {
  const filteredData = raidData.filter(item => {
    if (activeFilter === 'ALL') return true;
    return item.type === activeFilter;
  });

  if (filteredData.length === 0) {
    return (
      <div className="text-center py-12 glass-panel rounded-xl border border-slate-800">
        <p className="text-slate-400 text-sm">해당 카테고리의 레이드 제보가 없습니다.</p>
        <p className="text-slate-500 text-xs mt-1">하단 + 버튼을 눌러 첫 번째 제보자가 되어보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredData.map((item) => {
        const isSoldout = item.type === 'SOLDOUT';
        const isWait = item.type === 'WAIT';

        return (
          <div 
            key={item.id} 
            className="glass-card p-4 rounded-xl shadow-md border border-slate-800/80 hover:border-indigo-500/40 transition-all group relative overflow-hidden"
          >
            <div className="flex space-x-3 items-start">
              {/* Type Badge Icon */}
              <div 
                className={`mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shadow-inner ${
                  isSoldout 
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' 
                    : isWait 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                    : 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                }`}
              >
                {isSoldout ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : isWait ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <Info className="w-5 h-5" />
                )}
              </div>

              {/* Card Body */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="font-extrabold text-sm text-slate-100 truncate">
                      {item.booth}
                    </span>
                    {item.repo && (
                      <span className="text-[10px] bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded font-mono border border-slate-700">
                        {item.repo}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 font-medium ml-2 flex-shrink-0">{item.time}</span>
                </div>

                <p className="text-sm text-slate-300 leading-snug break-words my-1.5 font-normal">
                  {item.text}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    {item.avatar && (
                      <img src={item.avatar} alt={item.author} className="w-4 h-4 rounded-full" />
                    )}
                    <span className="text-slate-400 font-medium text-[11px]">@{item.author || 'dev'}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    {item.html_url && (
                      <a 
                        href={item.html_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-slate-400 hover:text-indigo-400 flex items-center space-x-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="text-[11px]">GitHub</span>
                      </a>
                    )}

                    <button
                      onClick={() => onLike(item.id)}
                      className="px-2.5 py-1 bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 rounded-md border border-indigo-700/40 flex items-center space-x-1 text-xs font-semibold transition-all active:scale-95"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>도움돼요 {item.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
