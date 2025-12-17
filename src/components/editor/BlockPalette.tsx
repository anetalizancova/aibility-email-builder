'use client';

import { useDraggable } from '@dnd-kit/core';
import { BlockType, blockLabels } from '@/lib/email-state';

const availableBlocks: BlockType[] = [
  'greeting',
  'hero-image',
  'text-section',
  'gradient-box',
  'cta-button',
  'image',
  'divider',
  'spacer',
  'footer',
];

interface DraggableBlockProps {
  type: BlockType;
}

function DraggableBlock({ type }: DraggableBlockProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type, fromPalette: true },
  });

  const blockInfo = blockLabels[type];

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        flex items-center gap-3 p-3 rounded-lg border border-gray-200 
        bg-white cursor-grab active:cursor-grabbing
        hover:border-pink-300 hover:shadow-sm transition-all
        ${isDragging ? 'opacity-50 scale-95' : ''}
      `}
    >
      <span className="text-2xl">{blockInfo.icon}</span>
      <div>
        <div className="font-medium text-gray-900 text-sm">{blockInfo.name}</div>
        <div className="text-xs text-gray-500">{blockInfo.description}</div>
      </div>
    </div>
  );
}

interface BlockPaletteProps {
  onAddBlock: (type: BlockType) => void;
}

export function BlockPalette({ onAddBlock }: BlockPaletteProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">Bloky</h2>
        <p className="text-xs text-gray-500 mt-1">Přetáhni nebo klikni pro přidání</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {availableBlocks.map((type) => (
          <div key={type} onClick={() => onAddBlock(type)}>
            <DraggableBlock type={type} />
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="text-xs text-gray-500">
          💡 Tip: Bloky můžeš přeřadit přetažením v preview
        </div>
      </div>
    </div>
  );
}

