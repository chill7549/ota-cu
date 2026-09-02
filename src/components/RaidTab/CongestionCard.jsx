import React from 'react';
import { Clock, Ticket, GitPullRequest, GitIssueOpened, ShieldCheck } from 'lucide-react';

export default function CongestionCard({ congestion }) {
  return (
    <div className="glass-panel p-4 rounded-xl shadow-lg border border-indigo-500/20 space-y-3 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">현재 현장 & 리포지토리 혼잡도</p>
          </div>
          <h2 className="text-lg font-bold text-slate-100 mt-0.5 flex items-center space-x-2">
            <span>입장 대기 {congestion.waitMinutes}분 내외</span>
          </h2>
        </div>

        <div className="text-right">
          <p className="text-[11px] text-slate-400 mb-0.5 font-medium flex items-center justify-end space-x-1">
            <Ticket className="w-3 h-3 text-emerald-400" />
            <span>티켓 상태</span>
          </p>
          <span className="px-2.5 py-1 bg-emerald-500/15 text-emerald-300 text-xs font-bold rounded-md border border-emerald-500/30 inline-block">
            {congestion.ticketStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
        <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
          <p className="text-[10px] text-slate-400 flex items-center justify-center space-x-1">
            <GitIssueOpened className="w-3 h-3 text-amber-400" />
            <span>Open Issues</span>
          </p>
          <p className="text-sm font-extrabold text-amber-400 mt-0.5">{congestion.openIssuesCount}개</p>
        </div>

        <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
          <p className="text-[10px] text-slate-400 flex items-center justify-center space-x-1">
            <GitPullRequest className="w-3 h-3 text-purple-400" />
            <span>Active PRs</span>
          </p>
          <p className="text-sm font-extrabold text-purple-400 mt-0.5">{congestion.activePRsCount}개</p>
        </div>

        <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
          <p className="text-[10px] text-slate-400 flex items-center justify-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>CI Build</span>
          </p>
          <p className="text-xs font-bold text-emerald-400 mt-1">{congestion.ciStatus}</p>
        </div>
      </div>
    </div>
  );
}
