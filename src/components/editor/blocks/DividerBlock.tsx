'use client';

import { DividerData } from '@/lib/email-state';

interface Props {
  data: DividerData;
  isSelected: boolean;
  onClick: () => void;
}

export function DividerBlock({ data, isSelected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={{ 
        padding: '16px 24px',
        backgroundColor: '#ffffff',
      }}
    >
      <div
        style={{
          width: `${data.width}%`,
          height: '1px',
          backgroundColor: data.color,
          margin: '0 auto',
        }}
      />
      {isSelected && (
        <div className="absolute top-1 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Oddělovač
        </div>
      )}
    </div>
  );
}

