'use client';

import { useState, useRef, useEffect } from 'react';
import { FooterData } from '@/lib/email-state';

interface Props {
  data: FooterData;
  isSelected: boolean;
  onClick: () => void;
  onUpdate?: (data: Partial<FooterData>) => void;
}

export function FooterBlock({ data, isSelected, onClick, onUpdate }: Props) {
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const companyRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingCompany && companyRef.current) companyRef.current.focus();
  }, [isEditingCompany]);
  useEffect(() => {
    if (isEditingAddress && addressRef.current) addressRef.current.focus();
  }, [isEditingAddress]);
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
        padding: '32px 24px',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        borderRadius: '0 0 16px 16px',
        cursor: isSelected ? 'default' : 'pointer',
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

      {isEditingCompany && isSelected ? (
        <input
          ref={companyRef}
          type="text"
          value={data.companyName}
          onChange={(e) => onUpdate?.({ companyName: e.target.value })}
          onBlur={() => setIsEditingCompany(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              setIsEditingCompany(false);
            }
          }}
          onClick={(e) => e.stopPropagation()}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#64748b',
            margin: '0 0 4px 0',
            width: '100%',
            maxWidth: '300px',
            border: '2px solid #ec4899',
            borderRadius: '4px',
            padding: '4px 8px',
            outline: 'none',
            textAlign: 'center',
          }}
        />
      ) : (
        <p
          onClick={(e) => {
            e.stopPropagation();
            if (isSelected) setIsEditingCompany(true);
          }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#64748b',
            margin: '0 0 4px 0',
            cursor: isSelected ? 'text' : 'pointer',
            minHeight: '20px',
          }}
        >
          {data.companyName || (isSelected ? 'Klikni pro název společnosti' : '')}
        </p>
      )}
      {isEditingAddress && isSelected ? (
        <input
          ref={addressRef}
          type="text"
          value={data.address}
          onChange={(e) => onUpdate?.({ address: e.target.value })}
          onBlur={() => setIsEditingAddress(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              setIsEditingAddress(false);
            }
          }}
          onClick={(e) => e.stopPropagation()}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: '#94a3b8',
            margin: 0,
            width: '100%',
            maxWidth: '300px',
            border: '2px solid #ec4899',
            borderRadius: '4px',
            padding: '4px 8px',
            outline: 'none',
            textAlign: 'center',
          }}
        />
      ) : (
        <p
          onClick={(e) => {
            e.stopPropagation();
            if (isSelected) setIsEditingAddress(true);
          }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: '#94a3b8',
            margin: 0,
            cursor: isSelected ? 'text' : 'pointer',
            minHeight: '18px',
          }}
        >
          {data.address || (isSelected ? 'Klikni pro adresu' : '')}
        </p>
      )}
      
      {isSelected && (
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Patička • Klikni pro editaci
        </div>
      )}
    </div>
  );
}




