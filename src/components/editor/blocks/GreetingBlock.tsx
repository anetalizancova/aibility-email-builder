'use client';

import { GreetingData } from '@/lib/email-state';

interface Props {
  data: GreetingData;
  isSelected: boolean;
  onClick: () => void;
}

export function GreetingBlock({ data, isSelected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all p-6 ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={{ backgroundColor: '#ffffff' }}
    >
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '16px',
          color: '#334155',
          margin: 0,
        }}
      >
        {data.text}
      </p>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Oslovení
        </div>
      )}
    </div>
  );
}




