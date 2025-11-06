import { useState } from 'react';

const YouTubeEmbed = ({ youtubeId, title }) => {
  const [hasError, setHasError] = useState(false);

  if (!youtubeId) {
    return (
      <div className="w-full aspect-video bg-tertiary rounded-2xl flex items-center justify-center">
        <p className="text-secondary">영상 정보가 없습니다</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full aspect-video bg-tertiary rounded-2xl flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-secondary text-center">
          영상을 불러올 수 없습니다
        </p>
        <a
          href={`https://www.youtube.com/watch?v=${youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-primary rounded-lg text-white hover:bg-opacity-80 transition-opacity"
        >
          새 탭에서 보기
        </a>
      </div>
    );
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=0&mute=1&rel=0&modestbranding=1`;

  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black">
      <iframe
        src={embedUrl}
        title={title || 'YouTube video player'}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className="w-full h-full"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default YouTubeEmbed;
