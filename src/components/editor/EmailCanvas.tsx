'use client';

import { useDroppable, useDraggable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  EmailBlock,
  BlockData,
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
  onUpdate?: (data: Partial<BlockData>) => void;
}

function SortableBlock({ block, isSelected, onSelect, onRemove, onDuplicate, onUpdate }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: block.id,
    data: {
      type: 'block',
      block,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  const renderBlock = () => {
    const { data } = block;
    
    if (isGreetingData(data)) {
      return <GreetingBlock data={data} isSelected={isSelected} onClick={onSelect} onUpdate={onUpdate} />;
    }
    if (isHeroImageData(data)) {
      return <HeroImageBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    if (isTextSectionData(data)) {
      return <TextSectionBlock data={data} isSelected={isSelected} onClick={onSelect} onUpdate={onUpdate} />;
    }
    if (isGradientBoxData(data)) {
      return <GradientBoxBlock data={data} isSelected={isSelected} onClick={onSelect} onUpdate={onUpdate} />;
    }
    if (isEventBoxData(data)) {
      return <EventBoxBlock data={data} isSelected={isSelected} onClick={onSelect} onUpdate={onUpdate} />;
    }
    if (isUseCaseBubbleData(data)) {
      return <UseCaseBubbleBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    if (isVideoSectionData(data)) {
      return <VideoSectionBlock data={data} isSelected={isSelected} onClick={onSelect} />;
    }
    if (isCTAButtonData(data)) {
      return <CTAButtonBlock data={data} isSelected={isSelected} onClick={onSelect} onUpdate={onUpdate} />;
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
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`
        relative group 
        border-2 rounded-lg transition-all
        ${isSelected ? 'border-pink-500 bg-pink-50/30' : 'border-transparent hover:border-gray-300'}
        ${isDragging ? 'shadow-2xl scale-105' : 'shadow-sm hover:shadow-md'}
      `}
    >
      {/* Drag handle - always visible, better positioned */}
      <div
        {...attributes}
        {...listeners}
        className={`
          absolute left-2 top-2
          w-8 h-8 flex items-center justify-center
          bg-white border border-gray-300 rounded-md shadow-sm
          cursor-grab active:cursor-grabbing
          hover:bg-pink-50 hover:border-pink-400 hover:shadow-md
          transition-all z-20
          ${isDragging ? 'opacity-70' : 'opacity-100'}
        `}
        title="Přesunout blok"
        onClick={(e) => e.stopPropagation()}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
          <path d="M5 4H11M5 8H11M5 12H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      
      {/* Block actions - always visible on hover, better positioned */}
      <div className={`
        absolute right-2 top-2
        flex flex-row gap-2 z-20
        ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
        transition-opacity
      `}>
        <button
          onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm hover:bg-blue-50 hover:border-blue-400 hover:shadow-md transition-all"
          title="Duplikovat blok"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
            <path d="M4 2H12C12.5523 2 13 2.44772 13 3V11M4 2C4 1.44772 4.44772 1 5 1H9.58579C9.851 1 10.1054 1.10536 10.2929 1.29289L12.7071 3.70711C12.8946 3.89464 13 4.149 13 4.41421V11M4 2L4 14H13V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm hover:bg-red-50 hover:border-red-400 hover:shadow-md transition-all"
          title="Smazat blok"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
            <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M6 7.5V12.5M10 7.5V12.5M3 4L3.5 13C3.5 13.5523 3.94772 14 4.5 14H11.5C12.0523 14 12.5 13.5523 12.5 13L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      {/* Selection indicator - subtle */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-pink-500 rounded-lg pointer-events-none z-0 bg-pink-50/20" />
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
  onUpdateBlock: (id: string, data: Partial<BlockData>) => void;
}

export function EmailCanvas({ 
  state, 
  onSelectBlock, 
  onRemoveBlock,
  onDuplicateBlock,
  onUpdateBlock,
}: EmailCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'email-canvas',
    data: {
      type: 'canvas',
    },
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
              <div className="space-y-3 py-3">
                {state.blocks.map((block, index) => (
                  <SortableBlock
                    key={block.id}
                    block={block}
                    isSelected={state.selectedBlockId === block.id}
                    onSelect={() => onSelectBlock(block.id)}
                    onRemove={() => onRemoveBlock(block.id)}
                    onDuplicate={() => onDuplicateBlock(block.id)}
                    onUpdate={(data) => onUpdateBlock(block.id, data)}
                  />
                ))}
              </div>
            </SortableContext>
          )}

          {/* Drop zone indicator when empty */}
          {isOver && state.blocks.length === 0 && (
            <div className="h-32 border-2 border-dashed border-pink-400 bg-pink-50 rounded-lg m-4 flex items-center justify-center text-pink-500 font-medium">
              Pusť blok zde
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
