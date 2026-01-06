'use client';

import { useState, useRef, useEffect } from 'react';
import { CTAButtonData } from '@/lib/email-state';

interface Props {
  data: CTAButtonData;
  isSelected: boolean;
  onClick: () => void;
  onUpdate?: (data: Partial<CTAButtonData>) => void;
}

export function CTAButtonBlock({ data, isSelected, onClick, onUpdate }: Props) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const textRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingText && textRef.current) textRef.current.focus();
  }, [isEditingText]);
  useEffect(() => {
    if (isEditingUrl && urlRef.current) urlRef.current.focus();
  }, [isEditingUrl]);

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
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName !== 'INPUT') {
          onClick();
        }
      }}
      className={`relative transition-all ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={{ 
        padding: '24px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        cursor: isSelected ? 'default' : 'pointer',
      }}
    >
      {isEditingText && isSelected ? (
        <input
          ref={textRef}
          type="text"
          value={data.text}
          onChange={(e) => onUpdate?.({ text: e.target.value })}
          onBlur={() => setIsEditingText(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              setIsEditingText(false);
            }
          }}
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            borderRadius: '8px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            fontWeight: 600,
            border: '2px solid #ec4899',
            outline: 'none',
            textAlign: 'center',
            minWidth: '200px',
          }}
        />
      ) : (
        <span
          onDoubleClick={() => isSelected && setIsEditingText(true)}
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            borderRadius: '8px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            fontWeight: 600,
            textDecoration: 'none',
            cursor: isSelected ? 'text' : 'pointer',
            ...buttonStyle,
          }}
        >
          {data.text || (isSelected ? 'Dvojklik pro přidání textu' : '')}
        </span>
      )}
      <div style={{ marginTop: '8px' }}>
        {isEditingUrl && isSelected ? (
          <input
            ref={urlRef}
            type="text"
            value={data.url}
            onChange={(e) => onUpdate?.({ url: e.target.value })}
            onBlur={() => setIsEditingUrl(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                setIsEditingUrl(false);
              }
            }}
            placeholder="https://..."
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              color: '#94a3b8',
              border: '2px solid #ec4899',
              borderRadius: '4px',
              padding: '4px 8px',
              outline: 'none',
              width: '300px',
              maxWidth: '100%',
            }}
          />
        ) : (
          <div
            onDoubleClick={() => isSelected && setIsEditingUrl(true)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              color: '#94a3b8',
              cursor: isSelected ? 'text' : 'pointer',
            }}
          >
            → {data.url || (isSelected ? 'Dvojklik pro přidání URL' : '')}
          </div>
        )}
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Tlačítko • Dvojklik pro editaci
        </div>
      )}
    </div>
  );
}




