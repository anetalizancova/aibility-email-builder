'use client';

import { useState, useRef, useEffect } from 'react';
import { GradientBoxData } from '@/lib/email-state';

interface Props {
  data: GradientBoxData;
  isSelected: boolean;
  onClick: () => void;
  onUpdate?: (data: Partial<GradientBoxData>) => void;
}

export function GradientBoxBlock({ data, isSelected, onClick, onUpdate }: Props) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditingTitle && titleRef.current) titleRef.current.focus();
  }, [isEditingTitle]);
  useEffect(() => {
    if (isEditingContent && contentRef.current) contentRef.current.focus();
  }, [isEditingContent]);

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
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName !== 'INPUT' && 
            (e.target as HTMLElement).tagName !== 'TEXTAREA') {
          onClick();
        }
      }}
      className={`relative transition-all ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={{ padding: '0 24px', cursor: isSelected ? 'default' : 'pointer' }}
    >
      <div
        style={{
          background: gradients[data.gradientType],
          borderRadius: '12px',
          padding: '24px',
          border: `1px solid ${borderColors[data.gradientType]}`,
        }}
      >
        {isEditingTitle && isSelected ? (
          <input
            ref={titleRef}
            type="text"
            value={data.title || ''}
            onChange={(e) => onUpdate?.({ title: e.target.value })}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                setIsEditingTitle(false);
              }
            }}
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '18px',
              fontWeight: 600,
              color: '#020617',
              marginBottom: '12px',
              width: '100%',
              border: '2px solid #ec4899',
              borderRadius: '4px',
              padding: '4px 8px',
              outline: 'none',
              background: 'white',
            }}
          />
        ) : (
          <h4
            onDoubleClick={() => isSelected && setIsEditingTitle(true)}
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '18px',
              fontWeight: 600,
              color: '#020617',
              marginBottom: '12px',
              cursor: isSelected ? 'text' : 'pointer',
              minHeight: '24px',
            }}
          >
            {data.title || (isSelected ? 'Dvojklik pro přidání nadpisu' : '')}
          </h4>
        )}
        {isEditingContent && isSelected ? (
          <textarea
            ref={contentRef}
            value={data.content}
            onChange={(e) => onUpdate?.({ content: e.target.value })}
            onBlur={() => setIsEditingContent(false)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              color: '#334155',
              lineHeight: 1.6,
              margin: 0,
              width: '100%',
              minHeight: '60px',
              border: '2px solid #ec4899',
              borderRadius: '4px',
              padding: '8px',
              outline: 'none',
              resize: 'vertical',
              background: 'white',
            }}
          />
        ) : (
          <p
            onDoubleClick={() => isSelected && setIsEditingContent(true)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              color: '#334155',
              lineHeight: 1.6,
              margin: 0,
              cursor: isSelected ? 'text' : 'pointer',
              minHeight: '24px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {data.content || (isSelected ? 'Dvojklik pro přidání textu' : '')}
          </p>
        )}
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
          Barevný box • Dvojklik pro editaci
        </div>
      )}
    </div>
  );
}




