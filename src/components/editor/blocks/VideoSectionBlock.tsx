'use client';

import { VideoSectionData } from '@/lib/email-state';

interface Props {
  data: VideoSectionData;
  isSelected: boolean;
  onClick: () => void;
}

export function VideoSectionBlock({ data, isSelected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={{ padding: '0 32px 20px 32px' }}
    >
      <h2
        style={{
          margin: '0 0 20px 0',
          fontSize: '22px',
          lineHeight: 1.4,
          color: '#020617',
          fontFamily: "'Lora','Times New Roman',serif",
          textAlign: 'center',
        }}
      >
        <a
          href={data.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#020617', textDecoration: 'none' }}
        >
          {data.title}
        </a>
      </h2>
      
      <div
        style={{
          marginTop: '16px',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <a
          href={data.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', textDecoration: 'none' }}
        >
          <img
            src={data.thumbnailUrl}
            alt={data.altText}
            style={{
              width: '100%',
              maxWidth: '536px',
              height: 'auto',
              display: 'block',
              borderRadius: '12px',
            }}
          />
        </a>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-6 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Video
        </div>
      )}
    </div>
  );
}

