import React, { useState } from 'react';
import {
  Search,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
  Grid,
  Sparkles,
  ChevronDown,
  X,
  ExternalLink
} from 'lucide-react';
import { NavTab, UserProfile } from '../types';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  user: UserProfile;
  unreadMessagesCount: number;
  unreadNotificationsCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  unreadMessagesCount,
  unreadNotificationsCount,
  searchQuery,
  setSearchQuery,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navItems = [
    { id: 'home' as NavTab, label: 'Home', icon: Home, badge: 0 },
    { id: 'network' as NavTab, label: 'My Network', icon: Users, badge: 0 },
    { id: 'jobs' as NavTab, label: 'Jobs', icon: Briefcase, badge: 0 },
    { id: 'messaging' as NavTab, label: 'Messaging', icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'notifications' as NavTab, label: 'Notifications', icon: Bell, badge: unreadNotificationsCount },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 h-[52px] flex items-center justify-center shrink-0">
      <div className="flex items-center w-full max-w-[1024px] justify-between gap-4">
        {/* Left section: Logo & Search */}
        <div className="flex items-center space-x-2 flex-1 max-w-sm sm:max-w-md">
          {/* LinkedIn Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="bg-[#0A66C2] p-1 rounded flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#004182] transition-colors"
            title="LinkedIn Home"
            id="linkedin-logo-btn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </button>

          {/* Search Box */}
          <div className="relative flex-1">
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="bg-[#EDF3F8] w-full pl-10 pr-8 py-1.5 rounded text-sm text-gray-800 focus:outline-none border-transparent focus:border-gray-400 border transition-all"
                id="navbar-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-gray-400 hover:text-gray-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Search Dropdown Preview */}
            {isSearchFocused && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 text-xs">
                <div className="px-3 py-1 font-semibold text-gray-500 uppercase tracking-wider text-[10px]">
                  Search Results for "{searchQuery}"
                </div>
                <div
                  onClick={() => { setActiveTab('home'); setIsSearchFocused(false); }}
                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700"
                >
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                  <span>Search all posts containing <strong>"{searchQuery}"</strong></span>
                </div>
                <div
                  onClick={() => { setActiveTab('jobs'); setIsSearchFocused(false); }}
                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700"
                >
                  <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                  <span>Filter open jobs for <strong>"{searchQuery}"</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right section: Navigation items */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-tab flex flex-col items-center cursor-pointer transition-colors focus:outline-none ${
                  isActive ? 'text-[#0A66C2]' : 'text-gray-500 hover:text-black'
                }`}
                id={`nav-tab-${item.id}`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  {item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center leading-none">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium mt-0.5 hidden sm:inline whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}

          <div className="border-l border-gray-200 h-8 mx-1 hidden sm:block"></div>

          {/* Profile 'Me' menu */}
          <div className="relative flex flex-col items-center text-gray-500 hover:text-black cursor-pointer">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex flex-col items-center justify-center text-gray-500 hover:text-black focus:outline-none"
              id="nav-me-menu-btn"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-300 overflow-hidden">
                <img src={user.avatar} alt="me" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-medium mt-0.5 flex items-center">
                Me <ChevronDown className="w-2.5 h-2.5 ml-0.5" />
              </span>
            </button>

            {/* Profile Menu Popover */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-3 z-50 text-gray-800 text-xs">
                <div className="px-3 pb-3 border-b border-gray-100 flex items-center gap-2.5">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{user.name}</h4>
                    <p className="text-[11px] text-gray-500 line-clamp-1">{user.title}</p>
                  </div>
                </div>
                <div className="p-2 border-b border-gray-100">
                  <button
                    onClick={() => {
                      setActiveTab('home');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-center border border-[#0A66C2] text-[#0A66C2] font-semibold py-1 rounded-full hover:bg-blue-50 transition-colors"
                  >
                    View Profile
                  </button>
                </div>
                <div className="py-1">
                  <div className="px-3 py-1 font-semibold text-gray-900 text-xs">Account</div>
                  <a href="#settings" className="block px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:underline">
                    Settings & Privacy
                  </a>
                  <a href="#help" className="block px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:underline">
                    Help & Support
                  </a>
                </div>
                <div className="pt-1 border-t border-gray-100">
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full text-left px-3 py-1.5 text-gray-600 hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
