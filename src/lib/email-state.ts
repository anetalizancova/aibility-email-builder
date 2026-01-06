// Email Builder State Management
import { useState, useCallback } from 'react';

// Block Types
export type BlockType = 
  | 'greeting'
  | 'hero-image'
  | 'text-section'
  | 'gradient-box'
  | 'event-box'
  | 'use-case-bubble'
  | 'video-section'
  | 'cta-button'
  | 'image'
  | 'divider'
  | 'spacer'
  | 'footer';

// Block Data Interfaces
export interface GreetingData {
  text: string;
}

export interface HeroImageData {
  imageUrl: string;
  altText: string;
}

export interface TextSectionData {
  title: string;
  content: string;
  showTitle: boolean;
}

export interface GradientBoxData {
  title: string;
  content: string;
  bulletPoints: string[];
  gradientType: 'pink-blue' | 'sunset';
}

export interface CTAButtonData {
  text: string;
  url: string;
  style: 'gradient' | 'solid';
}

export interface ImageData {
  imageUrl: string;
  altText: string;
  width: number;
  isUploaded: boolean; // true = temporarily uploaded, needs Brevo
}

export interface DividerData {
  color: string;
  width: string; // percentage
}

export interface SpacerData {
  height: number; // px
}

export interface FooterData {
  logoUrl: string;
  showSocials: boolean;
  companyName: string;
  address: string;
}

export interface EventBoxData {
  metaInfo: string; // e.g., "Středa 8:00 • 50 minut • Zdarma"
  title: string;
  description: string; // can be multiple paragraphs, separated by \n
  buttonText: string;
  buttonUrl: string;
  gradientPosition: 'left' | 'right'; // where the gradient side is
  gradientType: 'pink-blue' | 'blue-pink' | 'sunset';
}

export interface UseCaseBubbleData {
  title: string;
  result: string;
  alignment: 'left' | 'right';
  gradientUrl: string;
}

export interface VideoSectionData {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  altText: string;
}

// Union type for all block data
export type BlockData = 
  | GreetingData
  | HeroImageData 
  | TextSectionData 
  | GradientBoxData 
  | EventBoxData
  | UseCaseBubbleData
  | VideoSectionData
  | CTAButtonData 
  | ImageData 
  | DividerData 
  | SpacerData 
  | FooterData;

// Email Block
export interface EmailBlock {
  id: string;
  type: BlockType;
  data: BlockData;
}

// Email State
export interface EmailState {
  blocks: EmailBlock[];
  selectedBlockId: string | null;
  theme: 'light-pink-blue' | 'light-sunset' | 'dark-pink-blue' | 'dark-sunset';
  preheader: string;
}

// Default data for each block type
export const getDefaultBlockData = (type: BlockType): BlockData => {
  switch (type) {
    case 'greeting':
      return {
        text: 'Dobrý den, {{ contact.OSLOVENI }},',
      };
    case 'hero-image':
      return {
        imageUrl: 'https://via.placeholder.com/600x300',
        altText: 'Hero image',
      };
    case 'text-section':
      return {
        title: 'Nadpis sekce',
        content: 'Zde napište obsah vaší sekce. Můžete použít více odstavců.',
        showTitle: true,
      };
    case 'gradient-box':
      return {
        title: '✨ Důležitá informace',
        content: 'Hlavní sdělení v barevném boxu.',
        bulletPoints: [],
        gradientType: 'pink-blue',
      };
    case 'event-box':
      return {
        metaInfo: 'Středa 8:00 • 50 minut • Zdarma',
        title: 'AI Morning Show',
        description: 'Původně to byl náš interní meeting, kde si v týmu sdílíme, co nám s AI funguje, co ne a jak žijeme AI first.\n\nPak nás napadlo: proč si to nechávat pro sebe? Žádná teorie, žádné buzzwordy. Jen reálné ukázky, co děláme, jak to děláme a co se nám (ne)povedlo.',
        buttonText: 'Připojte se zdarma',
        buttonUrl: 'https://aibility.cz',
        gradientPosition: 'right',
        gradientType: 'pink-blue',
      };
    case 'use-case-bubble':
      return {
        title: 'HR: 6 hodin práce denně',
        result: '→ 1 hodina s AI',
        alignment: 'left',
        gradientUrl: 'https://d8i8u.img.bh.d.sendibt3.com/im/sh/bU7VO-uYhPWX.png?u=WtVElij8PJZGdmbTqTmqLMTcgUKHKFEd',
      };
    case 'video-section':
      return {
        videoUrl: 'https://www.youtube.com/watch?v=example',
        thumbnailUrl: 'https://img.youtube.com/vi/example/maxresdefault.jpg',
        title: 'Jak to vypadá v praxi',
        altText: 'Video thumbnail',
      };
    case 'cta-button':
      return {
        text: 'Zjistit více',
        url: 'https://aibility.cz',
        style: 'gradient',
      };
    case 'image':
      return {
        imageUrl: '',
        altText: 'Obrázek',
        width: 100,
        isUploaded: false,
      };
    case 'divider':
      return {
        color: '#e5e7eb',
        width: '80',
      };
    case 'spacer':
      return {
        height: 24,
      };
    case 'footer':
      return {
        logoUrl: 'https://d8i8u.img.bh.d.sendibt3.com/im/sh/0KocJ5hj80v-.jpg?u=WtVElij8PJZGdmbTqTmqLMTcgUKHKFEd',
        showSocials: true,
        companyName: 'Aibility s.r.o.',
        address: 'Praha, Česká republika',
      };
    default:
      return {} as BlockData;
  }
};

