import React from 'react';
import { Search } from 'lucide-react';

export default function SwapSearchBar({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  const categories = [
    { id: 'ALL', label: '전체 스왑' },
    { id: 'CODE_REVIEW', label: '💻 코드 리뷰' },
    { id: 'SWAG', label: '🎁 굿즈 & 배지' },
    { id: 'TASK_BOUNTY', label: '🛠️ 디버깅 / 태스크' },
    { id: 'PAIR_PROG', label: '🤝 페어 프로그래밍' },
  ];

  return (
    <div className="space-y-2.5">
      <div className="relative">
        <input 
          type="text" 
          placeholder="원하는 기술, 코드 리뷰 주제, 굿즈 검색..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900/80 px-4 py-3 pl-10 rounded-xl text-xs text-white border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-inner" 
        />
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-3 text-xs text-slate-500 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-indigo-950 text-indigo-300 border-indigo-500/60 font-bold'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
