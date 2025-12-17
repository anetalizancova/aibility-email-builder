'use client';

import { ImageData } from '@/lib/email-state';

interface Props {
  data: ImageData;
  isSelected: boolean;
  onClick: () => void;
}

export function ImageBlock({ data, isSelected, onClick }: Props) {
  const hasImage = data.imageUrl && data.imageUrl.trim() !== '';

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
      {hasImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.imageUrl}
            alt={data.altText}
            style={{
              width: `${data.width}%`,
              height: 'auto',
              display: 'inline-block',
              borderRadius: '8px',
            }}
          />
          {data.isUploaded && (
            <div
              style={{
                marginTop: '8px',
                padding: '8px 12px',
                backgroundColor: '#fef3c7',
                borderRadius: '6px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                color: '#92400e',
              }}
            >
              ⚠️ Dočasný obrázek - před odesláním nahraj do Breva
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            padding: '40px',
            border: '2px dashed #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#f9fafb',
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📷</div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#6b7280',
            }}
          >
            Klikni pro přidání obrázku
          </div>
        </div>
      )}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Obrázek
        </div>
      )}
    </div>
  );
}

