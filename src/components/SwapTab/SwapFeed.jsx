import React from 'react';
import SwapCard from './SwapCard';

export default function SwapFeed({ 
  swapData, 
  searchQuery, 
  selectedCategory, 
  onToggleStatus, 
  onPinLocation, 
  onShareCard 
}) {
  const filteredSwaps = swapData.filter(swap => {
    const matchesSearch = 
      swap.have.toLowerCase().includes(searchQuery.toLowerCase()) ||
      swap.want.toLowerCase().includes(searchQuery.toLowerCase()) ||
      swap.loc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'ALL' || swap.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (filteredSwaps.length === 0) {
    return (
      <div className="text-center py-12 glass-panel rounded-xl border border-slate-800">
        <p className="text-slate-400 text-sm">검색 결과에 맞는 교환 글이 없습니다.</p>
        <p className="text-slate-500 text-xs mt-1">하단 [내 굿즈/코드 교환 글 올리기] 버튼을 눌러보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-24">
      {filteredSwaps.map((swap) => (
        <SwapCard 
          key={swap.id} 
          swap={swap}
          onToggleStatus={onToggleStatus}
          onPinLocation={onPinLocation}
          onShareCard={onShareCard}
        />
      ))}
    </div>
  );
}
