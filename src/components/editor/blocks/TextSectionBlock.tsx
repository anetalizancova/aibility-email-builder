'use client';

import { TextSectionData } from '@/lib/email-state';

interface Props {
  data: TextSectionData;
  isSelected: boolean;
  onClick: () => void;
}

export function TextSectionBlock({ data, isSelected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all p-6 ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={{ backgroundColor: '#ffffff' }}
    >
      {data.showTitle && data.title && (
        <h3
          style={{
            fontFamily: "'Lora', serif",
            fontSize: '20px',
            fontWeight: 600,
            color: '#020617',
            marginBottom: '12px',
            lineHeight: 1.3,
          }}
        >
          {data.title}
        </h3>
      )}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '16px',
          color: '#334155',
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {data.content}
      </p>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Text
        </div>
      )}
    </div>
  );
}




