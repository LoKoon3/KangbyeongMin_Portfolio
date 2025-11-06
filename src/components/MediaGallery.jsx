import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MediaViewer from './MediaViewer';
import ThumbnailCarousel from './ThumbnailCarousel';

/**
 * MediaGallery - Complete media gallery with viewer and thumbnail navigation
 * Inspired by Steam store page media gallery
 * @param {Array} media - Array of media objects (videos + images)
 */
const MediaGallery = ({ media }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!media || media.length === 0) {
    return (
      <div className="w-full h-[400px] bg-tertiary rounded-lg flex items-center justify-center">
        <p className="text-secondary text-sm">미디어가 없습니다</p>
      </div>
    );
  }

  const currentMedia = media[activeIndex];

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Media Viewer */}
      <MediaViewer media={currentMedia} />

      {/* Thumbnail Carousel (only show if more than 1 media item) */}
      {media.length > 1 && (
        <ThumbnailCarousel
          mediaList={media}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      )}
    </motion.div>
  );
};

export default MediaGallery;
