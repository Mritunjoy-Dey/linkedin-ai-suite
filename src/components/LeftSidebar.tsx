import React, { useState } from 'react';
import { Bookmark, Star, Hash, ChevronDown, ChevronUp, Users, Calendar } from 'lucide-react';
import { UserProfile } from '../types';

interface LeftSidebarProps {
  user: UserProfile;
  onFilterByHashtag?: (hashtag: string) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ user, onFilterByHashtag }) => {
  const [isRecentExpanded, setIsRecentExpanded] = useState(true);

  const recentHashtags = [
    'AI & Product Management',
    'Silicon Valley Network',
    'UX Design Trends',
    'Frontend Infra',
    'Systems Design'
  ];

  return (
    <aside className="space-y-3 w-full">
      {/* Primary Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header Cover Banner */}
        <div className="h-14 bg-[#A0B4B7] relative">
          {user.banner && (
            <img
              src={user.banner}
              alt="Profile Banner"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Profile Avatar & Info */}
        <div className="-mt-8 flex justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden bg-white shrink-0 shadow-xs">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center p-3 border-b border-gray-100">
          <h2 className="font-semibold text-base text-gray-900 hover:underline cursor-pointer">
            {user.name}
          </h2>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {user.title}
          </p>
        </div>

        {/* Analytics & Stats */}
        <div className="p-3 text-xs space-y-2 border-b border-gray-100">
          <div className="flex justify-between items-center hover:bg-gray-50 p-1 rounded transition-colors cursor-pointer">
            <span className="text-gray-500 font-semibold">Profile viewers</span>
            <span className="text-[#0A66C2] font-semibold">{user.profileViewers.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center hover:bg-gray-50 p-1 rounded transition-colors cursor-pointer">
            <span className="text-gray-500 font-semibold">Post impressions</span>
            <span className="text-[#0A66C2] font-semibold">{user.postImpressions.toLocaleString()}</span>
          </div>
        </div>

        {/* Premium Callout */}
        <a
          href="#premium"
          className="p-3 flex items-center gap-2 hover:bg-amber-50/50 transition-colors cursor-pointer block border-b border-gray-100 text-xs"
        >
          <div className="w-4 h-4 rounded bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-[10px] shrink-0">
            ★
          </div>
          <span className="text-xs text-gray-800 font-semibold hover:text-[#0A66C2]">
            Premium tools — try free
          </span>
        </a>

        {/* Saved items */}
        <div className="p-3 flex items-center gap-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer">
          <Bookmark className="w-4 h-4 text-gray-500" />
          <span>Saved items</span>
        </div>
      </div>

      {/* Secondary Card: Recent Groups & Hashtags */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 hidden md:block">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-900 mb-3">
          <span>Recent Groups</span>
          <button
            onClick={() => setIsRecentExpanded(!isRecentExpanded)}
            className="text-gray-500 hover:text-gray-800 p-0.5 rounded"
          >
            {isRecentExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {isRecentExpanded && (
          <ul className="space-y-2 text-xs font-semibold text-gray-500">
            {recentHashtags.map((tag) => (
              <li key={tag}>
                <button
                  onClick={() => onFilterByHashtag && onFilterByHashtag(tag)}
                  className="w-full flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-1 py-0.5 rounded text-left transition-colors truncate"
                >
                  <span className="mr-2 text-gray-400">#</span>
                  <span className="truncate">{tag}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};
