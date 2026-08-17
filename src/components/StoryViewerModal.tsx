import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Send } from 'lucide-react';
import { Story } from '../types';

interface StoryViewerModalProps {
  story: Story;
  allStories: Story[];
  onClose: () => void;
  onSelectStory: (story: Story) => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  story,
  allStories,
  onClose,
  onSelectStory,
}) => {
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [replyText, setReplyText] = useState('');

  const connectionStories = allStories.filter(s => !s.isUserStory);
  const currentIndex = connectionStories.findIndex(s => s.id === story.id);

  // Auto progress timer (5 seconds)
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (currentIndex < connectionStories.length - 1) {
            onSelectStory(connectionStories[currentIndex + 1]);
          } else {
            onClose();
          }
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [story.id, currentIndex]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectStory(connectionStories[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < connectionStories.length - 1) {
      onSelectStory(connectionStories[currentIndex + 1]);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 z-50 cursor-pointer"
        id="close-story-viewer-btn"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Container */}
      <div className="relative w-full max-w-sm h-[600px] bg-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl border border-white/10">
        {/* Background Image / Gradient */}
        {story.mediaUrl ? (
          <img
            src={story.mediaUrl}
            alt={story.userName}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${story.bgGradient || 'from-blue-600 to-indigo-900'}`} />
        )}

        {/* Overlay Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

        {/* Header: Progress Bar & Author Info */}
        <div className="relative z-10 p-4 space-y-3">
          {/* Progress bar */}
          <div className="w-full bg-white/30 h-1 rounded-full overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Author avatar and title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={story.userAvatar}
                alt={story.userName}
                className="w-9 h-9 rounded-full object-cover border-2 border-white/80"
              />
              <div>
                <h4 className="text-white font-semibold text-sm leading-tight">
                  {story.userName}
                </h4>
                <p className="text-white/70 text-[11px]">
                  {story.userTitle} · {story.timeAgo}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Content Text */}
        <div className="relative z-10 px-6 py-8 text-center my-auto">
          {story.textContent && (
            <p className="text-white text-lg font-medium drop-shadow-md bg-black/40 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              {story.textContent}
            </p>
          )}
        </div>

        {/* Navigation arrows */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-2 rounded-full bg-black/30 backdrop-blur-xs hover:bg-black/50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {currentIndex < connectionStories.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-2 rounded-full bg-black/30 backdrop-blur-xs hover:bg-black/50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Footer: Quick reply input */}
        <div className="relative z-10 p-4 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Reply to ${story.userName}...`}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-1 bg-white/20 backdrop-blur-md text-white placeholder-white/60 text-xs px-4 py-2.5 rounded-full border border-white/20 focus:outline-hidden focus:ring-2 focus:ring-white/50"
          />
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2.5 rounded-full backdrop-blur-md border transition-colors ${
              isLiked
                ? 'bg-red-500/80 border-red-400 text-white'
                : 'bg-white/20 border-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
          </button>
          {replyText && (
            <button
              onClick={() => { setReplyText(''); alert('Reply sent!'); }}
              className="p-2.5 rounded-full bg-[#0A66C2] text-white hover:bg-blue-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
