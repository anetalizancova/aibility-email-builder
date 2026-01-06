'use client';

import { SpacerData } from '@/lib/email-state';

interface Props {
  data: SpacerData;
  isSelected: boolean;
  onClick: () => void;
}

export function SpacerBlock({ data, isSelected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={{ 
        backgroundColor: '#ffffff',
      }}
    >
      <div
        style={{
          height: `${data.height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isSelected && (
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              color: '#94a3b8',
              padding: '4px 8px',
              backgroundColor: '#f1f5f9',
              borderRadius: '4px',
            }}
          >
            {data.height}px
          </div>
        )}
      </div>
      {isSelected && (
        <div className="absolute top-1 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Mezera
        </div>
      )}
    </div>
  );
}




