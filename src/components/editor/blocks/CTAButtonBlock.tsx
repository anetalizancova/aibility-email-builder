'use client';

import { CTAButtonData } from '@/lib/email-state';

interface Props {
  data: CTAButtonData;
  isSelected: boolean;
  onClick: () => void;
}

export function CTAButtonBlock({ data, isSelected, onClick }: Props) {
  const gradientStyle = {
    background: 'linear-gradient(135deg, #ff7ad9 0%, #6a9bff 100%)',
    color: '#ffffff',
  };

  const solidStyle = {
    background: '#020617',
    color: '#ffffff',
  };

  const buttonStyle = data.style === 'gradient' ? gradientStyle : solidStyle;

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={{ 
        padding: '24px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          padding: '14px 32px',
          borderRadius: '8px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '16px',
          fontWeight: 600,
          textDecoration: 'none',
          ...buttonStyle,
        }}
      >
        {data.text}
      </span>
      <div
        style={{
          marginTop: '8px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: '#94a3b8',
        }}
      >
        → {data.url}
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Tlačítko
        </div>
      )}
    </div>
  );
}




