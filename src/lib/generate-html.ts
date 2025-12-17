// Generate clean HTML email from state
import {
  EmailState,
  EmailBlock,
  isHeroImageData,
  isTextSectionData,
  isGradientBoxData,
  isCTAButtonData,
  isImageData,
  isDividerData,
  isSpacerData,
  isFooterData,
  HeroImageData,
  TextSectionData,
  GradientBoxData,
  CTAButtonData,
  ImageData,
  DividerData,
  SpacerData,
  FooterData,
} from './email-state';

// Helper to wrap emoji properly
const wrapEmoji = (text: string): string => {
  // Match emoji characters and wrap them in span
  return text.replace(
    /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu,
    '<span style="display:inline-block; vertical-align:middle; line-height:1; font-size:1.1em;">$1</span>'
  );
};

// Generate HTML for Hero Image block
const generateHeroImage = (data: HeroImageData): string => `
<tr>
  <td style="padding: 0;">
    <img src="${data.imageUrl}" alt="${data.altText}" style="width: 100%; height: auto; display: block; border-radius: 16px 16px 0 0;">
  </td>
</tr>`;

// Generate HTML for Text Section block
const generateTextSection = (data: TextSectionData): string => {
  const titleHtml = data.showTitle && data.title ? `
    <h3 style="font-family: 'Lora', Georgia, serif; font-size: 20px; font-weight: 600; color: #020617; margin: 0 0 12px 0; line-height: 1.3;">
      ${wrapEmoji(data.title)}
    </h3>` : '';

  return `
<tr>
  <td style="padding: 24px;">
    ${titleHtml}
    <p style="font-family: 'Inter', Arial, sans-serif; font-size: 16px; color: #334155; line-height: 1.7; margin: 0;">
      ${wrapEmoji(data.content.replace(/\n/g, '<br>'))}
    </p>
  </td>
</tr>`;
};

// Generate HTML for Gradient Box block
const generateGradientBox = (data: GradientBoxData): string => {
  const gradients = {
    'pink-blue': 'background: linear-gradient(135deg, rgba(255,122,217,0.15) 0%, rgba(106,155,255,0.15) 100%); border: 1px solid rgba(255,122,217,0.3);',
    'sunset': 'background: linear-gradient(135deg, rgba(255,184,107,0.15) 0%, rgba(255,122,217,0.15) 100%); border: 1px solid rgba(255,184,107,0.3);',
  };

  const bulletPointsHtml = data.bulletPoints && data.bulletPoints.length > 0 
    ? `<ul style="margin: 12px 0 0 0; padding-left: 20px;">
        ${data.bulletPoints.map(point => `<li style="font-family: 'Inter', Arial, sans-serif; font-size: 15px; color: #334155; line-height: 1.6;">${wrapEmoji(point)}</li>`).join('')}
      </ul>`
    : '';

  return `
<tr>
  <td style="padding: 0 24px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${gradients[data.gradientType]} border-radius: 12px;">
      <tr>
        <td style="padding: 24px;">
          ${data.title ? `<h4 style="font-family: 'Lora', Georgia, serif; font-size: 18px; font-weight: 600; color: #020617; margin: 0 0 12px 0;">${wrapEmoji(data.title)}</h4>` : ''}
          <p style="font-family: 'Inter', Arial, sans-serif; font-size: 15px; color: #334155; line-height: 1.6; margin: 0;">
            ${wrapEmoji(data.content)}
          </p>
          ${bulletPointsHtml}
        </td>
      </tr>
    </table>
  </td>
</tr>`;
};

// Generate HTML for CTA Button block
const generateCTAButton = (data: CTAButtonData): string => {
  const gradientStyle = `
    background: linear-gradient(135deg, #ff7ad9 0%, #6a9bff 100%);
    color: #ffffff;
  `;
  const solidStyle = `
    background: #020617;
    color: #ffffff;
  `;
  const buttonStyle = data.style === 'gradient' ? gradientStyle : solidStyle;

  // VML for Outlook
  const vmlButton = `
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${data.url}" style="height:48px;v-text-anchor:middle;width:200px;" arcsize="17%" ${data.style === 'gradient' ? 'fillcolor="#ff7ad9"' : 'fillcolor="#020617"'} stroke="f">
  <w:anchorlock/>
  <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">${data.text}</center>
</v:roundrect>
<![endif]-->`;

  return `
<tr>
  <td style="padding: 24px; text-align: center;">
    ${vmlButton}
    <!--[if !mso]><!-->
    <a href="${data.url}" style="display: inline-block; padding: 14px 32px; border-radius: 8px; font-family: 'Inter', Arial, sans-serif; font-size: 16px; font-weight: 600; text-decoration: none; ${buttonStyle}">
      ${wrapEmoji(data.text)}
    </a>
    <!--<![endif]-->
  </td>
</tr>`;
};

