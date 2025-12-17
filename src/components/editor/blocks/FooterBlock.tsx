'use client';

import { FooterData } from '@/lib/email-state';

interface Props {
  data: FooterData;
  isSelected: boolean;
  onClick: () => void;
}

export function FooterBlock({ data, isSelected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={{ 
        padding: '32px 24px',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        borderRadius: '0 0 16px 16px',
      }}
    >
      {data.logoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.logoUrl}
          alt={data.companyName}
          style={{
            width: '120px',
            height: 'auto',
            marginBottom: '16px',
          }}
        />
      )}
      
      {data.showSocials && (
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '24px', margin: '0 8px' }}>🔗</span>
          <span style={{ fontSize: '24px', margin: '0 8px' }}>📸</span>
          <span style={{ fontSize: '24px', margin: '0 8px' }}>💼</span>
        </div>
      )}

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          color: '#64748b',
          margin: '0 0 4px 0',
        }}
      >
        {data.companyName}
      </p>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: '#94a3b8',
          margin: 0,
        }}
      >
        {data.address}
      </p>
      
      {isSelected && (
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Patička
        </div>
      )}
    </div>
  );
}

