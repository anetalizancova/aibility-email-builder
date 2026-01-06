'use client';

import { HeroImageData } from '@/lib/email-state';

interface Props {
  data: HeroImageData;
  isSelected: boolean;
  onClick: () => void;
}

export function HeroImageBlock({ data, isSelected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.imageUrl || 'https://via.placeholder.com/600x300?text=Hero+Image'}
        alt={data.altText}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          borderRadius: '16px 16px 0 0',
        }}
      />
      {isSelected && (
        <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Hero obrázek
        </div>
      )}
    </div>
  );
}




