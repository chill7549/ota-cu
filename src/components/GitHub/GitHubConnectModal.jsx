import React, { useState } from 'react';
import { X, Github, Key, Search, RefreshCw, CheckCircle } from 'lucide-react';
import { fetchGitHubUser, fetchRepoIssues } from '../../services/githubApi';

export default function GitHubConnectModal({ 
  isOpen, 
  onClose, 
  onConnectToken, 
  onSelectRepo, 
  userProfile, 
  activeRepo,
  onShowToast
}) {
  const [tokenInput, setTokenInput] = useState('');
  const [repoSearch, setRepoSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const popularRepos = [
    'facebook/react',
    'vercel/next.js',
    'tailwindlabs/tailwindcss',
    'vitejs/vite',
    'python/cpython'
  ];

  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;

    setLoading(true);
    setErrorMsg('');
    try {
      const user = await fetchGitHubUser(tokenInput.trim());
      onConnectToken(tokenInput.trim(), user);
      if (onShowToast) onShowToast(`GitHub 계정 (@${user.login}) 연동 완료!`);
      setTokenInput('');
      onClose();
    } catch (err) {
      setErrorMsg(err.message || '인증에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRepoSubmit = async (repoName) => {
    const target = repoName || repoSearch;
    if (!target.trim()) return;

    setLoading(true);
    setErrorMsg('');
    try {
      const parts = target.trim().split('/');
      if (parts.length !== 2) {
        throw new Error("리포지토리 형식은 'owner/repo' 이어야 합니다.");
      }
      const issues = await fetchRepoIssues(parts[0], parts[1]);
      onSelectRepo(target.trim(), issues);
      if (onShowToast) onShowToast(`[${target.trim()}] 실시간 이슈 ${issues.length}개를 가져왔습니다!`);
      setRepoSearch('');
      onClose();
    } catch (err) {
      setErrorMsg(err.message || '리포지토리를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 relative">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Github className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-100">GitHub API & 리포지토리 연동</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl text-rose-300 text-xs font-semibold">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Section 1: Connect PAT Token */}
        <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
          <label className="text-xs font-bold text-slate-200 flex items-center space-x-1">
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>GitHub Personal Access Token (PAT) 연동</span>
          </label>
          <p className="text-[10px] text-slate-400">
            토큰 연동 시 깃허브 아바타 프로필 동기화 및 실시간 Issue 발행이 가능합니다.
          </p>

          <form onSubmit={handleTokenSubmit} className="flex space-x-2 pt-1">
            <input
              type="password"
              placeholder="ghp_xxxxxxxxxxxx"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50"
            >
              {loading ? '연동 중...' : '토큰 연동'}
            </button>
          </form>
        </div>

        {/* Section 2: Live GitHub Repo Issue Import */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-200 flex items-center space-x-1">
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <span>실시간 GitHub 공개 이슈 타임라인으로 가져오기</span>
          </label>

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="owner/repo (예: facebook/react)"
              value={repoSearch}
              onChange={(e) => setRepoSearch(e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              type="button"
              onClick={() => handleRepoSubmit()}
              disabled={loading}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-indigo-300 rounded-lg text-xs font-bold transition-all disabled:opacity-50 flex items-center space-x-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>동기화</span>
            </button>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">추천 리포지토리:</span>
            <div className="flex flex-wrap gap-1.5">
              {popularRepos.map((r) => (
                <button
                  key={r}
                  onClick={() => handleRepoSubmit(r)}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-all ${
                    activeRepo === r
                      ? 'bg-indigo-950 text-indigo-300 border-indigo-500/60 font-bold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
