'use client';

import { GradientBoxData } from '@/lib/email-state';

interface Props {
  data: GradientBoxData;
  isSelected: boolean;
  onClick: () => void;
}

export function GradientBoxBlock({ data, isSelected, onClick }: Props) {
  const gradients = {
    'pink-blue': 'linear-gradient(135deg, rgba(255,122,217,0.15) 0%, rgba(106,155,255,0.15) 100%)',
    'sunset': 'linear-gradient(135deg, rgba(255,184,107,0.15) 0%, rgba(255,122,217,0.15) 100%)',
  };

  const borderColors = {
    'pink-blue': 'rgba(255,122,217,0.3)',
    'sunset': 'rgba(255,184,107,0.3)',
  };

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={{ padding: '0 24px' }}
    >
      <div
        style={{
          background: gradients[data.gradientType],
          borderRadius: '12px',
          padding: '24px',
          border: `1px solid ${borderColors[data.gradientType]}`,
        }}
      >
        {data.title && (
          <h4
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '18px',
              fontWeight: 600,
              color: '#020617',
              marginBottom: '12px',
            }}
          >
            {data.title}
          </h4>
        )}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            color: '#334155',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {data.content}
        </p>
        {data.bulletPoints && data.bulletPoints.length > 0 && (
          <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
            {data.bulletPoints.map((point, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  color: '#334155',
                  lineHeight: 1.6,
                }}
              >
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
      {isSelected && (
        <div className="absolute top-2 right-6 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Barevný box
        </div>
      )}
    </div>
  );
}

