'use client';

import { Theme } from '@/themes';

interface GradientBoxProps {
  title: string;
  emoji?: string;
  children: React.ReactNode;
  theme: Theme;
}

export function GradientBox({ title, emoji, children, theme }: GradientBoxProps) {
  return (
    <div
      className="rounded-2xl p-7"
      style={{
        backgroundImage: `linear-gradient(${theme.colors.boxBgOverlay}, ${theme.colors.boxBgOverlay}), url('${theme.gradientImageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: theme.colors.boxBg,
      }}
    >
      <h2
        className="mb-3 text-[22px] leading-tight"
        style={{
          color: theme.colors.textPrimary,
          fontFamily: "'Lora', 'Times New Roman', serif",
        }}
      >
        {emoji && <span className="inline-block align-middle mr-2">{emoji}</span>}
        {title}
      </h2>
      <div
        className="text-[15px] leading-relaxed space-y-4"
        style={{ color: theme.colors.textPrimary }}
      >
        {children}
      </div>
    </div>
  );
}

// HTML Export funkce
export function gradientBoxToHTML(props: GradientBoxProps): string {
  const { title, emoji, theme } = props;
  
  return `<tr>
  <td class="mobile-padding" style="padding:0 32px 20px 32px;">
    <table 
      border="0" 
      cellpadding="0" 
      cellspacing="0" 
      width="100%" 
      style="
        border-radius:16px; 
        background-image: 
          linear-gradient(${theme.colors.boxBgOverlay}, ${theme.colors.boxBgOverlay}),
          url('${theme.gradientImageUrl}');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: ${theme.colors.boxBg};
      "
    >
      <tr>
        <td class="mobile-padding-box" style="padding:28px 24px; font-family:'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:${theme.colors.textPrimary};">
          <h2 style="margin:0 0 12px 0; font-size:22px; line-height:1.4; color:${theme.colors.textPrimary}; font-family:'Lora','Times New Roman',serif; orphans: 2; widows: 2;">
            ${emoji ? `<span style="display:inline-block; vertical-align:middle; line-height:1; font-size:1em;">${emoji}</span> ` : ''}${title}
          </h2>
          <!-- CONTENT HERE -->
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}




