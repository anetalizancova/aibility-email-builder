'use client';

import { UseCaseBubbleData } from '@/lib/email-state';

interface Props {
  data: UseCaseBubbleData;
  isSelected: boolean;
  onClick: () => void;
}

export function UseCaseBubbleBlock({ data, isSelected, onClick }: Props) {
  const isLeft = data.alignment === 'left';
  const paddingStyle = isLeft 
    ? { padding: '0 32px 12px 32px' }
    : { padding: '0 32px 12px 32px', textAlign: 'right' as const };

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={paddingStyle}
    >
      <div
        style={{
          width: '75%',
          marginLeft: isLeft ? '0' : 'auto',
          marginRight: isLeft ? 'auto' : '0',
          borderRadius: '16px',
          backgroundImage: `linear-gradient(rgba(249,250,251,0.7), rgba(249,250,251,0.7)), url('${data.gradientUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#f9fafb',
          padding: '16px 18px',
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            color: '#020617',
            fontSize: '15px',
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          <strong style={{ color: '#020617' }}>{data.title}</strong>
          <br />
          {data.result}
        </p>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-6 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Use case
        </div>
      )}
    </div>
  );
}

