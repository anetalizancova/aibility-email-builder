'use client';

import { EventBoxData } from '@/lib/email-state';

interface Props {
  data: EventBoxData;
  isSelected: boolean;
  onClick: () => void;
}

export function EventBoxBlock({ data, isSelected, onClick }: Props) {
  const gradients = {
    'pink-blue': 'linear-gradient(135deg, rgba(255,122,217,0.6) 0%, rgba(106,155,255,0.6) 100%)',
    'blue-pink': 'linear-gradient(135deg, rgba(106,155,255,0.6) 0%, rgba(255,122,217,0.6) 100%)',
    'sunset': 'linear-gradient(135deg, rgba(106,155,255,0.6) 0%, rgba(255,122,217,0.6) 100%)',
  };

  const lightGradients = {
    'pink-blue': 'linear-gradient(135deg, rgba(255,122,217,0.08) 0%, rgba(106,155,255,0.08) 100%)',
    'blue-pink': 'linear-gradient(135deg, rgba(106,155,255,0.08) 0%, rgba(255,122,217,0.08) 100%)',
    'sunset': 'linear-gradient(135deg, rgba(255,184,107,0.08) 0%, rgba(255,122,217,0.08) 100%)',
  };

  const isLeft = data.gradientPosition === 'left';
  const gradientStyle = gradients[data.gradientType];
  const lightGradientStyle = lightGradients[data.gradientType];

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
          backgroundColor: '#ffffff',
          borderRadius: '15px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: isLeft ? 'row' : 'row-reverse',
        }}
      >
        {/* Content side */}
        <div
          style={{
            flex: '1 1 58%',
            padding: '32px 28px',
            background: lightGradientStyle,
          }}
        >
          {/* Meta info */}
          <p
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '1px',
              color: '#6b7280',
              textTransform: 'uppercase',
              margin: '0 0 12px 0',
            }}
          >
            {data.metaInfo}
          </p>

          {/* Title */}
          <h2
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: '26px',
              lineHeight: 1.3,
              color: '#020617',
              fontWeight: 700,
              margin: '0 0 20px 0',
            }}
          >
            {data.title}
          </h2>

          {/* Description */}
          {data.description.split('\n').map((paragraph, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#020617',
                margin: i === 0 ? '0 0 16px 0' : '0 0 24px 0',
              }}
            >
              {paragraph}
            </p>
          ))}

          {/* Button */}
          <div style={{ marginTop: '24px' }}>
            <a
              href={data.buttonUrl}
              style={{
                backgroundColor: '#000000',
                borderRadius: '12px',
                color: '#ffffff',
                display: 'inline-block',
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '48px',
                textAlign: 'center',
                textDecoration: 'none',
                padding: '0 32px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}
            >
              {data.buttonText}
            </a>
          </div>
        </div>

        {/* Gradient side */}
        <div
          style={{
            flex: '1 1 42%',
            minHeight: '300px',
            background: gradientStyle,
          }}
        />
      </div>
      {isSelected && (
        <div className="absolute top-2 right-6 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Event box
        </div>
      )}
    </div>
  );
}

