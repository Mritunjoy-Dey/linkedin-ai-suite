import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Star,
  Cpu,
  TrendingUp,
  Cloud,
  Palette,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  ThumbsUp,
  MessageSquare,
  Share2,
  Info,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { CategoryStory, CategoryStorySlide } from '../types';

interface CategoryStoriesBarProps {
  categories: CategoryStory[];
  onOpenAiQuery?: (query: string) => void;
}

export const CategoryStoriesBar: React.FC<CategoryStoriesBarProps> = ({
  categories,
  onOpenAiQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryStory | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const activeSlide: CategoryStorySlide | undefined = selectedCategory?.slides[activeSlideIndex];

  // Auto-advance slides every 6 seconds when viewing
  useEffect(() => {
    if (!selectedCategory || !isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => {
        if (prev < selectedCategory.slides.length - 1) {
          return prev + 1;
        } else {
          return prev; // Stay on last slide or pause
        }
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [selectedCategory, activeSlideIndex, isAutoPlaying]);

  const handleOpenCategory = (cat: CategoryStory) => {
    setSelectedCategory(cat);
    setActiveSlideIndex(0);
    setIsAutoPlaying(true);
  };

  const handleNextSlide = () => {
    if (!selectedCategory) return;
    if (activeSlideIndex < selectedCategory.slides.length - 1) {
      setActiveSlideIndex(prev => prev + 1);
    } else {
      // Go to next category if available
      const currentCatIndex = categories.findIndex(c => c.id === selectedCategory.id);
      if (currentCatIndex < categories.length - 1) {
        setSelectedCategory(categories[currentCatIndex + 1]);
        setActiveSlideIndex(0);
      } else {
        setSelectedCategory(null);
      }
    }
  };

  const handlePrevSlide = () => {
    if (!selectedCategory) return;
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(prev => prev - 1);
    } else {
      const currentCatIndex = categories.findIndex(c => c.id === selectedCategory.id);
      if (currentCatIndex > 0) {
        const prevCat = categories[currentCatIndex - 1];
        setSelectedCategory(prevCat);
        setActiveSlideIndex(prevCat.slides.length - 1);
      }
    }
  };

  const getCategoryIcon = (catName: string, iconName?: string) => {
    if (catName.includes('Top Pick')) return <Star className="w-5 h-5 text-amber-400 fill-amber-400" />;
    if (catName.includes('Tech')) return <Cpu className="w-5 h-5 text-sky-400" />;
    if (catName.includes('Finance')) return <TrendingUp className="w-5 h-5 text-emerald-400" />;
    if (catName.includes('AI')) return <Sparkles className="w-5 h-5 text-purple-400" />;
    if (catName.includes('Design')) return <Palette className="w-5 h-5 text-pink-400" />;
    return <Building2 className="w-5 h-5 text-blue-400" />;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 mb-3 shadow-xs">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#0A66C2] via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <span>LinkedIn AI Topic Highlights</span>
              <span className="bg-blue-50 text-[#0A66C2] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                Personalized
              </span>
            </h3>
            <p className="text-[11px] text-gray-500">
              Surfaced based on companies you follow, liked topics & sponsored news
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] text-gray-400 font-medium">
          <Info className="w-3.5 h-3.5" />
          <span>Updates refreshed hourly</span>
        </div>
      </div>

      {/* Stories Circles Row matching screenshot layout */}
      <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isTopPick = cat.categoryName.includes('Top Pick');
          const isSponsored = cat.isSponsored;

          return (
            <button
              key={cat.id}
              onClick={() => handleOpenCategory(cat)}
              className="flex flex-col items-center shrink-0 group cursor-pointer transition-transform active:scale-95"
            >
              {/* Circular Avatar Ring */}
              <div
                className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2.5px] transition-all group-hover:scale-105 shadow-xs relative ${
                  isSponsored
                    ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400'
                    : isTopPick
                    ? 'bg-gradient-to-tr from-[#002244] via-[#0A66C2] to-[#004182]'
                    : cat.isUnseen
                    ? 'bg-gradient-to-tr from-[#0A66C2] via-sky-500 to-indigo-600'
                    : 'bg-gray-300'
                }`}
              >
                {/* Inner Circle dark navy / brand background like screenshot */}
                <div className="w-full h-full rounded-full bg-[#0E1A2B] border-2 border-white flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-[#162740] transition-colors">
                  {getCategoryIcon(cat.categoryName, cat.icon)}

                  {/* Company Logo Badge overlay if available */}
                  {cat.slides[0]?.companyLogo && (
                    <img
                      src={cat.slides[0].companyLogo}
                      alt={cat.slides[0].companyName}
                      className="absolute bottom-0 right-0 w-5 h-5 rounded-full border border-white object-cover"
                    />
                  )}
                </div>

                {/* Star Badge for Top Pick */}
                {isTopPick && (
                  <div className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 p-1 rounded-full shadow-xs border border-white">
                    <Star className="w-3 h-3 fill-amber-950" />
                  </div>
                )}

                {/* Sponsored badge */}
                {isSponsored && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full border border-white shadow-xs">
                    Ad
                  </div>
                )}
              </div>

              {/* Label below circle */}
              <div className="mt-1.5 text-center">
                <span className="text-xs font-bold text-gray-800 group-hover:text-[#0A66C2] flex items-center justify-center gap-0.5 truncate max-w-[80px]">
                  <span>{cat.categoryName}</span>
                  {isTopPick && <span className="text-amber-500 text-xs">★</span>}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Story Viewer Modal */}
      {selectedCategory && activeSlide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-md bg-gray-900 rounded-2xl overflow-hidden shadow-2xl text-white border border-gray-800 flex flex-col h-[620px] max-h-[92vh]">
            
            {/* Top Progress Bars */}
            <div className="p-3 pb-1 flex gap-1 z-20 bg-gradient-to-b from-black/80 to-transparent">
              {selectedCategory.slides.map((_, idx) => (
                <div
                  key={idx}
                  className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
                >
                  <div
                    className={`h-full bg-white transition-all duration-300 ${
                      idx < activeSlideIndex
                        ? 'w-full'
                        : idx === activeSlideIndex
                        ? 'w-full animate-pulse'
                        : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Header: Company Profile Info & Close Button */}
            <div className="px-4 py-2 flex items-center justify-between z-20">
              <div className="flex items-center gap-2.5">
                <img
                  src={activeSlide.companyLogo}
                  alt={activeSlide.companyName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/80 bg-white"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-sm text-white">
                      {activeSlide.companyName}
                    </h4>
                    {activeSlide.isSponsored ? (
                      <span className="bg-amber-500/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        Promoted
                      </span>
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400 text-gray-900" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-300">
                    <span>{selectedCategory.categoryName}</span>
                    <span>•</span>
                    <span>{activeSlide.timeAgo}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-white"
                >
                  {isAutoPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slide Content Area */}
            <div className="flex-1 relative flex flex-col justify-between p-4 overflow-y-auto">
              {/* Background / Media Image */}
              {activeSlide.mediaUrl && (
                <div className="my-2 rounded-xl overflow-hidden border border-white/10 h-48 sm:h-52 shrink-0 relative bg-black/40">
                  <img
                    src={activeSlide.mediaUrl}
                    alt={activeSlide.headline}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              )}

              {/* Text content */}
              <div className="space-y-3 z-10 my-auto">
                <h3 className="text-base sm:text-lg font-bold leading-snug text-white drop-shadow-sm">
                  {activeSlide.headline}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
                  {activeSlide.body}
                </p>

                {/* AI Insight Callout */}
                {activeSlide.aiInsight && (
                  <div className="bg-blue-950/70 border border-blue-500/40 rounded-xl p-3 flex items-start gap-2.5 backdrop-blur-xs">
                    <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 block">
                        LinkedIn AI Signal
                      </span>
                      <p className="text-[11px] text-blue-100 mt-0.5">
                        {activeSlide.aiInsight}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Left / Right Nav Touch Hotspots */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center z-30 transition-colors"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center z-30 transition-colors"
                title="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-3 bg-gray-950 border-t border-gray-800 flex items-center justify-between text-xs text-gray-300">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{activeSlide.likesCount}</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>{activeSlide.commentsCount}</span>
                </button>
              </div>

              {onOpenAiQuery && (
                <button
                  onClick={() => {
                    const query = `Tell me more details about ${activeSlide.companyName} and ${activeSlide.headline}`;
                    setSelectedCategory(null);
                    onOpenAiQuery(query);
                  }}
                  className="bg-[#0A66C2] hover:bg-blue-600 text-white font-semibold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask LinkedIn AI</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
