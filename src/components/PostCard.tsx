import React, { useState } from 'react';
import {
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  Plus,
  Globe,
  MoreHorizontal,
  Bookmark,
  Share2,
  Heart,
  Sparkles,
  Check
} from 'lucide-react';
import { Post, UserProfile } from '../types';

interface PostCardProps {
  post: Post;
  currentUser: UserProfile;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onToggleLike,
  onAddComment,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [isFollowed, setIsFollowed] = useState(false);
  const [isReposted, setIsReposted] = useState(post.isReposted || false);
  const [repostsCount, setRepostsCount] = useState(post.repostsCount);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [activeReaction, setActiveReaction] = useState<'like' | 'celebrate' | 'love' | 'insightful'>(
    post.isLiked ? 'like' : 'like'
  );

  const shouldTruncate = post.content.length > 180 && !isExpanded;
  const displayContent = shouldTruncate
    ? post.content.slice(0, 180) + '...'
    : post.content;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    onAddComment(post.id, commentInput);
    setCommentInput('');
  };

  const handleRepost = () => {
    if (isReposted) {
      setIsReposted(false);
      setRepostsCount(prev => prev - 1);
    } else {
      setIsReposted(true);
      setRepostsCount(prev => prev + 1);
    }
  };

  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header: Author info & Follow button */}
      <div className="p-3 flex justify-between items-start">
        <div className="flex items-center space-x-2">
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            className="w-12 h-12 rounded-full object-cover shrink-0 cursor-pointer"
          />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-sm font-semibold hover:underline cursor-pointer text-gray-900">
                {post.authorName}
              </h4>
              {post.authorName !== currentUser.name && (
                <button
                  onClick={() => setIsFollowed(!isFollowed)}
                  className="text-[#0A66C2] font-semibold text-xs hover:bg-blue-50 px-1.5 py-0.5 rounded flex items-center gap-0.5 cursor-pointer"
                >
                  {isFollowed ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 line-clamp-1">{post.authorTitle}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{post.timeAgo} • 🌐</p>
          </div>
        </div>

        <button className="text-gray-500 hover:text-gray-800 p-1 rounded hover:bg-gray-100">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content Body */}
      <div className="px-3 pb-2 text-sm text-gray-900 leading-normal">
        <p className="whitespace-pre-line">{displayContent}</p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-gray-500 font-semibold text-xs mt-1 hover:underline cursor-pointer block"
          >
            see more
          </button>
        )}
      </div>

      {/* Post Image Attachment */}
      {post.imageUrl && (
        <div className="bg-[#DCE6F1] h-48 sm:h-64 flex items-center justify-center overflow-hidden">
          <img
            src={post.imageUrl}
            alt="Post Attachment"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Engagement Stats Bar */}
      <div className="px-3 py-1.5 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 mt-1">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <span className="w-4 h-4 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-[9px] font-bold">
              👍
            </span>
            <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[9px] font-bold">
              ❤️
            </span>
          </div>
          <span className="ml-1 font-medium text-gray-600 text-[11px]">
            {post.likesCount}
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-500 text-[11px]">
          <button
            onClick={() => setShowComments(!showComments)}
            className="hover:underline hover:text-gray-800"
          >
            {post.commentsCount} comments
          </button>
          <span>·</span>
          <span>{repostsCount} reposts</span>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="p-2 px-3 flex items-center justify-between border-t border-gray-100 relative">
        {/* Reaction Hover Picker */}
        {showReactionPicker && (
          <div
            onMouseLeave={() => setShowReactionPicker(false)}
            className="absolute -top-10 left-2 bg-white rounded-full shadow-lg border border-gray-200 px-3 py-1.5 flex items-center gap-3 z-30"
          >
            <button
              onClick={() => {
                setActiveReaction('like');
                if (!post.isLiked) onToggleLike(post.id);
                setShowReactionPicker(false);
              }}
              className="hover:scale-125 transition-transform text-base"
              title="Like"
            >
              👍
            </button>
            <button
              onClick={() => {
                setActiveReaction('love');
                if (!post.isLiked) onToggleLike(post.id);
                setShowReactionPicker(false);
              }}
              className="hover:scale-125 transition-transform text-base"
              title="Love"
            >
              ❤️
            </button>
            <button
              onClick={() => {
                setActiveReaction('celebrate');
                if (!post.isLiked) onToggleLike(post.id);
                setShowReactionPicker(false);
              }}
              className="hover:scale-125 transition-transform text-base"
              title="Celebrate"
            >
              👏
            </button>
            <button
              onClick={() => {
                setActiveReaction('insightful');
                if (!post.isLiked) onToggleLike(post.id);
                setShowReactionPicker(false);
              }}
              className="hover:scale-125 transition-transform text-base"
              title="Insightful"
            >
              💡
            </button>
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={() => onToggleLike(post.id)}
          onMouseEnter={() => setShowReactionPicker(true)}
          className={`like-btn flex items-center space-x-1 font-semibold text-xs py-2 px-3 hover:bg-gray-100 rounded cursor-pointer ${
            post.isLiked ? 'text-[#0A66C2]' : 'text-gray-500'
          }`}
        >
          <span>{post.isLiked ? '💙' : '👍'}</span>
          <span>Like</span>
        </button>

        {/* Comment Button */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 text-gray-500 font-semibold text-xs py-2 px-3 hover:bg-gray-100 rounded cursor-pointer"
        >
          <span>💬</span>
          <span>Comment</span>
        </button>

        {/* Repost Button */}
        <button
          onClick={handleRepost}
          className={`flex items-center space-x-1 font-semibold text-xs py-2 px-3 hover:bg-gray-100 rounded cursor-pointer ${
            isReposted ? 'text-emerald-600' : 'text-gray-500'
          }`}
        >
          <span>🔄</span>
          <span>{isReposted ? 'Reposted' : 'Repost'}</span>
        </button>

        {/* Send Button */}
        <button
          onClick={() => alert(`Shared post by ${post.authorName} via InMail!`)}
          className="flex items-center space-x-1 text-gray-500 font-semibold text-xs py-2 px-3 hover:bg-gray-100 rounded cursor-pointer hidden sm:flex"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </div>

      {/* Expandable Comment Section */}
      {showComments && (
        <div className="bg-gray-50 p-3 border-t border-gray-200 space-y-3">
          {/* New Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 flex items-center bg-white rounded-full border border-gray-300 px-3 py-1 focus-within:border-gray-500">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="w-full text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none py-1"
              />
              {commentInput && (
                <button
                  type="submit"
                  className="bg-[#0A66C2] text-white text-xs px-3 py-1 rounded-full font-semibold hover:bg-blue-700 transition-colors ml-2 cursor-pointer"
                >
                  Post
                </button>
              )}
            </div>
          </form>

          {/* List of Comments */}
          {post.comments.length > 0 && (
            <div className="space-y-2 pt-1">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-2">
                  <img
                    src={comment.authorAvatar}
                    alt={comment.authorName}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
                  />
                  <div className="flex-1 bg-white p-2.5 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-xs">
                          {comment.authorName}
                        </h4>
                        <p className="text-[10px] text-gray-500">{comment.authorTitle}</p>
                      </div>
                      <span className="text-[10px] text-gray-400">{comment.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-800 mt-1 leading-normal">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
};
