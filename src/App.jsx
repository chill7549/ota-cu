import React, { useState } from 'react';
import Header from './components/Header';
import NavigationTabs from './components/NavigationTabs';
import CongestionCard from './components/RaidTab/CongestionCard';
import FilterChips from './components/RaidTab/FilterChips';
import RaidFeed from './components/RaidTab/RaidFeed';
import CreateRaidModal from './components/RaidTab/CreateRaidModal';

import SwapSearchBar from './components/SwapTab/SwapSearchBar';
import SwapFeed from './components/SwapTab/SwapFeed';
import CreateSwapModal from './components/SwapTab/CreateSwapModal';
import CardGeneratorModal from './components/SwapTab/CardGeneratorModal';

import GitHubConnectModal from './components/GitHub/GitHubConnectModal';
import Toast from './components/Common/Toast';

import { initialRaidData, initialSwapData, initialCongestion } from './services/mockData';
import { Plus, MapPin, X, Github, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('raid'); // 'raid' or 'swap'
  const [activeFilter, setActiveFilter] = useState('ALL');
  
  // Datasets
  const [raidData, setRaidData] = useState(initialRaidData);
  const [swapData, setSwapData] = useState(initialSwapData);
  const [congestion, setCongestion] = useState(initialCongestion);

  // Search & Filters for Swap
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // GitHub Auth & Active Repo
  const [userToken, setUserToken] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [activeRepo, setActiveRepo] = useState('');

  // Modals state
  const [isCreateRaidOpen, setIsCreateRaidOpen] = useState(false);
  const [isCreateSwapOpen, setIsCreateSwapOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [shareSwapCard, setShareSwapCard] = useState(null);
  const [pinnedLocationSwap, setPinnedLocationSwap] = useState(null);

  // Toast
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // --- Handlers ---
  const handleLikeRaid = (id) => {
    setRaidData(prev => 
      prev.map(item => item.id === id ? { ...item, likes: item.likes + 1 } : item)
    );
    showToast('도움돼요 추천이 반영되었습니다!');
  };

  const handleAddRaid = (newRaid) => {
    const createdItem = {
      id: Date.now(),
      booth: newRaid.booth,
      type: newRaid.type,
      text: newRaid.text,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      likes: 1,
      repo: newRaid.repo || activeRepo || 'facebook/react',
      author: userProfile ? userProfile.login : 'anonymous_dev',
      avatar: userProfile ? userProfile.avatar_url : 'https://avatars.githubusercontent.com/u/9919?v=4'
    };

    setRaidData([createdItem, ...raidData]);
    showToast('새로운 실시간 레이드 제보가 등록되었습니다!');
  };

  const handleAddSwap = (newSwap) => {
    const createdSwap = {
      id: Date.now(),
      have: newSwap.have,
      want: newSwap.want,
      loc: newSwap.loc,
      category: newSwap.category,
      isBoosted: newSwap.isBoosted,
      status: 'OPEN',
      author: userProfile ? userProfile.login : 'dev_swapper',
      avatar: userProfile ? userProfile.avatar_url : 'https://avatars.githubusercontent.com/u/9919?v=4',
      time: '방금 전'
    };

    setSwapData([createdSwap, ...swapData]);
    showToast('내 굿즈/코드 교환 글이 등록되었습니다!');
  };

  const handleToggleSwapStatus = (id) => {
    setSwapData(prev =>
      prev.map(s => s.id === id ? { ...s, status: s.status === 'OPEN' ? 'COMPLETED' : 'OPEN' } : s)
    );
    showToast('교환 상태가 변경되었습니다.');
  };

  const handleConnectGitHubToken = (token, user) => {
    setUserToken(token);
    setUserProfile(user);
  };

  const handleSelectRepoIssues = (repoName, issues) => {
    setActiveRepo(repoName);
    if (issues && issues.length > 0) {
      setRaidData(prev => [...issues, ...prev]);
    }
  };

  const handleResetRepo = () => {
    setActiveRepo('');
    showToast('리포지토리 필터가 해제되었습니다.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-0 md:p-6 font-sans">
      
      {/* Background ambient lighting */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Container (Mobile App Frame on Desktop) */}
      <div className="w-full max-w-md h-screen md:h-[880px] bg-slate-900 flex flex-col relative shadow-2xl md:rounded-3xl overflow-hidden border-0 md:border md:border-slate-800">
        
        {/* Header */}
        <Header 
          userProfile={userProfile}
          onOpenConnect={() => setIsGitHubModalOpen(true)}
          activeRepo={activeRepo}
          onResetRepo={handleResetRepo}
        />

        {/* Navigation Tabs */}
        <NavigationTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 space-y-4 relative scrollbar-hide">
          
          {/* TAB 1: RAID FEED */}
          {activeTab === 'raid' && (
            <div className="space-y-4">
              <CongestionCard congestion={congestion} />
              
              <FilterChips 
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />

              <RaidFeed 
                raidData={raidData}
                onLike={handleLikeRaid}
                activeFilter={activeFilter}
              />
            </div>
          )}

          {/* TAB 2: SWAP FEED */}
          {activeTab === 'swap' && (
            <div className="space-y-4">
              <SwapSearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              <SwapFeed 
                swapData={swapData}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                onToggleStatus={handleToggleSwapStatus}
                onPinLocation={(swap) => setPinnedLocationSwap(swap)}
                onShareCard={(swap) => setShareSwapCard(swap)}
              />
            </div>
          )}

        </main>

        {/* Bottom Floating Action Bar & Button */}
        {activeTab === 'raid' ? (
          <button 
            onClick={() => setIsCreateRaidOpen(true)}
            className="absolute bottom-6 right-5 w-14 h-14 bg-gradient-to-tr from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 text-white rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center text-2xl transition-all duration-200 active:scale-90 z-20 border border-indigo-400/40"
            title="실시간 레이드 제보하기"
          >
            <Plus className="w-7 h-7" />
          </button>
        ) : (
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <button 
              onClick={() => setIsCreateSwapOpen(true)}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3.5 rounded-2xl font-bold text-xs shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2 border border-indigo-400/30 transition-all active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>🔄 내 굿즈/코드 교환 글 올리기</span>
            </button>
            <p className="text-center text-[10px] text-slate-500 mt-1.5 font-medium">
              트위터/깃허브 공유용 카드가 자동 생성됩니다
            </p>
          </div>
        )}

      </div>

      {/* --- MODALS --- */}
      
      {/* Create Raid Modal */}
      <CreateRaidModal 
        isOpen={isCreateRaidOpen}
        onClose={() => setIsCreateRaidOpen(false)}
        onSubmitRaid={handleAddRaid}
        activeRepo={activeRepo}
      />

      {/* Create Swap Modal */}
      <CreateSwapModal 
        isOpen={isCreateSwapOpen}
        onClose={() => setIsCreateSwapOpen(false)}
        onSubmitSwap={handleAddSwap}
      />

      {/* Card Generator Modal */}
      <CardGeneratorModal 
        isOpen={!!shareSwapCard}
        onClose={() => setShareSwapCard(null)}
        swap={shareSwapCard}
        onShowToast={showToast}
      />

      {/* GitHub Connect Modal */}
      <GitHubConnectModal 
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        onConnectToken={handleConnectGitHubToken}
        onSelectRepo={handleSelectRepoIssues}
        userProfile={userProfile}
        activeRepo={activeRepo}
        onShowToast={showToast}
      />

      {/* Location Pin Modal */}
      {pinnedLocationSwap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-2xl p-5 shadow-2xl space-y-4 relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-bold text-slate-100">접선 장소 핑 (Location Pin)</h3>
              </div>
              <button onClick={() => setPinnedLocationSwap(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-center">
              <span className="text-3xl">📍</span>
              <p className="text-sm font-extrabold text-indigo-300">{pinnedLocationSwap.loc}</p>
              <p className="text-xs text-slate-400">
                작성자: <span className="text-slate-200 font-bold">@{pinnedLocationSwap.author}</span>
              </p>
            </div>

            <button 
              onClick={() => {
                navigator.clipboard.writeText(pinnedLocationSwap.loc);
                showToast('접선 장소가 복사되었습니다!');
                setPinnedLocationSwap(null);
              }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-md"
            >
              장소 텍스트 복사하기
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <Toast message={toastMessage} />

    </div>
  );
}
