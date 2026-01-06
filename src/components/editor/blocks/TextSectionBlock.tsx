'use client';

import { useState, useRef, useEffect } from 'react';
import { TextSectionData } from '@/lib/email-state';

interface Props {
  data: TextSectionData;
  isSelected: boolean;
  onClick: () => void;
  onUpdate?: (data: Partial<TextSectionData>) => void;
}

export function TextSectionBlock({ data, isSelected, onClick, onUpdate }: Props) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditingTitle && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    if (isEditingContent && contentRef.current) {
      contentRef.current.focus();
    }
  }, [isEditingContent]);

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleContentBlur = () => {
    setIsEditingContent(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdate) {
      onUpdate({ title: e.target.value });
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onUpdate) {
      onUpdate({ content: e.target.value });
    }
  };

  return (
    <div
      onClick={(e) => {
        // Don't trigger onClick when clicking on editable elements
        if ((e.target as HTMLElement).tagName !== 'INPUT' && 
            (e.target as HTMLElement).tagName !== 'TEXTAREA') {
          onClick();
        }
      }}
      className={`relative transition-all p-6 ${
        isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={{ backgroundColor: '#ffffff', cursor: isSelected ? 'default' : 'pointer' }}
    >
      {data.showTitle && (
        isEditingTitle && isSelected ? (
          <input
            ref={titleRef}
            type="text"
            value={data.title || ''}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                setIsEditingTitle(false);
              }
            }}
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '20px',
              fontWeight: 600,
              color: '#020617',
              marginBottom: '12px',
              lineHeight: 1.3,
              width: '100%',
              border: '2px solid #ec4899',
              borderRadius: '4px',
              padding: '4px 8px',
              outline: 'none',
            }}
          />
        ) : (
          <h3
            onDoubleClick={() => isSelected && setIsEditingTitle(true)}
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '20px',
              fontWeight: 600,
              color: '#020617',
              marginBottom: '12px',
              lineHeight: 1.3,
              cursor: isSelected ? 'text' : 'pointer',
              minHeight: '28px',
            }}
          >
            {data.title || (isSelected ? 'Klikni pro přidání nadpisu' : '')}
          </h3>
        )
      )}
      
      {isEditingContent && isSelected ? (
        <textarea
          ref={contentRef}
          value={data.content}
          onChange={handleContentChange}
          onBlur={handleContentBlur}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            color: '#334155',
            lineHeight: 1.7,
            margin: 0,
            width: '100%',
            minHeight: '100px',
            border: '2px solid #ec4899',
            borderRadius: '4px',
            padding: '8px',
            outline: 'none',
            resize: 'vertical',
          }}
        />
      ) : (
        <p
          onDoubleClick={() => isSelected && setIsEditingContent(true)}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            color: '#334155',
            lineHeight: 1.7,
            margin: 0,
            cursor: isSelected ? 'text' : 'pointer',
            minHeight: '24px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {data.content || (isSelected ? 'Klikni pro přidání textu' : '')}
        </p>
      )}
      
      {isSelected && (
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Text • Dvojklik pro editaci
        </div>
      )}
    </div>
  );
}