// Generate HTML for Image block
const generateImage = (data: ImageData): string => {
  if (!data.imageUrl) return '';
  
  return `
<tr>
  <td style="padding: 24px; text-align: center;">
    <img src="${data.imageUrl}" alt="${data.altText}" style="width: ${data.width}%; height: auto; display: inline-block; border-radius: 8px;">
  </td>
</tr>`;
};

// Generate HTML for Divider block
const generateDivider = (data: DividerData): string => `
<tr>
  <td style="padding: 16px 24px;">
    <table role="presentation" width="${data.width}%" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td style="height: 1px; background-color: ${data.color};"></td>
      </tr>
    </table>
  </td>
</tr>`;

// Generate HTML for Spacer block
const generateSpacer = (data: SpacerData): string => `
<tr>
  <td style="height: ${data.height}px; line-height: ${data.height}px; font-size: 1px;">&nbsp;</td>
</tr>`;

// Generate HTML for Footer block
const generateFooter = (data: FooterData): string => {
  const socialsHtml = data.showSocials ? `
    <tr>
      <td style="padding-bottom: 16px;">
        <a href="#" style="margin: 0 8px; text-decoration: none;">🔗</a>
        <a href="#" style="margin: 0 8px; text-decoration: none;">📸</a>
        <a href="#" style="margin: 0 8px; text-decoration: none;">💼</a>
      </td>
    </tr>` : '';

  return `
<tr>
  <td style="padding: 32px 24px; text-align: center; background-color: #ffffff; border-radius: 0 0 16px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${data.logoUrl ? `
      <tr>
        <td style="padding-bottom: 16px;">
          <img src="${data.logoUrl}" alt="${data.companyName}" style="width: 120px; height: auto;">
        </td>
      </tr>` : ''}
      ${socialsHtml}
      <tr>
        <td>
          <p style="font-family: 'Inter', Arial, sans-serif; font-size: 13px; color: #64748b; margin: 0 0 4px 0;">${data.companyName}</p>
          <p style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: #94a3b8; margin: 0;">${data.address}</p>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
};

// Generate HTML for a single block
const generateBlockHTML = (block: EmailBlock): string => {
  const { data } = block;

  if (isHeroImageData(data)) return generateHeroImage(data);
  if (isTextSectionData(data)) return generateTextSection(data);
  if (isGradientBoxData(data)) return generateGradientBox(data);
  if (isCTAButtonData(data)) return generateCTAButton(data);
  if (isImageData(data)) return generateImage(data);
  if (isDividerData(data)) return generateDivider(data);
  if (isSpacerData(data)) return generateSpacer(data);
  if (isFooterData(data)) return generateFooter(data);

  return '';
};

// Main function to generate complete email HTML
export function generateEmailHTML(state: EmailState): string {
  const blocksHTML = state.blocks.map(generateBlockHTML).join('\n');

  const greetingHTML = state.greeting ? `
<tr>
  <td style="padding: 24px 24px 0 24px;">
    <p style="font-family: 'Inter', Arial, sans-serif; font-size: 16px; color: #334155; margin: 0;">
      ${wrapEmoji(state.greeting)}
    </p>
  </td>
</tr>` : '';

  return `<!DOCTYPE html>
<html lang="cs" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Email</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset styles */
    body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; }
    
    /* Font imports */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:wght@500;600&display=swap');
    
    /* Dark mode support */
    :root { color-scheme: light dark; }
    
    @media (prefers-color-scheme: dark) {
      .email-body { background-color: #1a1a2e !important; }
      .email-container { background-color: #16213e !important; }
    }
    
    /* Mobile styles */
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .mobile-padding { padding-left: 16px !important; padding-right: 16px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4ff;">
  ${state.preheader ? `
  <!-- Preheader -->
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    ${state.preheader}
    ${'&nbsp;'.repeat(100)}
  </div>` : ''}
  
  <!-- Email wrapper -->
  <table role="presentation" class="email-body" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4ff;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Email container -->
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" style="background-color: #f3f4ff; border-radius: 16px; max-width: 600px;">
          ${greetingHTML}
          ${blocksHTML}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Export just the blocks HTML (for components)
export function generateBlocksOnlyHTML(state: EmailState): string {
  return state.blocks.map(generateBlockHTML).join('\n');
}

