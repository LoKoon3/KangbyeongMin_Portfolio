import React from 'react';
import { YouTubeEmbed } from './';

/**
 * MediaViewer - Displays either YouTube video or image based on media type
 * @param {Object} media - Media object with type, youtubeId/src, and title
 */
const MediaViewer = ({ media }) => {
  if (!media) {
    return (
      <div className="w-full h-[400px] bg-tertiary rounded-lg flex items-center justify-center">
        <p className="text-secondary text-sm">미디어를 선택해주세요</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Media Content */}
      {media.type === 'video' ? (
        <YouTubeEmbed youtubeId={media.youtubeId} title={media.title} />
      ) : (
        <div className="w-full aspect-video rounded-lg overflow-hidden relative">
          <img
            src={media.src}
            alt={media.title}
            className="w-full h-full object-cover"
          />
          {/* Image Caption Overlay (Top-Left) */}
          {media.title && (
            <div className="absolute top-0 left-0 bg-black bg-opacity-70 px-3 py-2 rounded-br-lg">
              <p className="text-white text-[12px]">{media.title}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaViewer;
