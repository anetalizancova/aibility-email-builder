'use client';

import { Theme } from '@/themes';

interface TextSectionProps {
  children: React.ReactNode;
  theme: Theme;
  centered?: boolean;
}

export function TextSection({ children, theme, centered = false }: TextSectionProps) {
  return (
    <div
      className={`px-8 py-4 text-[15px] leading-relaxed ${centered ? 'text-center' : ''}`}
      style={{
        color: theme.colors.textPrimary,
        fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {children}
    </div>
  );
}

// HTML Export
export function textSectionToHTML(content: string, theme: Theme, centered = false): string {
  return `<tr>
  <td class="content-padding mobile-padding" style="padding:32px 32px 0 32px; color:${theme.colors.textPrimary}; font-family:'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;${centered ? ' text-align:center;' : ''}">
    ${content}
  </td>
</tr>`;
}

