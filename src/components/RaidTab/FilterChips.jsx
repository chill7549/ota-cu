import React from 'react';

export default function FilterChips({ activeFilter, setActiveFilter }) {
  const filters = [
    { id: 'ALL', label: '전체' },
    { id: 'WAIT', label: '⏳ 대기열 / 긴급' },
    { id: 'SOLDOUT', label: '❌ 품절 / 해결' },
    { id: 'INFO', label: '📢 부스 / 공지' },
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide py-1">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all border ${
              isActive
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30 font-bold scale-105'
                : 'bg-slate-800/80 text-slate-400 border-slate-700/80 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
