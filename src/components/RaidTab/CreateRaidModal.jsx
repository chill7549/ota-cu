import React, { useState } from 'react';
import { X, Send, AlertTriangle, CheckCircle2, Info, Github } from 'lucide-react';

export default function CreateRaidModal({ isOpen, onClose, onSubmitRaid, activeRepo }) {
  const [booth, setBooth] = useState('');
  const [type, setType] = useState('WAIT'); // SOLDOUT, WAIT, INFO
  const [text, setText] = useState('');
  const [repo, setRepo] = useState(activeRepo || 'facebook/react');
  const [syncGithub, setSyncGithub] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!booth.trim() || !text.trim()) return;

    onSubmitRaid({
      booth,
      type,
      text,
      repo,
      syncGithub
    });

    setBooth('');
    setText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 relative">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl">📢</span>
            <h3 className="text-lg font-bold text-slate-100">실시간 레이드 현장 제보</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 타입 선택 */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">제보 유형</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setType('WAIT')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1 transition-all ${
                  type === 'WAIT'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>⏳ 대기열/긴급</span>
              </button>

              <button
                type="button"
                onClick={() => setType('SOLDOUT')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1 transition-all ${
                  type === 'SOLDOUT'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500 shadow-md shadow-rose-500/20'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>❌ 품절/해결</span>
              </button>

              <button
                type="button"
                onClick={() => setType('INFO')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1 transition-all ${
                  type === 'INFO'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500 shadow-md shadow-sky-500/20'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>📢 일반 정보</span>
              </button>
            </div>
          </div>

          {/* 부스/위치 */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">부스 번호 및 연동 리포지토리</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="예: A-01 또는 입구"
                value={booth}
                onChange={(e) => setBooth(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="text"
                placeholder="예: facebook/react"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* 내용 */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">제보 내용</label>
            <textarea
              rows={3}
              placeholder="현장 상황을 상세히 작성해주세요 (예: 키링 수량 완판, 발권 30분 대기중 등)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
              required
            ></textarea>
          </div>

          {/* GitHub Issue 동기화 옵션 */}
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Github className="w-4 h-4 text-indigo-400" />
              <div>
                <p className="text-xs font-bold text-slate-200">GitHub Issue로 자동 발행</p>
                <p className="text-[10px] text-slate-400">선택한 리포지토리에 이슈로 동기화됩니다</p>
              </div>
            </div>
            <input 
              type="checkbox"
              checked={syncGithub}
              onChange={(e) => setSyncGithub(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-700 border-slate-600 cursor-pointer"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 transition-all flex items-center justify-center space-x-1.5"
          >
            <Send className="w-4 h-4" />
            <span>실시간 제보 등록하기</span>
          </button>
        </form>
      </div>
    </div>
  );
}
