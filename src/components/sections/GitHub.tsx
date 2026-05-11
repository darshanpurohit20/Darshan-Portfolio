'use client';

import { motion } from 'framer-motion';
import { Github as GithubIcon, Star, GitFork, ExternalLink } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useEffect, useState } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

export function GitHub() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/darshanpurohit20'),
          fetch('https://api.github.com/users/darshanpurohit20/repos?sort=updated&per_page=6'),
        ]);

        if (userRes.ok && reposRes.ok) {
          const userData = await userRes.json();
          const reposData = await reposRes.json();
          setUser(userData);
          setRepos(reposData);
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <section id="github" className="py-32 px-6 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Open Source"
        title="Code in the open."
        subtitle="Building and sharing on GitHub."
      />

      {/* Stats */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-6 justify-center mb-12"
        >
          <div className="px-6 py-4 rounded-xl border border-white/[0.06] bg-[#0d0d0f] text-center">
            <div className="text-2xl font-bold text-purple-400">{user.public_repos}</div>
            <div className="text-xs text-zinc-500">Repositories</div>
          </div>
          <div className="px-6 py-4 rounded-xl border border-white/[0.06] bg-[#0d0d0f] text-center">
            <div className="text-2xl font-bold text-purple-400">{user.followers}</div>
            <div className="text-xs text-zinc-500">Followers</div>
          </div>
          <div className="px-6 py-4 rounded-xl border border-white/[0.06] bg-[#0d0d0f] text-center">
            <div className="text-2xl font-bold text-purple-400">{user.following}</div>
            <div className="text-xs text-zinc-500">Following</div>
          </div>
        </motion.div>
      )}

      {/* Repos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          // Skeleton loading
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/[0.06] bg-[#0d0d0f] animate-pulse">
              <div className="h-5 bg-white/10 rounded w-3/4 mb-3" />
              <div className="h-4 bg-white/5 rounded w-full mb-2" />
              <div className="h-4 bg-white/5 rounded w-2/3" />
            </div>
          ))
        ) : (
          repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group p-6 rounded-xl border border-white/[0.06] bg-[#0d0d0f] hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-white group-hover:text-purple-400 transition-colors">
                  {repo.name}
                </h4>
                <ExternalLink size={14} className="text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-zinc-500 line-clamp-2 mb-4 min-h-[40px]">
                {repo.description || 'No description available'}
              </p>
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star size={12} />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} />
                  {repo.forks_count}
                </span>
              </div>
            </motion.a>
          ))
        )}
      </div>

      {/* View All Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <a
          href="https://github.com/darshanpurohit20"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/25 transition-all"
        >
          <GithubIcon size={18} />
          View All Repositories
        </a>
      </motion.div>
    </section>
  );
}
