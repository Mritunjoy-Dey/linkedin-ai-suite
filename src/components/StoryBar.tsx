import React, { useState } from 'react';
import { Plus, X, Image as ImageIcon } from 'lucide-react';
import { Story } from '../types';
import { StoryViewerModal } from './StoryViewerModal';

interface StoryBarProps {
  stories: Story[];
  onMarkStorySeen: (storyId: string) => void;
  onAddStory: (newStory: Story) => void;
}

export const StoryBar: React.FC<StoryBarProps> = ({
  stories,
  onMarkStorySeen,
  onAddStory,
}) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStoryText, setNewStoryText] = useState('');
  const [newStoryBg, setNewStoryBg] = useState('from-blue-600 to-indigo-800');

  const gradients = [
    'from-blue-600 to-indigo-800',
    'from-purple-600 to-pink-600',
    'from-emerald-600 to-teal-800',
    'from-amber-600 to-orange-700',
    'from-slate-700 to-slate-900'
  ];

  const handleStoryClick = (story: Story) => {
    if (story.isUserStory) {
      setShowAddModal(true);
    } else {
      setSelectedStory(story);
      onMarkStorySeen(story.id);
    }
  };

  const handleCreateStory = () => {
    if (!newStoryText.trim()) return;

    const userStory = stories.find(s => s.isUserStory);
    const created: Story = {
      id: `story_user_${Date.now()}`,
      userId: 'user_me',
      userName: 'Mritunjoy Dey',
      userAvatar: userStory?.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      userTitle: 'Senior Software Engineer · Figma',
      textContent: newStoryText,
      bgGradient: newStoryBg,
      timeAgo: 'Just now',
      isSeen: false
    };

    onAddStory(created);
    setNewStoryText('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center space-x-2 overflow-x-auto shrink-0 custom-scrollbar">
      {stories.map((story) => {
        if (story.isUserStory) {
          return (
            <div
              key={story.id}
              onClick={() => handleStoryClick(story)}
              className="flex flex-col items-center shrink-0 space-y-1 relative cursor-pointer group"
              title="Add to story"
            >
              <div className="w-14 h-14 rounded-full p-[2px] bg-white border border-dashed border-gray-400 flex items-center justify-center">
                <img
                  src={story.userAvatar}
                  alt={story.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="absolute top-9 right-0 bg-[#0A66C2] text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                <span className="text-sm leading-none">+</span>
              </div>
              <span className="text-[10px] text-gray-700 font-medium">Your Story</span>
            </div>
          );
        }

        const isUnseen = !story.isSeen;

        return (
          <div
            key={story.id}
            onClick={() => handleStoryClick(story)}
            className="flex flex-col items-center shrink-0 space-y-1 cursor-pointer group"
            title={`${story.userName}'s story`}
          >
            <div
              className={`story-ring w-14 h-14 rounded-full p-[2px] transition-transform group-hover:scale-105 ${
                isUnseen
                  ? 'bg-gradient-to-tr from-blue-600 to-blue-400'
                  : 'bg-gray-300'
              }`}
            >
              <img
                src={story.userAvatar}
                alt={story.userName}
                className="w-full h-full rounded-full border-2 border-white object-cover"
              />
            </div>
            <span className="text-[10px] text-gray-700 font-medium truncate max-w-[64px] text-center">
              {story.userName.split(' ')[0]} {story.userName.split(' ')[1] ? story.userName.split(' ')[1][0] + '.' : ''}
            </span>
          </div>
        );
      })}

      {/* Story Viewer Overlay */}
      {selectedStory && (
        <StoryViewerModal
          story={selectedStory}
          allStories={stories}
          onClose={() => setSelectedStory(null)}
          onSelectStory={(s) => {
            setSelectedStory(s);
            onMarkStorySeen(s.id);
          }}
        />
      )}

      {/* Add Story Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-2xl relative border border-gray-200">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-gray-900 mb-3">Create a Story</h3>

            <div className={`h-48 rounded-xl bg-gradient-to-br ${newStoryBg} p-4 flex items-center justify-center text-center text-white font-medium text-base mb-4 shadow-inner`}>
              {newStoryText || 'Type your story message below...'}
            </div>

            {/* Gradient Selector */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-gray-500 font-medium">Theme:</span>
              {gradients.map((grad) => (
                <button
                  key={grad}
                  onClick={() => setNewStoryBg(grad)}
                  className={`w-6 h-6 rounded-full bg-gradient-to-br ${grad} border-2 ${
                    newStoryBg === grad ? 'border-gray-900 scale-110' : 'border-transparent'
                  }`}
                />
              ))}
            </div>

            <textarea
              placeholder="What do you want to share in your story?"
              value={newStoryText}
              onChange={(e) => setNewStoryText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#0A66C2] focus:outline-none mb-4 resize-none h-24"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateStory}
                disabled={!newStoryText.trim()}
                className="px-5 py-1.5 text-xs font-semibold text-white bg-[#0A66C2] hover:bg-blue-700 disabled:opacity-50 rounded-full transition-colors"
              >
                Share Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
