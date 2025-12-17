// 4 barevné varianty pro Aibility emaily

export type ThemeId = 'light-pink-blue' | 'light-sunset' | 'dark-pink-blue' | 'dark-sunset';

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  colors: {
    // Background
    background: string;
    containerBg: string;
    boxBg: string;
    boxBgOverlay: string;
    
    // Text
    textPrimary: string;
    textSecondary: string;
    
    // Gradient
    gradientStart: string;
    gradientMid?: string;
    gradientEnd: string;
    
    // Button
    buttonBg: string;
    buttonText: string;
    
    // Accent
    link: string;
    border: string;
  };
  gradientCSS: string;
  gradientImageUrl: string;
}

// Pink-Blue gradient obrázek (už používáme)
const GRADIENT_PINK_BLUE = "https://ci3.googleusercontent.com/meips/ADKq_NZpoiVqgKPADQSXKkrgroIw0Iiwxo2GjsHmeDDmVC_P7muaBq_B5Gmc56BEfY1LP3HcTb-28VDxoMBO-l6BkWiQButxZ3hbvbjFNvIAnsiUQZBaPdu8JCBS_-Apsc7Mv1YP3yiksGK4UjzoGyprbUQP2ns=s0-d-e1-ft#https://d8i8u.img.bh.d.sendibt3.com/im/sh/bU7VO-uYhPWX.png?u=WtVElij8PJZGdmbTqTmqLMTcgUKHKFEd";

export const themes: Record<ThemeId, Theme> = {
  // ============================================
  // LIGHT PINK-BLUE (aktuální design)
  // ============================================
  'light-pink-blue': {
    id: 'light-pink-blue',
    name: 'Light Pink-Blue',
    description: 'Světlý design s růžovo-modrým gradientem',
    colors: {
      background: '#0a0a0a',
      containerBg: '#ffffff',
      boxBg: '#f9fafb',
      boxBgOverlay: 'rgba(249,250,251,0.9)',
      textPrimary: '#020617',
      textSecondary: '#64748b',
      gradientStart: '#ff7ad9', // pink
      gradientEnd: '#6a9bff',   // blue
      buttonBg: '#000000',
      buttonText: '#ffffff',
      link: '#1C58FF',
      border: 'rgba(148,163,184,0.2)',
    },
    gradientCSS: `
      radial-gradient(circle at 0% 0%, rgba(255,122,217,0.9) 0, transparent 55%),
      radial-gradient(circle at 100% 0%, rgba(106,155,255,0.9) 0, transparent 55%)
    `,
    gradientImageUrl: GRADIENT_PINK_BLUE,
  },

  // ============================================
  // LIGHT SUNSET (pink-blue-orange)
  // ============================================
  'light-sunset': {
    id: 'light-sunset',
    name: 'Light Sunset',
    description: 'Světlý design s růžovo-modro-oranžovým gradientem',
    colors: {
      background: '#0a0a0a',
      containerBg: '#ffffff',
      boxBg: '#fffbf5',
      boxBgOverlay: 'rgba(255,251,245,0.9)',
      textPrimary: '#020617',
      textSecondary: '#64748b',
      gradientStart: '#ff7ad9',  // pink
      gradientMid: '#6a9bff',    // blue
      gradientEnd: '#ffb86b',    // orange
      buttonBg: '#000000',
      buttonText: '#ffffff',
      link: '#ff6b35',
      border: 'rgba(148,163,184,0.2)',
    },
    gradientCSS: `
      radial-gradient(circle at 0% 0%, rgba(255,122,217,0.9) 0, transparent 45%),
      radial-gradient(circle at 100% 0%, rgba(106,155,255,0.9) 0, transparent 45%),
      radial-gradient(circle at 50% 100%, rgba(255,184,107,0.9) 0, transparent 55%)
    `,
    gradientImageUrl: GRADIENT_PINK_BLUE, // TODO: vytvořit sunset verzi
  },

  // ============================================
  // DARK PINK-BLUE
  // ============================================
  'dark-pink-blue': {
    id: 'dark-pink-blue',
    name: 'Dark Pink-Blue',
    description: 'Tmavý design s růžovo-modrým gradientem',
    colors: {
      background: '#0a0a0a',
      containerBg: '#1a1a2e',
      boxBg: '#252542',
      boxBgOverlay: 'rgba(37,37,66,0.9)',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      gradientStart: '#ff7ad9',
      gradientEnd: '#6a9bff',
      buttonBg: '#ffffff',
      buttonText: '#0a0a0a',
      link: '#a78bfa',
      border: 'rgba(148,163,184,0.15)',
    },
    gradientCSS: `
      radial-gradient(circle at 0% 0%, rgba(255,122,217,0.7) 0, transparent 55%),
      radial-gradient(circle at 100% 0%, rgba(106,155,255,0.7) 0, transparent 55%)
    `,
    gradientImageUrl: GRADIENT_PINK_BLUE,
  },

  // ============================================
  // DARK SUNSET
  // ============================================
  'dark-sunset': {
    id: 'dark-sunset',
    name: 'Dark Sunset',
    description: 'Tmavý design s růžovo-modro-oranžovým gradientem',
    colors: {
      background: '#0a0a0a',
      containerBg: '#1a1a1a',
      boxBg: '#2a2a2a',
      boxBgOverlay: 'rgba(42,42,42,0.9)',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      gradientStart: '#ff7ad9',
      gradientMid: '#6a9bff',
      gradientEnd: '#ffb86b',
      buttonBg: 'linear-gradient(135deg, #ffb86b, #ff5aff)',
      buttonText: '#0a0a0a',
      link: '#ffb86b',
      border: 'rgba(148,163,184,0.15)',
    },
    gradientCSS: `
      radial-gradient(circle at 0% 0%, rgba(255,122,217,0.7) 0, transparent 45%),
      radial-gradient(circle at 100% 0%, rgba(106,155,255,0.7) 0, transparent 45%),
      radial-gradient(circle at 50% 100%, rgba(255,184,107,0.7) 0, transparent 55%)
    `,
    gradientImageUrl: GRADIENT_PINK_BLUE,
  },
};

export const themeList = Object.values(themes);

export function getTheme(id: ThemeId): Theme {
  return themes[id];
}

