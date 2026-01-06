'use client';

import { useState, useRef, useEffect } from 'react';
import { GreetingData } from '@/lib/email-state';

interface Props {
  data: GreetingData;
  isSelected: boolean;
  onClick: () => void;
  onUpdate?: (data: Partial<GreetingData>) => void;
}

export function GreetingBlock({ data, isSelected, onClick, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  return (
    <div
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName !== 'INPUT') {
          onClick();
        }
      }}
      className={`relative transition-all p-6 ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={{ backgroundColor: '#ffffff', cursor: isSelected ? 'default' : 'pointer' }}
    >
      {isEditing && isSelected ? (
        <input
          ref={inputRef}
          type="text"
          value={data.text}
          onChange={(e) => onUpdate?.({ text: e.target.value })}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              setIsEditing(false);
            }
          }}
          onClick={(e) => e.stopPropagation()}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            color: '#334155',
            margin: 0,
            width: '100%',
            border: '2px solid #ec4899',
            borderRadius: '4px',
            padding: '4px 8px',
            outline: 'none',
          }}
        />
      ) : (
        <p
          onDoubleClick={(e) => {
            e.stopPropagation();
            if (isSelected) {
              setIsEditing(true);
            }
          }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            color: '#334155',
            margin: 0,
            cursor: isSelected ? 'text' : 'pointer',
            minHeight: '24px',
          }}
        >
          {data.text || (isSelected ? 'Dvojklik pro přidání oslovení' : '')}
        </p>
      )}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Oslovení • Dvojklik pro editaci
        </div>
      )}
    </div>
  );
}




