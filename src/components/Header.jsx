import React from 'react';
import { Github, Zap, User, Key, CheckCircle } from 'lucide-react';

export default function Header({ 
  userProfile, 
  onOpenConnect, 
  activeRepo,
  onResetRepo
}) {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md px-4 py-3 border-b border-slate-800 flex justify-between items-center sticky top-0 z-30 shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-500/20 font-black text-xl">
          🐙
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent tracking-tight">
              GitRaid
            </h1>
            <span className="text-[10px] px-1.5 py-0.5 bg-indigo-950 text-indigo-300 font-bold border border-indigo-700/50 rounded-md">
              v2.0 GH
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium flex items-center space-x-1">
            <span>GitDev Conf 2026</span>
            {activeRepo && (
              <span className="text-indigo-400 bg-indigo-950/60 px-1.5 py-0.2 rounded text-[11px] border border-indigo-800/40">
                • {activeRepo}
                <button onClick={onResetRepo} className="ml-1 text-slate-400 hover:text-white">✕</button>
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onOpenConnect}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
            userProfile 
              ? 'bg-indigo-950/80 border border-indigo-500/40 text-indigo-200 hover:bg-indigo-900' 
              : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
        >
          <Github className="w-3.5 h-3.5 text-indigo-400" />
          {userProfile ? (
            <div className="flex items-center space-x-1">
              <span className="max-w-[70px] truncate">{userProfile.login}</span>
              <CheckCircle className="w-3 h-3 text-emerald-400" />
            </div>
          ) : (
            <span className="flex items-center space-x-1">
              <Key className="w-3 h-3 text-amber-400" />
              <span>GH 연동</span>
            </span>
          )}
        </button>

        {userProfile && (
          <img 
            src={userProfile.avatar_url} 
            alt={userProfile.login}
            className="w-8 h-8 rounded-full border border-indigo-500/50 shadow-sm"
          />
        )}
      </div>
    </header>
  );
}
