import React, { useState } from 'react';
import { UserProfile, Story, Post, ConnectionCandidate, JobListing, NewsItem } from '../types';
import { LeftSidebar } from './LeftSidebar';
import { StoryBar } from './StoryBar';
import { PostComposer } from './PostComposer';
import { PostCard } from './PostCard';
import { RightSidebar } from './RightSidebar';
import { SlidersHorizontal } from 'lucide-react';

interface FeedViewProps {
  currentUser: UserProfile;
  stories: Story[];
  posts: Post[];
  connections: ConnectionCandidate[];
  jobs: JobListing[];
  news: NewsItem[];
  searchQuery: string;
  onMarkStorySeen: (storyId: string) => void;
  onAddStory: (story: Story) => void;
  onAddPost: (post: Post) => void;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onToggleConnect: (candidateId: string) => void;
  onToggleSaveJob: (jobId: string) => void;
  onNavigateJobsTab: () => void;
}

export const FeedView: React.FC<FeedViewProps> = ({
  currentUser,
  stories,
  posts,
  connections,
  jobs,
  news,
  searchQuery,
  onMarkStorySeen,
  onAddStory,
  onAddPost,
  onToggleLike,
  onAddComment,
  onToggleConnect,
  onToggleSaveJob,
  onNavigateJobsTab,
}) => {
  const [sortBy, setSortBy] = useState<'top' | 'recent'>('top');
  const [hashtagFilter, setHashtagFilter] = useState<string | null>(null);

  // Filter posts by search query or hashtag if set
  const filteredPosts = posts.filter(post => {
    if (hashtagFilter) {
      return post.content.toLowerCase().includes(hashtagFilter.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        post.content.toLowerCase().includes(q) ||
        post.authorName.toLowerCase().includes(q) ||
        post.authorTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-[1024px] mx-auto p-3 sm:p-4 grid grid-cols-12 gap-4 sm:gap-5">
      {/* Column 1: Left Sidebar Profile Card & Recent (3 cols) */}
      <aside className="col-span-12 md:col-span-3 space-y-3">
        <LeftSidebar
          user={currentUser}
          onFilterByHashtag={(tag) => setHashtagFilter(tag === hashtagFilter ? null : tag)}
        />
      </aside>

      {/* Column 2: Main Center Feed (6 cols on desktop, 9 cols on tablet) */}
      <section className="col-span-12 md:col-span-9 lg:col-span-6 flex flex-col gap-3">
        {/* Active Hashtag Filter Banner if active */}
        {hashtagFilter && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 flex items-center justify-between text-xs text-[#0A66C2]">
            <span>Filtering posts with <strong>#{hashtagFilter}</strong></span>
            <button
              onClick={() => setHashtagFilter(null)}
              className="font-semibold hover:underline cursor-pointer"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Stories Horizontal Status Bar */}
        <StoryBar
          stories={stories}
          onMarkStorySeen={onMarkStorySeen}
          onAddStory={onAddStory}
        />

        {/* Post Composer */}
        <PostComposer
          user={currentUser}
          onAddPost={onAddPost}
        />

        {/* Sort Divider */}
        <div className="flex items-center justify-between px-1 py-1">
          <div className="h-[1px] flex-1 bg-gray-200" />
          <div className="flex items-center gap-1.5 px-3 text-xs text-gray-500 font-medium">
            <span>Sort by:</span>
            <button
              onClick={() => setSortBy(sortBy === 'top' ? 'recent' : 'top')}
              className="font-semibold text-gray-800 hover:text-[#0A66C2] flex items-center gap-1 cursor-pointer"
            >
              <span>{sortBy === 'top' ? 'Top' : 'Recent'}</span>
              <SlidersHorizontal className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        </div>

        {/* List of Posts */}
        <div className="space-y-3">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={currentUser}
                onToggleLike={onToggleLike}
                onAddComment={onAddComment}
              />
            ))
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500 text-sm">
              No posts found matching "{searchQuery || hashtagFilter}". Try searching for another topic!
            </div>
          )}
        </div>
      </section>

      {/* Column 3: Right Sidebar Connections, Jobs & News (3 cols) */}
      <aside className="hidden lg:block lg:col-span-3 space-y-3 flex flex-col">
        <RightSidebar
          connections={connections}
          onToggleConnect={onToggleConnect}
          jobs={jobs}
          onToggleSaveJob={onToggleSaveJob}
          news={news}
          onNavigateJobsTab={onNavigateJobsTab}
        />
      </aside>
    </div>
  );
};
