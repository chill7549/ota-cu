export const initialRaidData = [
  { 
    id: 1, 
    booth: 'A-01 (React 19 Lab)', 
    type: 'SOLDOUT', 
    text: 'React Compiler 시연 세션 한정판 옥토캣 아크릴 키링 현장 수량 완판입니다! 🎁', 
    time: '11:24', 
    likes: 42,
    repo: 'facebook/react',
    author: 'dev_octo',
    avatar: 'https://avatars.githubusercontent.com/u/69631?v=4'
  },
  { 
    id: 2, 
    booth: 'B-12 (Vite & Rust)', 
    type: 'INFO', 
    text: '메인 커미터 점심 식사로 12시 30분까지 부스 데스크 비움. 깃허브 이슈 질의응답은 QR코드로 가능합니다.', 
    time: '11:15', 
    likes: 18,
    repo: 'vitejs/vite',
    author: 'evan_fan',
    avatar: 'https://avatars.githubusercontent.com/u/11247099?v=4'
  },
  { 
    id: 3, 
    booth: '입구 / 메인홀', 
    type: 'WAIT', 
    text: '현재 FEConf 2026 현장 등록 대기열 30분 이상 소요됩니다! 얼리버드 QR 준비해주세요.', 
    time: '11:00', 
    likes: 89,
    repo: 'feconf/2026',
    author: 'event_master',
    avatar: 'https://avatars.githubusercontent.com/u/583231?v=4'
  },
  { 
    id: 4, 
    booth: 'C-05 (Tailwind CSS)', 
    type: 'WAIT', 
    text: 'Tailwind v4 알파 버그 바시(Bug Bash) 챌린지 선착순 5명 남아있습니다!', 
    time: '10:48', 
    likes: 55,
    repo: 'tailwindlabs/tailwindcss',
    author: 'adam_dev',
    avatar: 'https://avatars.githubusercontent.com/u/4323180?v=4'
  },
  { 
    id: 5, 
    booth: 'D-08 (Python PyCon)', 
    type: 'INFO', 
    text: '파이썬 3.13 GIL 제거 후기 발표 자료 깃허브 Gist에 공유되었습니다.', 
    time: '10:30', 
    likes: 67,
    repo: 'python/cpython',
    author: 'py_master',
    avatar: 'https://avatars.githubusercontent.com/u/1525981?v=4'
  }
];

export const initialSwapData = [
  { 
    id: 1, 
    have: 'React 19 Compiler 성능 디버깅 & 코드 리뷰', 
    want: 'Rust WASM 메모리 바인딩 코드 리뷰', 
    loc: '1층 카페테리아 3번 테이블', 
    isBoosted: true, 
    status: 'OPEN',
    author: 'frontend_ninja',
    avatar: 'https://avatars.githubusercontent.com/u/1024025?v=4',
    time: '방금 전',
    category: 'CODE_REVIEW'
  },
  { 
    id: 2, 
    body: '공식 깃허브 옥토캣 한정판 스티커 세트',
    have: 'GitHub Universe 2025 스티커 팩', 
    want: 'Vercel / Next.js 금속 에나멜 핀 배지', 
    loc: '2홀 출구 물품보관소 앞', 
    isBoosted: false, 
    status: 'OPEN',
    author: 'sticker_collector',
    avatar: 'https://avatars.githubusercontent.com/u/2041385?v=4',
    time: '15분 전',
    category: 'SWAG'
  },
  { 
    id: 3, 
    have: 'Next.js 15 App Router 쿠키 세션 에러 해결 지원', 
    want: 'Docker Multi-stage 빌드 속도 최적화 팁', 
    loc: 'aT센터 2층 야외 벤치', 
    isBoosted: false, 
    status: 'COMPLETED',
    author: 'fullstack_pro',
    avatar: 'https://avatars.githubusercontent.com/u/387413?v=4',
    time: '1시간 전',
    category: 'TASK_BOUNTY'
  },
  { 
    id: 4, 
    have: 'GitHub Copilot Enterprise 1달 체험 쿠폰 코드', 
    want: 'Good First Issue 레이드 함께 풀 프론트엔드 동료', 
    loc: '디스코드 채널 / 원격', 
    isBoosted: true, 
    status: 'OPEN',
    author: 'hackathon_lead',
    avatar: 'https://avatars.githubusercontent.com/u/592301?v=4',
    time: '2시간 전',
    category: 'PAIR_PROG'
  }
];

export const initialCongestion = {
  eventName: 'GitDev Conference 2026 @ aT Center',
  dates: '9/4(목) ~ 9/6(토)',
  waitMinutes: 20,
  ticketStatus: '현장 선착순 수령 중',
  openIssuesCount: 42,
  activePRsCount: 18,
  ciStatus: 'ALL PASSED 🟢'
};
