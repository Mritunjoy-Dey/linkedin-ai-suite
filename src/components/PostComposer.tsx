import React, { useState } from 'react';
import { Image as ImageIcon, Calendar, FileText, Globe, X, Sparkles } from 'lucide-react';
import { UserProfile, Post } from '../types';

interface PostComposerProps {
  user: UserProfile;
  onAddPost: (newPost: Post) => void;
}

export const PostComposer: React.FC<PostComposerProps> = ({ user, onAddPost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const sampleImages = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim() && !selectedImage) return;

    const newPost: Post = {
      id: `post_${Date.now()}`,
      authorName: user.name,
      authorAvatar: user.avatar,
      authorTitle: user.title,
      authorCompany: user.company,
      timeAgo: 'Just now',
      content: postText,
      imageUrl: selectedImage || undefined,
      likesCount: 0,
      commentsCount: 0,
      repostsCount: 0,
      isLiked: false,
      comments: []
    };

    onAddPost(newPost);
    setPostText('');
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-4 shrink-0">
        {/* Top Input Row */}
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white border border-gray-300 text-gray-500 rounded-full px-4 py-2.5 text-sm font-semibold flex-1 text-left hover:bg-gray-50 transition-colors cursor-pointer"
            id="start-post-pill-btn"
          >
            Start a post
          </button>
        </div>

        {/* Action Buttons Row */}
        <div className="flex justify-between px-2 pt-1 border-t border-gray-100">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center text-sm font-semibold text-gray-500 py-2 hover:bg-gray-100 rounded px-2 cursor-pointer"
          >
            <span className="text-blue-500 mr-2">🖼️</span> Media
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center text-sm font-semibold text-gray-500 py-2 hover:bg-gray-100 rounded px-2 cursor-pointer"
          >
            <span className="text-orange-500 mr-2">📅</span> Event
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center text-sm font-semibold text-gray-500 py-2 hover:bg-gray-100 rounded px-2 cursor-pointer"
          >
            <span className="text-pink-500 mr-2">📝</span> Article
          </button>
        </div>
      </div>

      {/* Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 shadow-2xl relative border border-gray-200 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{user.name}</h3>
                  <div className="inline-flex items-center gap-1 text-[11px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full mt-0.5 font-medium">
                    <Globe className="w-3 h-3" />
                    <span>Anyone</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Textarea Area */}
            <div className="py-4 flex-1 overflow-y-auto space-y-3">
              <textarea
                placeholder="What do you want to talk about?"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                autoFocus
                className="w-full text-gray-800 text-sm placeholder-gray-400 focus:outline-none resize-none min-h-[140px]"
              />

              {/* Attached Image Preview */}
              {selectedImage && (
                <div className="relative rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={selectedImage}
                    alt="Attached preview"
                    className="w-full max-h-60 object-cover"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Sample Media Attachments Selection */}
              <div>
                <span className="text-[11px] text-gray-500 font-medium block mb-1.5">
                  Attach Sample Photo:
                </span>
                <div className="flex gap-2">
                  {sampleImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`relative w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                        selectedImage === imgUrl ? 'border-[#0A66C2] scale-105' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="Sample" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500">
                <button
                  type="button"
                  onClick={() => setSelectedImage(sampleImages[0])}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                  title="Add Image"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPostText(prev => prev + " 🚀 #LinkedInUpdate #Engineering")}
                  className="p-2 rounded-full hover:bg-gray-100 text-amber-600"
                  title="Add AI Hashtags"
                >
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!postText.trim() && !selectedImage}
                className="px-5 py-1.5 bg-[#0A66C2] hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-full transition-colors cursor-pointer"
                id="publish-post-btn"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
