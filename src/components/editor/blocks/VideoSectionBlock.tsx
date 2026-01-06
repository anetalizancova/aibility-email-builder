'use client';

import { useState, useRef, useEffect } from 'react';
import { VideoSectionData } from '@/lib/email-state';

interface Props {
  data: VideoSectionData;
  isSelected: boolean;
  onClick: () => void;
  onUpdate?: (data: Partial<VideoSectionData>) => void;
}

export function VideoSectionBlock({ data, isSelected, onClick, onUpdate }: Props) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitle && titleRef.current) titleRef.current.focus();
  }, [isEditingTitle]);
  useEffect(() => {
    if (isEditingUrl && urlRef.current) urlRef.current.focus();
  }, [isEditingUrl]);

  return (
    <div
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName !== 'INPUT') {
          onClick();
        }
      }}
      className={`relative transition-all ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={{ padding: '0 32px 20px 32px', cursor: isSelected ? 'default' : 'pointer' }}
    >
      {isEditingTitle && isSelected ? (
        <input
          ref={titleRef}
          type="text"
          value={data.title}
          onChange={(e) => onUpdate?.({ title: e.target.value })}
          onBlur={() => setIsEditingTitle(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              setIsEditingTitle(false);
            }
          }}
          onClick={(e) => e.stopPropagation()}
          style={{
            margin: '0 0 20px 0',
            fontSize: '22px',
            lineHeight: 1.4,
            color: '#020617',
            fontFamily: "'Lora','Times New Roman',serif",
            textAlign: 'center',
            width: '100%',
            border: '2px solid #ec4899',
            borderRadius: '4px',
            padding: '4px 8px',
            outline: 'none',
          }}
        />
      ) : (
        <h2
          onClick={(e) => {
            e.stopPropagation();
            if (isSelected) setIsEditingTitle(true);
          }}
          style={{
            margin: '0 0 20px 0',
            fontSize: '22px',
            lineHeight: 1.4,
            color: '#020617',
            fontFamily: "'Lora','Times New Roman',serif",
            textAlign: 'center',
            cursor: isSelected ? 'text' : 'pointer',
            minHeight: '30px',
          }}
        >
          <a
            href={data.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#020617', textDecoration: 'none', pointerEvents: isSelected ? 'none' : 'auto' }}
            onClick={(e) => {
              if (isSelected) {
                e.preventDefault();
                setIsEditingTitle(true);
              }
            }}
          >
            {data.title || (isSelected ? 'Klikni pro nadpis videa' : '')}
          </a>
        </h2>
      )}
      
      <div style={{ marginTop: '8px', fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
        {isEditingUrl && isSelected ? (
          <input
            ref={urlRef}
            type="text"
            value={data.videoUrl}
            onChange={(e) => onUpdate?.({ videoUrl: e.target.value })}
            onBlur={() => setIsEditingUrl(false)}
            onClick={(e) => e.stopPropagation()}
            placeholder="https://www.youtube.com/watch?v=..."
            style={{
              border: '2px solid #ec4899',
              borderRadius: '4px',
              padding: '4px 8px',
              outline: 'none',
              width: '400px',
              maxWidth: '100%',
            }}
          />
        ) : (
          <span
            onClick={(e) => {
              e.stopPropagation();
              if (isSelected) setIsEditingUrl(true);
            }}
            style={{ cursor: isSelected ? 'text' : 'pointer' }}
          >
            → {data.videoUrl || (isSelected ? 'Klikni pro URL videa' : '')}
          </span>
        )}
      </div>
      
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
          Video • Klikni pro editaci
        </div>
      )}
    </div>
  );
}