// Block labels for UI
export const blockLabels: Record<BlockType, { name: string; icon: string; description: string }> = {
  'greeting': {
    name: 'Oslovení',
    icon: '👋',
    description: 'Personalizované oslovení',
  },
  'hero-image': {
    name: 'Hero obrázek',
    icon: '🖼️',
    description: 'Hlavní obrázek v záhlaví',
  },
  'text-section': {
    name: 'Text',
    icon: '📝',
    description: 'Nadpis a odstavec textu',
  },
  'gradient-box': {
    name: 'Barevný box',
    icon: '🎨',
    description: 'Zvýrazněný box s gradientem',
  },
  'event-box': {
    name: 'Event box',
    icon: '📅',
    description: 'Box pro akce s gradientem',
  },
  'use-case-bubble': {
    name: 'Use case bublina',
    icon: '💬',
    description: 'Bublina pro use case (zleva/zprava)',
  },
  'video-section': {
    name: 'Video sekce',
    icon: '🎥',
    description: 'Sekce s YouTube videem',
  },
  'cta-button': {
    name: 'Tlačítko',
    icon: '👆',
    description: 'Call-to-action tlačítko',
  },
  'image': {
    name: 'Obrázek',
    icon: '📷',
    description: 'Samostatný obrázek',
  },
  'divider': {
    name: 'Oddělovač',
    icon: '➖',
    description: 'Horizontální čára',
  },
  'spacer': {
    name: 'Mezera',
    icon: '↕️',
    description: 'Vertikální mezera',
  },
  'footer': {
    name: 'Patička',
    icon: '📋',
    description: 'Logo a informace o firmě',
  },
};

