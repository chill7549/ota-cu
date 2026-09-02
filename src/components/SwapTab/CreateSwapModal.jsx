import React, { useState } from 'react';
import { X, RefreshCw, Zap, MapPin } from 'lucide-react';

export default function CreateSwapModal({ isOpen, onClose, onSubmitSwap }) {
  const [have, setHave] = useState('');
  const [want, setWant] = useState('');
  const [loc, setLoc] = useState('');
  const [category, setCategory] = useState('CODE_REVIEW');
  const [isBoosted, setIsBoosted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!have.trim() || !want.trim() || !loc.trim()) return;

    onSubmitSwap({
      have,
      want,
      loc,
      category,
      isBoosted,
      status: 'OPEN',
      time: '방금 전'
    });

    setHave('');
    setWant('');
    setLoc('');
    setIsBoosted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 relative">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-100">내 굿즈/코드 교환 글 등록</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* 카테고리 선택 */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">스왑 카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="CODE_REVIEW">💻 코드 리뷰 교환</option>
              <option value="SWAG">🎁 굿즈 & 배지 교환</option>
              <option value="TASK_BOUNTY">🛠️ 디버깅 / 태스크 교환</option>
              <option value="PAIR_PROG">🤝 페어 프로그래밍 / 해커톤</option>
            </select>
          </div>

          {/* 양도 (Have) */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              양도할 항목 (Have) <span className="text-indigo-400">*</span>
            </label>
            <input
              type="text"
              placeholder="예: React 19 성능 디버깅 노하우 / 옥토캣 스티커 팩"
              value={have}
              onChange={(e) => setHave(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* 구함 (Want) */}
          <div>
            <label className="text-xs font-bold text-indigo-300 block mb-1">
              구하는 항목 (Want) <span className="text-indigo-400">*</span>
            </label>
            <input
              type="text"
              placeholder="예: Rust WASM 리뷰 / Vercel 에나멜 핀"
              value={want}
              onChange={(e) => setWant(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* 접선 장소 */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              접선 장소 / 연락처 (Location) <span className="text-indigo-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="예: 1층 카페테리아 3번 테이블 / 디스코드 채널"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />
              <MapPin className="w-4 h-4 text-rose-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* 100원 확성기 옵션 */}
          <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              <div>
                <p className="text-xs font-bold text-amber-300">📢 100원 확성기 적용 (상단 노출)</p>
                <p className="text-[10px] text-amber-400/80">피드 최상단에 강조 카드로 노출됩니다</p>
              </div>
            </div>
            <input 
              type="checkbox"
              checked={isBoosted}
              onChange={(e) => setIsBoosted(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-800 border-slate-600 cursor-pointer"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 transition-all flex items-center justify-center space-x-2"
          >
            <span>🔄 교환 글 올리기</span>
          </button>
        </form>
      </div>
    </div>
  );
}
