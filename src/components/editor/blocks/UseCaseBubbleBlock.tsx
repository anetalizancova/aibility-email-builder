'use client';

import { useState, useRef, useEffect } from 'react';
import { UseCaseBubbleData } from '@/lib/email-state';

interface Props {
  data: UseCaseBubbleData;
  isSelected: boolean;
  onClick: () => void;
  onUpdate?: (data: Partial<UseCaseBubbleData>) => void;
}

export function UseCaseBubbleBlock({ data, isSelected, onClick, onUpdate }: Props) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingResult, setIsEditingResult] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitle && titleRef.current) titleRef.current.focus();
  }, [isEditingTitle]);
  useEffect(() => {
    if (isEditingResult && resultRef.current) resultRef.current.focus();
  }, [isEditingResult]);

  const isLeft = data.alignment === 'left';
  const paddingStyle = isLeft 
    ? { padding: '0 32px 12px 32px' }
    : { padding: '0 32px 12px 32px', textAlign: 'right' as const };

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
      style={{ ...paddingStyle, cursor: isSelected ? 'default' : 'pointer' }}
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
        {isEditingTitle && isSelected ? (
          <input
            ref={titleRef}
            type="text"
            value={data.title}
            onChange={(e) => onUpdate?.({ title: e.target.value })}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                setIsEditingTitle(false);
              }
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              color: '#020617',
              fontSize: '15px',
              fontWeight: 700,
              margin: '0 0 4px 0',
              width: '100%',
              border: '2px solid #ec4899',
              borderRadius: '4px',
              padding: '4px 8px',
              outline: 'none',
              background: 'white',
            }}
          />
        ) : (
          <strong
            onClick={(e) => {
              e.stopPropagation();
              if (isSelected) setIsEditingTitle(true);
            }}
            style={{
              fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              color: '#020617',
              fontSize: '15px',
              lineHeight: 1.7,
              cursor: isSelected ? 'text' : 'pointer',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            {data.title || (isSelected ? 'Klikni pro nadpis' : '')}
          </strong>
        )}
        <br />
        {isEditingResult && isSelected ? (
          <input
            ref={resultRef}
            type="text"
            value={data.result}
            onChange={(e) => onUpdate?.({ result: e.target.value })}
            onBlur={() => setIsEditingResult(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                setIsEditingResult(false);
              }
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              color: '#020617',
              fontSize: '15px',
              margin: '4px 0 0 0',
              width: '100%',
              border: '2px solid #ec4899',
              borderRadius: '4px',
              padding: '4px 8px',
              outline: 'none',
              background: 'white',
            }}
          />
        ) : (
          <span
            onClick={(e) => {
              e.stopPropagation();
              if (isSelected) setIsEditingResult(true);
            }}
            style={{
              fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              color: '#020617',
              fontSize: '15px',
              lineHeight: 1.7,
              cursor: isSelected ? 'text' : 'pointer',
            }}
          >
            {data.result || (isSelected ? 'Klikni pro výsledek' : '')}
          </span>
        )}
      </div>
      {isSelected && (
        <div className="absolute top-2 right-6 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Use case • Klikni pro editaci
        </div>
      )}
    </div>
  );
}

