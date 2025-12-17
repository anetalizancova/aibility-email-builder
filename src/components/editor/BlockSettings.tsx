'use client';

import { useState, useRef } from 'react';
import {
  EmailBlock,
  BlockData,
  HeroImageData,
  TextSectionData,
  GradientBoxData,
  CTAButtonData,
  ImageData,
  DividerData,
  SpacerData,
  FooterData,
  blockLabels,
  isHeroImageData,
  isTextSectionData,
  isGradientBoxData,
  isCTAButtonData,
  isImageData,
  isDividerData,
  isSpacerData,
  isFooterData,
} from '@/lib/email-state';

interface BlockSettingsProps {
  block: EmailBlock | null;
  greeting: string;
  preheader: string;
  onUpdateBlock: (id: string, data: Partial<BlockData>) => void;
  onUpdateGreeting: (greeting: string) => void;
  onUpdatePreheader: (preheader: string) => void;
  onImageUpload: (file: File) => Promise<string>;
}

export function BlockSettings({
  block,
  greeting,
  preheader,
  onUpdateBlock,
  onUpdateGreeting,
  onUpdatePreheader,
  onImageUpload,
}: BlockSettingsProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (blockId: string, file: File) => {
    setUploading(true);
    try {
      const url = await onImageUpload(file);
      onUpdateBlock(blockId, { imageUrl: url, isUploaded: true } as Partial<ImageData>);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  // General email settings when no block selected
  if (!block) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Nastavení emailu</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preheader (preview text)
            </label>
            <input
              type="text"
              value={preheader}
              onChange={(e) => onUpdatePreheader(e.target.value)}
              placeholder="Text, který se zobrazí v inboxu..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Zobrazí se v náhledu emailu v inboxu
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Oslovení
            </label>
            <input
              type="text"
              value={greeting}
              onChange={(e) => onUpdateGreeting(e.target.value)}
              placeholder="Dobrý den, {{ contact.OSLOVENI }},"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Použij {'{{ contact.OSLOVENI }}'} pro personalizaci
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              💡 Klikni na blok v preview pro úpravu jeho obsahu
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { data, type, id } = block;
  const blockInfo = blockLabels[type];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xl">{blockInfo.icon}</span>
          <h2 className="font-semibold text-gray-900">{blockInfo.name}</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Hero Image Settings */}
        {isHeroImageData(data) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL obrázku
              </label>
              <input
                type="text"
                value={(data as HeroImageData).imageUrl}
                onChange={(e) => onUpdateBlock(id, { imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alt text
              </label>
              <input
                type="text"
                value={(data as HeroImageData).altText}
                onChange={(e) => onUpdateBlock(id, { altText: e.target.value })}
                placeholder="Popis obrázku"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </>
        )}

        {/* Text Section Settings */}
        {isTextSectionData(data) && (
          <>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showTitle"
                checked={(data as TextSectionData).showTitle}
                onChange={(e) => onUpdateBlock(id, { showTitle: e.target.checked })}
                className="rounded border-gray-300 text-pink-500 focus:ring-pink-500"
              />
              <label htmlFor="showTitle" className="text-sm text-gray-700">
                Zobrazit nadpis
              </label>
            </div>
            {(data as TextSectionData).showTitle && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nadpis
                </label>
                <input
                  type="text"
                  value={(data as TextSectionData).title}
                  onChange={(e) => onUpdateBlock(id, { title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text
              </label>
              <textarea
                value={(data as TextSectionData).content}
                onChange={(e) => onUpdateBlock(id, { content: e.target.value })}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </>
        )}

        {/* Gradient Box Settings */}
        {isGradientBoxData(data) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nadpis
              </label>
              <input
                type="text"
                value={(data as GradientBoxData).title}
                onChange={(e) => onUpdateBlock(id, { title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text
              </label>
              <textarea
                value={(data as GradientBoxData).content}
                onChange={(e) => onUpdateBlock(id, { content: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Styl gradientu
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdateBlock(id, { gradientType: 'pink-blue' })}
                  className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                    (data as GradientBoxData).gradientType === 'pink-blue'
                      ? 'border-pink-500 bg-pink-50 text-pink-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  💗💙 Pink-Blue
                </button>
                <button
                  onClick={() => onUpdateBlock(id, { gradientType: 'sunset' })}
                  className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                    (data as GradientBoxData).gradientType === 'sunset'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  🧡💗 Sunset
                </button>
              </div>
            </div>
          </>
        )}

        {/* CTA Button Settings */}
        {isCTAButtonData(data) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text tlačítka
              </label>
              <input
                type="text"
                value={(data as CTAButtonData).text}
                onChange={(e) => onUpdateBlock(id, { text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL odkazu
              </label>
              <input
                type="text"
                value={(data as CTAButtonData).url}
                onChange={(e) => onUpdateBlock(id, { url: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Styl tlačítka
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdateBlock(id, { style: 'gradient' })}
                  className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                    (data as CTAButtonData).style === 'gradient'
                      ? 'border-pink-500 bg-gradient-to-r from-pink-500 to-blue-500 text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Gradient
                </button>
                <button
                  onClick={() => onUpdateBlock(id, { style: 'solid' })}
                  className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                    (data as CTAButtonData).style === 'solid'
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Solid
                </button>
              </div>
            </div>
          </>
        )}

        {/* Image Settings */}
        {isImageData(data) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL obrázku
              </label>
              <input
                type="text"
                value={(data as ImageData).imageUrl}
                onChange={(e) => onUpdateBlock(id, { imageUrl: e.target.value, isUploaded: false })}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div className="text-center text-sm text-gray-500 py-2">nebo</div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(id, file);
              }}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-pink-300 hover:text-pink-600 transition-colors"
            >
              {uploading ? 'Nahrávám...' : '📤 Nahrát obrázek'}
            </button>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Šířka: {(data as ImageData).width}%
              </label>
              <input
                type="range"
                min="20"
                max="100"
                value={(data as ImageData).width}
                onChange={(e) => onUpdateBlock(id, { width: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alt text
              </label>
              <input
                type="text"
                value={(data as ImageData).altText}
                onChange={(e) => onUpdateBlock(id, { altText: e.target.value })}
                placeholder="Popis obrázku"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </>
        )}

        {/* Divider Settings */}
        {isDividerData(data) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Šířka: {(data as DividerData).width}%
              </label>
              <input
                type="range"
                min="20"
                max="100"
                value={(data as DividerData).width}
                onChange={(e) => onUpdateBlock(id, { width: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Barva
              </label>
              <input
                type="color"
                value={(data as DividerData).color}
                onChange={(e) => onUpdateBlock(id, { color: e.target.value })}
                className="w-full h-10 rounded border border-gray-300"
              />
            </div>
          </>
        )}

        {/* Spacer Settings */}
        {isSpacerData(data) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Výška: {(data as SpacerData).height}px
            </label>
            <input
              type="range"
              min="8"
              max="80"
              step="4"
              value={(data as SpacerData).height}
              onChange={(e) => onUpdateBlock(id, { height: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        )}

        {/* Footer Settings */}
        {isFooterData(data) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL loga
              </label>
              <input
                type="text"
                value={(data as FooterData).logoUrl}
                onChange={(e) => onUpdateBlock(id, { logoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showSocials"
                checked={(data as FooterData).showSocials}
                onChange={(e) => onUpdateBlock(id, { showSocials: e.target.checked })}
                className="rounded border-gray-300 text-pink-500 focus:ring-pink-500"
              />
              <label htmlFor="showSocials" className="text-sm text-gray-700">
                Zobrazit sociální sítě
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Název firmy
              </label>
              <input
                type="text"
                value={(data as FooterData).companyName}
                onChange={(e) => onUpdateBlock(id, { companyName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresa
              </label>
              <input
                type="text"
                value={(data as FooterData).address}
                onChange={(e) => onUpdateBlock(id, { address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

