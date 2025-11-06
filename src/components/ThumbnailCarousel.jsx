import React, { useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * ThumbnailCarousel - Displays thumbnails with horizontal scrolling
 * @param {Array} mediaList - Array of media objects
 * @param {Number} activeIndex - Currently selected media index
 * @param {Function} onSelect - Callback when thumbnail is clicked
 */
const ThumbnailCarousel = ({ mediaList, activeIndex, onSelect }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const getYouTubeThumbnail = (youtubeId) => {
    return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
  };

  return (
    <div className="relative w-full mt-4">
      {/* Left Arrow */}
      {mediaList.length > 4 && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-70 hover:bg-opacity-90 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all"
          aria-label="Scroll left"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Thumbnails Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {mediaList.map((media, index) => {
          const isActive = index === activeIndex;
          const thumbnailSrc =
            media.type === 'video'
              ? getYouTubeThumbnail(media.youtubeId)
              : media.src;

          return (
            <motion.button
              key={index}
              onClick={() => onSelect(index)}
              className={`flex-shrink-0 w-[140px] h-[80px] rounded-lg overflow-hidden relative transition-all ${
                isActive
                  ? 'ring-4 ring-blue-500 scale-105'
                  : 'ring-2 ring-gray-600 hover:ring-gray-400'
              }`}
              whileHover={{ scale: isActive ? 1.05 : 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Thumbnail Image */}
              <img
                src={thumbnailSrc}
                alt={media.title}
                className="w-full h-full object-cover"
              />

              {/* Play Icon for Videos */}
              {media.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <svg
                    className="w-10 h-10 text-white opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Right Arrow */}
      {mediaList.length > 4 && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-70 hover:bg-opacity-90 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all"
          aria-label="Scroll right"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ThumbnailCarousel;