// Generate unique ID
const generateId = () => `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Initial state
const initialState: EmailState = {
  blocks: [],
  selectedBlockId: null,
  theme: 'light-pink-blue',
  preheader: '',
};

// Custom hook for email state management
export function useEmailState(initial?: Partial<EmailState>) {
  const [state, setState] = useState<EmailState>({ ...initialState, ...initial });

  // Add a new block
  const addBlock = useCallback((type: BlockType, index?: number) => {
    const newBlock: EmailBlock = {
      id: generateId(),
      type,
      data: getDefaultBlockData(type),
    };

    setState((prev) => {
      const newBlocks = [...prev.blocks];
      if (index !== undefined) {
        newBlocks.splice(index, 0, newBlock);
      } else {
        newBlocks.push(newBlock);
      }
      return { ...prev, blocks: newBlocks, selectedBlockId: newBlock.id };
    });

    return newBlock.id;
  }, []);

  // Remove a block
  const removeBlock = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((b) => b.id !== id),
      selectedBlockId: prev.selectedBlockId === id ? null : prev.selectedBlockId,
    }));
  }, []);

  // Update block data
  const updateBlock = useCallback((id: string, data: Partial<BlockData>) => {
    setState((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) =>
        b.id === id ? { ...b, data: { ...b.data, ...data } as BlockData } : b
      ),
    }));
  }, []);

  // Move block (for drag & drop)
  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    setState((prev) => {
      const newBlocks = [...prev.blocks];
      const [removed] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, removed);
      return { ...prev, blocks: newBlocks };
    });
  }, []);

  // Reorder blocks (for dnd-kit)
  const reorderBlocks = useCallback((newOrder: string[]) => {
    setState((prev) => {
      const blockMap = new Map(prev.blocks.map((b) => [b.id, b]));
      const newBlocks = newOrder
        .map((id) => blockMap.get(id))
        .filter((b): b is EmailBlock => b !== undefined);
      return { ...prev, blocks: newBlocks };
    });
  }, []);

  // Select a block
  const selectBlock = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, selectedBlockId: id }));
  }, []);

  // Duplicate a block
  const duplicateBlock = useCallback((id: string) => {
    setState((prev) => {
      const blockIndex = prev.blocks.findIndex((b) => b.id === id);
      if (blockIndex === -1) return prev;

      const originalBlock = prev.blocks[blockIndex];
      const newBlock: EmailBlock = {
        id: generateId(),
        type: originalBlock.type,
        data: { ...originalBlock.data },
      };

      const newBlocks = [...prev.blocks];
      newBlocks.splice(blockIndex + 1, 0, newBlock);

      return { ...prev, blocks: newBlocks, selectedBlockId: newBlock.id };
    });
  }, []);

  // Set theme
  const setTheme = useCallback((theme: EmailState['theme']) => {
    setState((prev) => ({ ...prev, theme }));
  }, []);

  // Set preheader
  const setPreheader = useCallback((preheader: string) => {
    setState((prev) => ({ ...prev, preheader }));
  }, []);

  // Get selected block
  const getSelectedBlock = useCallback(() => {
    return state.blocks.find((b) => b.id === state.selectedBlockId) || null;
  }, [state.blocks, state.selectedBlockId]);

  // Clear all blocks
  const clearBlocks = useCallback(() => {
    setState((prev) => ({ ...prev, blocks: [], selectedBlockId: null }));
  }, []);

  // Load state (for importing)
  const loadState = useCallback((newState: EmailState) => {
    setState(newState);
  }, []);

  return {
    state,
    addBlock,
    removeBlock,
    updateBlock,
    moveBlock,
    reorderBlocks,
    selectBlock,
    duplicateBlock,
    setTheme,
    setPreheader,
    getSelectedBlock,
    clearBlocks,
    loadState,
  };
}

// Type guards for block data
export const isGreetingData = (data: BlockData): data is GreetingData =>
  'text' in data && Object.keys(data).length === 1 && !('url' in data);

export const isHeroImageData = (data: BlockData): data is HeroImageData =>
  'imageUrl' in data && 'altText' in data && !('width' in data);

export const isTextSectionData = (data: BlockData): data is TextSectionData =>
  'title' in data && 'content' in data && 'showTitle' in data;

export const isGradientBoxData = (data: BlockData): data is GradientBoxData =>
  'bulletPoints' in data && 'gradientType' in data && !('metaInfo' in data);

export const isEventBoxData = (data: BlockData): data is EventBoxData =>
  'metaInfo' in data && 'gradientPosition' in data && 'buttonText' in data;

export const isUseCaseBubbleData = (data: BlockData): data is UseCaseBubbleData =>
  'title' in data && 'result' in data && 'alignment' in data && 'gradientUrl' in data;

export const isVideoSectionData = (data: BlockData): data is VideoSectionData =>
  'videoUrl' in data && 'thumbnailUrl' in data && 'title' in data && 'altText' in data;

export const isCTAButtonData = (data: BlockData): data is CTAButtonData =>
  'text' in data && 'url' in data && 'style' in data;

export const isImageData = (data: BlockData): data is ImageData =>
  'imageUrl' in data && 'width' in data && 'isUploaded' in data;

export const isDividerData = (data: BlockData): data is DividerData =>
  'color' in data && 'width' in data && !('height' in data);

export const isSpacerData = (data: BlockData): data is SpacerData =>
  'height' in data && Object.keys(data).length === 1;

export const isFooterData = (data: BlockData): data is FooterData =>
  'logoUrl' in data && 'showSocials' in data;

