import React, { useState } from 'react';
import { X, Copy, Check, Share2, Github, Twitter } from 'lucide-react';
import { generateGitHubMarkdown } from '../../services/githubApi';

export default function CardGeneratorModal({ isOpen, onClose, swap, onShowToast }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !swap) return null;

  const markdownText = generateGitHubMarkdown(swap);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownText);
    setCopied(true);
    if (onShowToast) onShowToast('GitHub 마크다운 서식이 클립보드에 복사되었습니다!');
    setTimeout(() => setCopied(false), 2000);
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `[GitRaid & Swap] 🔄 ${swap.have} 교환 원합니다!\n📍 접선: ${swap.loc}\n#GitRaid #FEConf #DevSwap #GitHub`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 relative">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-100">소셜 & 깃허브 공유용 카드</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Card Preview */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-5 rounded-xl border border-indigo-500/30 space-y-3 relative overflow-hidden shadow-xl">
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded text-[10px] font-bold">
            GitRaid Blind Card
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center text-xs">🐙</div>
            <span className="text-xs font-bold text-slate-300">GitDev Swap Card</span>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block">GIVE (양도)</span>
              <p className="text-xs font-bold text-slate-100">{swap.have}</p>
            </div>

            <div className="bg-indigo-950/80 p-2 rounded-lg border border-indigo-800/40">
              <span className="text-[10px] text-indigo-400 font-bold block">WANT (구함)</span>
              <p className="text-xs font-extrabold text-indigo-300">{swap.want}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
            <span>📍 {swap.loc}</span>
            <span>STATUS: {swap.status}</span>
          </div>
        </div>

        {/* Markdown Output Preview */}
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">GitHub 이슈/PR 댓글용 마크다운</label>
          <pre className="bg-slate-950 p-3 rounded-lg text-[11px] text-slate-300 font-mono overflow-x-auto max-h-28 border border-slate-800">
            {markdownText}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopy}
            className="py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs border border-slate-700 transition-all flex items-center justify-center space-x-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
            <span>{copied ? '복사 완료!' : 'GitHub 마크다운 복사'}</span>
          </button>

          <a
            href={tweetUrl}
            target="_blank"
            rel="noreferrer"
            className="py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-sky-600/20"
          >
            <Twitter className="w-4 h-4 fill-white" />
            <span>트위터에 공유하기</span>
          </a>
        </div>
      </div>
    </div>
  );
}
