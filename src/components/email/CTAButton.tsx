'use client';

import { Theme } from '@/themes';

interface CTAButtonProps {
  text: string;
  href: string;
  emoji?: string;
  theme: Theme;
}

export function CTAButton({ text, href, emoji, theme }: CTAButtonProps) {
  const isGradient = theme.colors.buttonBg.includes('gradient');
  
  return (
    <div className="text-center py-5">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-3 rounded-xl font-semibold text-base no-underline transition-transform hover:scale-105"
        style={{
          background: theme.colors.buttonBg,
          color: theme.colors.buttonText,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        }}
      >
        {emoji && <span className="inline-block align-middle mr-2">{emoji}</span>}
        {text}
      </a>
    </div>
  );
}

// HTML Export
export function ctaButtonToHTML(props: CTAButtonProps): string {
  const { text, href, emoji, theme } = props;
  const isGradient = theme.colors.buttonBg.includes('gradient');
  
  return `<tr>
  <td class="mobile-padding" align="center" style="padding:0 32px 28px 32px;">
    <!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:48px;v-text-anchor:middle;width:280px;" arcsize="50%" stroke="f" fillcolor="${isGradient ? '#000000' : theme.colors.buttonBg}">
      <w:anchorlock/>
      <center style="color:${theme.colors.buttonText};font-family:Inter, Arial,sans-serif;font-size:16px;font-weight:600;white-space:nowrap;">
        ${emoji ? emoji + ' ' : ''}${text}
      </center>
    </v:roundrect>
    <![endif]-->
    <!--[if !mso]><!-->
    <a 
      href="${href}" 
      target="_blank" 
      style="
        background:${theme.colors.buttonBg}; 
        border-radius:12px; 
        color:${theme.colors.buttonText}; 
        display:inline-block; 
        font-family:'Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; 
        font-size:16px; 
        font-weight:600; 
        line-height:48px; 
        text-align:center; 
        text-decoration:none; 
        padding:0 32px; 
        box-shadow:0 8px 24px rgba(0,0,0,0.2);
        white-space:nowrap;
      "
    >
      ${emoji ? `<span style="display:inline-block; vertical-align:middle; line-height:1; font-size:1em;">${emoji}</span> ` : ''}${text}
    </a>
    <!--<![endif]-->
  </td>
</tr>`;
}




