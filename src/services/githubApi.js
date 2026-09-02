/**
 * GitHub REST API Client Service
 */

const BASE_URL = 'https://api.github.com';

export async function fetchGitHubUser(token) {
  try {
    const headers = token ? { Authorization: `token ${token}` } : {};
    const res = await fetch(`${BASE_URL}/user`, { headers });
    if (!res.ok) throw new Error('GitHub API 요청 실패 (토큰 확인 필요)');
    return await res.json();
  } catch (err) {
    console.error('fetchGitHubUser error:', err);
    throw err;
  }
}

export async function fetchRepoIssues(owner, repo, token = '') {
  try {
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      ...(token ? { Authorization: `token ${token}` } : {})
    };
    const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/issues?per_page=15&state=open`, { headers });
    if (!res.ok) {
      throw new Error(`[${owner}/${repo}] 리포지토리를 찾을 수 없거나 접근 권한이 없습니다.`);
    }
    const data = await res.json();
    return data.map(issue => {
      const isPR = !!issue.pull_request;
      const type = isPR ? 'INFO' : (issue.labels.some(l => l.name.toLowerCase().includes('bug') || l.name.toLowerCase().includes('urgent')) ? 'WAIT' : 'INFO');
      
      return {
        id: `gh-${issue.id}`,
        booth: `${owner}/${repo} #${issue.number}`,
        type: type,
        text: issue.title,
        time: new Date(issue.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        likes: issue.reactions ? issue.reactions['+1'] || 0 : issue.comments,
        repo: `${owner}/${repo}`,
        author: issue.user ? issue.user.login : 'github_user',
        avatar: issue.user ? issue.user.avatar_url : 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        html_url: issue.html_url
      };
    });
  } catch (err) {
    console.error('fetchRepoIssues error:', err);
    throw err;
  }
}

export function generateGitHubMarkdown(swap) {
  return `### 🔄 [GitRaid & Swap] ${swap.have} <-> ${swap.want}

| 구분 | 내용 |
| --- | --- |
| **양도 (Have)** | ${swap.have} |
| **구함 (Want)** | ${swap.want} |
| **접선 장소 (Location)** | 📍 ${swap.loc} |
| **태그 (Category)** | \`${swap.category || 'SWAP'}\` |
| **작성자 (Author)** | @${swap.author} |

> *Generated via GitRaid & Swap App*
`;
}
