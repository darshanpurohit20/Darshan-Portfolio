export async function getGitHubData(username: string) {
  try {
    const headers: Record<string, string> = {};
    
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const fetchOptions = {
      headers,
      next: { revalidate: 3600 }
    } as RequestInit & { next?: { revalidate: number } };

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, fetchOptions),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, fetchOptions),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error('Failed to fetch GitHub data');
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    return { user, repos };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return { user: null, repos: [] };
  }
}
