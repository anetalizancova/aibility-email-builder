'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  EmailBlock,
  isGreetingData,
  isHeroImageData,
  isTextSectionData,
  isGradientBoxData,
  isEventBoxData,
  isUseCaseBubbleData,
  isVideoSectionData,
  isCTAButtonData,
  isImageData,
  isDividerData,
  isSpacerData,
  isFooterData,
  EmailState,
} from '@/lib/email-state';
import { themes } from '@/themes';
import {
  GreetingBlock,
  HeroImageBlock,
  TextSectionBlock,
  GradientBoxBlock,
  EventBoxBlock,
  UseCaseBubbleBlock,
  VideoSectionBlock,
  CTAButtonBlock,
  ImageBlock,
  DividerBlock,
  SpacerBlock,
  FooterBlock,
} from './blocks';

interface SortableBlockProps {
  block: EmailBlock;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onDuplicate: () => void;
}

function SortableBlock({ block, isSelected, onSelect, onRemove, onDuplicate }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderBlock = () => {
    const { data } = block;
    
    if (isGreetingData(data)) {
      return <GreetingBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    if (isHeroImageData(data)) {
      return <HeroImageBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    if (isTextSectionData(data)) {
      return <TextSectionBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    if (isGradientBoxData(data)) {
      return <GradientBoxBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    if (isEventBoxData(data)) {
      return <EventBoxBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    if (isUseCaseBubbleData(data)) {
      return <UseCaseBubbleBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    if (isVideoSectionData(data)) {
      return <VideoSectionBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    if (isCTAButtonData(data)) {
      return <CTAButtonBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    if (isImageData(data)) {
      return <ImageBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    if (isDividerData(data)) {
      return <DividerBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    if (isSpacerData(data)) {
      return <SpacerBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    if (isFooterData(data)) {
      return <FooterBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    
    return null;
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10
          w-8 h-8 flex items-center justify-center
          bg-gray-100 rounded cursor-grab active:cursor-grabbing
          opacity-0 group-hover:opacity-100 transition-opacity
          ${isDragging ? 'opacity-100' : ''}
        `}
      >
        ⋮⋮
      </div>
      
      {/* Block actions */}
      {isSelected && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 flex flex-col gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
            className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
            title="Duplikovat"
          >
            📋
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
            title="Smazat"
          >
            🗑️
          </button>
        </div>
      )}
      
      {renderBlock()}
    </div>
  );
}

interface EmailCanvasProps {
  state: EmailState;
  onSelectBlock: (id: string | null) => void;
  onRemoveBlock: (id: string) => void;
  onDuplicateBlock: (id: string) => void;
}

export function EmailCanvas({ 
  state, 
  onSelectBlock, 
  onRemoveBlock,
  onDuplicateBlock,
}: EmailCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'email-canvas',
  });

  const blockIds = state.blocks.map((b) => b.id);
  const currentTheme = themes[state.theme];
  const isDark = state.theme.startsWith('dark');

  return (
    <div 
      className="flex-1 overflow-y-auto p-8"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      <div className="max-w-[620px] mx-auto">
        {/* Email preview container */}
        <div
          ref={setNodeRef}
          className={`
            rounded-2xl shadow-lg min-h-[400px] transition-all overflow-hidden
            ${isOver ? 'ring-2 ring-pink-500 ring-offset-4' : ''}
          `}
          style={{ 
            backgroundColor: isDark ? currentTheme.colors.containerBg : '#f3f4ff',
          }}
          onClick={() => onSelectBlock(null)}
        >
          {/* Gradient header */}
          <div 
            className="h-4"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.colors.gradientStart} 0%, ${currentTheme.colors.gradientEnd} 100%)`,
            }}
          />

          {/* Blocks */}
          {state.blocks.length === 0 ? (
            <div 
              className="flex flex-col items-center justify-center py-20"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              <div className="text-4xl mb-4">📧</div>
              <p className="text-lg font-medium">Začni přidávat bloky</p>
              <p className="text-sm">Přetáhni blok z levého panelu nebo klikni</p>
            </div>
          ) : (
            <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
              <div className="space-y-0">
                {state.blocks.map((block) => (
                  <SortableBlock
                    key={block.id}
                    block={block}
                    isSelected={state.selectedBlockId === block.id}
                    onSelect={() => onSelectBlock(block.id)}
                    onRemove={() => onRemoveBlock(block.id)}
                    onDuplicate={() => onDuplicateBlock(block.id)}
                  />
                ))}
              </div>
            </SortableContext>
          )}

          {/* Drop zone indicator when empty or at bottom */}
          {isOver && state.blocks.length > 0 && (
            <div className="h-16 border-2 border-dashed border-pink-300 bg-pink-50 rounded-lg m-4 flex items-center justify-center text-pink-500">
              Pusť zde
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
