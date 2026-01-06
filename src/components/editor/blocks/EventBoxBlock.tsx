'use client';

import { useState, useRef, useEffect } from 'react';
import { EventBoxData } from '@/lib/email-state';

interface Props {
  data: EventBoxData;
  isSelected: boolean;
  onClick: () => void;
  onUpdate?: (data: Partial<EventBoxData>) => void;
}

export function EventBoxBlock({ data, isSelected, onClick, onUpdate }: Props) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const buttonTextRef = useRef<HTMLInputElement>(null);
  const buttonUrlRef = useRef<HTMLInputElement>(null);
  const metaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingField === 'title' && titleRef.current) titleRef.current.focus();
    if (editingField === 'description' && descRef.current) descRef.current.focus();
    if (editingField === 'buttonText' && buttonTextRef.current) buttonTextRef.current.focus();
    if (editingField === 'buttonUrl' && buttonUrlRef.current) buttonUrlRef.current.focus();
    if (editingField === 'metaInfo' && metaRef.current) metaRef.current.focus();
  }, [editingField]);
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
          {editingField === 'metaInfo' && isSelected ? (
            <input
              ref={metaRef}
              type="text"
              value={data.metaInfo}
              onChange={(e) => onUpdate?.({ metaInfo: e.target.value })}
              onBlur={() => setEditingField(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  setEditingField(null);
                }
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '1px',
                color: '#6b7280',
                textTransform: 'uppercase',
                margin: '0 0 12px 0',
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
                if (isSelected) setEditingField('metaInfo');
              }}
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '1px',
                color: '#6b7280',
                textTransform: 'uppercase',
                margin: '0 0 12px 0',
                cursor: isSelected ? 'text' : 'pointer',
                minHeight: '20px',
              }}
            >
              {data.metaInfo || (isSelected ? 'Dvojklik pro meta info' : '')}
            </p>
          )}

          {/* Title */}
          {editingField === 'title' && isSelected ? (
            <input
              ref={titleRef}
              type="text"
              value={data.title}
              onChange={(e) => onUpdate?.({ title: e.target.value })}
              onBlur={() => setEditingField(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  setEditingField(null);
                }
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: '26px',
                lineHeight: 1.3,
                color: '#020617',
                fontWeight: 700,
                margin: '0 0 20px 0',
                width: '100%',
                border: '2px solid #ec4899',
                borderRadius: '4px',
                padding: '4px 8px',
                outline: 'none',
              }}
            />
          ) : (
            <h2
              onDoubleClick={(e) => {
                e.stopPropagation();
                if (isSelected) setEditingField('title');
              }}
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: '26px',
                lineHeight: 1.3,
                color: '#020617',
                fontWeight: 700,
                margin: '0 0 20px 0',
                cursor: isSelected ? 'text' : 'pointer',
                minHeight: '34px',
              }}
            >
              {data.title || (isSelected ? 'Dvojklik pro nadpis' : '')}
            </h2>
          )}

          {/* Description */}
          {editingField === 'description' && isSelected ? (
            <textarea
              ref={descRef}
              value={data.description}
              onChange={(e) => onUpdate?.({ description: e.target.value })}
              onBlur={() => setEditingField(null)}
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#020617',
                margin: '0 0 24px 0',
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
            <div
              onDoubleClick={(e) => {
                e.stopPropagation();
                if (isSelected) setEditingField('description');
              }}
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#020617',
                margin: '0 0 24px 0',
                cursor: isSelected ? 'text' : 'pointer',
                minHeight: '24px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {data.description || (isSelected ? 'Dvojklik pro popis' : '')}
            </div>
          )}

          {/* Button */}
          <div style={{ marginTop: '24px' }}>
            {editingField === 'buttonText' && isSelected ? (
              <input
                ref={buttonTextRef}
                type="text"
                value={data.buttonText}
                onChange={(e) => onUpdate?.({ buttonText: e.target.value })}
                onBlur={() => setEditingField(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    setEditingField(null);
                  }
                }}
                onClick={(e) => e.stopPropagation()}
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
                  padding: '0 32px',
                  border: '2px solid #ec4899',
                  outline: 'none',
                  minWidth: '200px',
                }}
              />
            ) : (
              <a
                href={data.buttonUrl}
                onDoubleClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isSelected) setEditingField('buttonText');
                }}
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
                  cursor: isSelected ? 'text' : 'pointer',
                }}
              >
                {data.buttonText || (isSelected ? 'Dvojklik pro text tlačítka' : '')}
              </a>
            )}
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#94a3b8' }}>
              {editingField === 'buttonUrl' && isSelected ? (
                <input
                  ref={buttonUrlRef}
                  type="text"
                  value={data.buttonUrl}
                  onChange={(e) => onUpdate?.({ buttonUrl: e.target.value })}
                  onBlur={() => setEditingField(null)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="https://..."
                  style={{
                    border: '2px solid #ec4899',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    outline: 'none',
                    width: '300px',
                    maxWidth: '100%',
                  }}
                />
              ) : (
                <span
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    if (isSelected) setEditingField('buttonUrl');
                  }}
                  style={{ cursor: isSelected ? 'text' : 'pointer' }}
                >
                  → {data.buttonUrl || (isSelected ? 'Dvojklik pro URL' : '')}
                </span>
              )}
            </div>
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
          Event box • Dvojklik pro editaci
        </div>
      )}
    </div>
  );
}

