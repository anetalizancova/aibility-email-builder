// Generate clean HTML email from state
import {
  EmailState,
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
  GreetingData,
  HeroImageData,
  TextSectionData,
  GradientBoxData,
  EventBoxData,
  UseCaseBubbleData,
  VideoSectionData,
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

// Generate HTML for Greeting block
const generateGreeting = (data: GreetingData): string => `
<tr>
  <td class="content-padding" style="padding: 40px 40px 32px 40px;">
    <p style="margin: 0 0 16px 0; font-family: 'Inter', Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #020617; orphans: 2; widows: 2;">
      ${wrapEmoji(data.text)}
    </p>
  </td>
</tr>`;

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
    <h2 style="margin: 0 0 20px 0; font-family: 'Lora', Georgia, serif; font-size: 24px; line-height: 1.3; color: #020617 !important; font-weight: 700; orphans: 2; widows: 2;">
      ${wrapEmoji(data.title)}
    </h2>` : '';

  const paragraphs = data.content.split('\n').filter(p => p.trim());
  const contentHtml = paragraphs.length > 0 
    ? paragraphs.map((p, i) => `
    <p style="margin: ${i === paragraphs.length - 1 ? '0' : '0 0 16px 0'}; font-family: 'Inter', Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #020617 !important; orphans: 2; widows: 2;">
      ${wrapEmoji(p)}
    </p>`).join('')
    : `<p style="margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #020617 !important; orphans: 2; widows: 2;">
      ${wrapEmoji(data.content)}
    </p>`;

  return `
<tr>
  <td class="content-padding" style="padding: 0 40px 32px 40px;">
    ${titleHtml}
    ${contentHtml}
  </td>
</tr>`;
};

// Generate HTML for Gradient Box block
const generateGradientBox = (data: GradientBoxData): string => {
  const gradients = {
    'pink-blue': 'background: linear-gradient(135deg, rgba(255,122,217,0.1) 0%, rgba(106,155,255,0.1) 100%);',
    'sunset': 'background: linear-gradient(135deg, rgba(255,184,107,0.1) 0%, rgba(255,122,217,0.1) 100%);',
  };

  const bulletPointsHtml = data.bulletPoints && data.bulletPoints.length > 0 
    ? `<ul style="margin: 12px 0 0 0; padding-left: 20px;">
        ${data.bulletPoints.map(point => `<li style="font-family: 'Inter', Arial, sans-serif; font-size: 15px; color: #334155; line-height: 1.6;">${wrapEmoji(point)}</li>`).join('')}
      </ul>`
    : '';

  return `
<tr>
  <td class="content-padding" style="padding: 0 40px 32px 40px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" data-ogsb="#ffffff" style="${gradients[data.gradientType]} background-color: #ffffff !important; border-radius: 12px; padding: 32px; mso-background-alt: #ffffff;">
      <tr>
        <td data-ogsc="#020617" data-ogsb="#ffffff" style="background-color: transparent !important; mso-background-alt: #ffffff;">
          ${data.title ? `<h2 style="margin: 0 0 16px 0; font-family: 'Lora', Georgia, serif; font-size: 24px; line-height: 1.3; color: #020617 !important; font-weight: 700; orphans: 2; widows: 2;">${wrapEmoji(data.title)}</h2>` : ''}
          <p style="margin: 0 0 24px 0; font-family: 'Inter', Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #020617 !important; orphans: 2; widows: 2;">
            ${wrapEmoji(data.content)}
          </p>
          ${bulletPointsHtml}
        </td>
      </tr>
    </table>
  </td>
</tr>`;
};

// Generate HTML for Event Box block
const generateEventBox = (data: EventBoxData): string => {
  const gradients = {
    'pink-blue': 'linear-gradient(135deg, rgba(255,122,217,0.6) 0%, rgba(106,155,255,0.6) 100%)',
    'blue-pink': 'linear-gradient(135deg, rgba(106,155,255,0.6) 0%, rgba(255,122,217,0.6) 100%)',
    'sunset': 'linear-gradient(135deg, rgba(106,155,255,0.6) 0%, rgba(255,122,217,0.6) 100%)',
  };

  const lightGradients = {
    'pink-blue': 'linear-gradient(135deg, rgba(255,122,217,0.08) 0%, rgba(106,155,255,0.08) 100%)',
    'blue-pink': 'linear-gradient(135deg, rgba(106,155,255,0.08) 0%, rgba(255,122,217,0.08) 100%)',
    'sunset': 'linear-gradient(135deg, rgba(255,184,107,0.08) 0%, rgba(255,122,217,0.08) 100%)',
  };

  const isLeft = data.gradientPosition === 'left';
  const gradientStyle = gradients[data.gradientType];
  const lightGradientStyle = lightGradients[data.gradientType];

  // Split description into paragraphs
  const paragraphs = data.description.split('\n').filter(p => p.trim());

  // VML for Outlook button
  const vmlButton = `
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${data.buttonUrl}" style="height:48px;v-text-anchor:middle;width:200px;" arcsize="25%" stroke="f" fillcolor="#000000">
  <w:anchorlock/>
  <center style="color:#ffffff;font-family:Inter, Arial,sans-serif;font-size:16px;font-weight:600;">
    ${data.buttonText}
  </center>
</v:roundrect>
<![endif]-->`;

  const contentCell = `
    <td class="split-column" width="58%" style="padding: 0; vertical-align: middle; background: ${lightGradientStyle}; background-color: #ffffff !important;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding: 32px 28px; background-color: transparent !important;">
            <!-- Event meta info -->
            <p style="margin: 0 0 12px 0; font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 400; letter-spacing: 1px; color: #6b7280; text-transform: uppercase; white-space: nowrap; orphans: 2; widows: 2;">
              ${data.metaInfo}
            </p>
            <!-- Event title -->
            <h2 style="margin: 0 0 20px 0; font-family: 'Lora', Georgia, serif; font-size: 26px; line-height: 1.3; color: #020617 !important; font-weight: 700; orphans: 2; widows: 2;">
              ${wrapEmoji(data.title)}
            </h2>
            <!-- Event description -->
            ${paragraphs.map((p, i) => `
            <p style="margin: 0 0 ${i === paragraphs.length - 1 ? '24px' : '16px'} 0; font-family: 'Inter', Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #020617 !important; orphans: 2; widows: 2;">
              ${wrapEmoji(p)}
            </p>`).join('')}
            <!-- Button -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td align="left" style="padding: 0;">
                  ${vmlButton}
                  <!--[if !mso]><!-->
                  <a href="${data.buttonUrl}" target="_blank" style="background-color: #000000; border-radius: 12px; color: #ffffff; display: inline-block; font-family: 'Inter', Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 48px; text-align: center; text-decoration: none; padding: 0 32px; box-shadow: 0 8px 24px rgba(0,0,0,0.2);">
                    ${wrapEmoji(data.buttonText)}
                  </a>
                  <!--<![endif]-->
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>`;

  const gradientCell = `
    <td class="split-column" width="42%" style="padding: 0; vertical-align: middle; background: ${gradientStyle}; border-radius: ${isLeft ? '15px 0 0 15px' : '0 15px 15px 0'}; min-height: 300px;">
      &nbsp;
    </td>`;

  return `
<tr>
  <td class="content-padding" style="padding: 0 40px 32px 40px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" data-ogsb="#ffffff" style="background-color: #ffffff !important; border-radius: 15px; overflow: hidden; mso-background-alt: #ffffff;">
      <tr>
        ${isLeft ? gradientCell + contentCell : contentCell + gradientCell}
      </tr>
    </table>
  </td>
</tr>`;
};

// Generate HTML for Use Case Bubble block
const generateUseCaseBubble = (data: UseCaseBubbleData): string => {
  const isLeft = data.alignment === 'left';
  const alignAttr = isLeft ? '' : 'align="right"';
  const tdAlign = isLeft ? '' : 'align="right"';
  const tableAlign = isLeft ? '' : 'align="right"';

  return `
<tr>
  <td ${tdAlign} style="padding:0 32px 12px 32px;">
    <table 
      border="0" 
      cellpadding="0" 
      cellspacing="0" 
      width="75%" 
      ${tableAlign}
      style="
        border-radius:16px; 
        background-image: 
          linear-gradient(rgba(249,250,251,0.7), rgba(249,250,251,0.7)),
          url('${data.gradientUrl}');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #f9fafb;
      "
    >
      <tr>
        <td style="padding:16px 18px; font-family:'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#020617; font-size:15px; line-height:1.7;">
          <p style="margin:0; orphans: 2; widows: 2;">
            <strong style="color:#020617;">${wrapEmoji(data.title)}</strong><br />
            ${wrapEmoji(data.result)}
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
};

// Generate HTML for Video Section block
const generateVideoSection = (data: VideoSectionData): string => `
<tr>
  <td class="content-padding" style="padding:0 32px 20px 32px; font-family:'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#020617;">
    <!-- Video title -->
    <h2 style="margin:0 0 20px 0; font-size:22px; line-height:1.4; color:#020617 !important; font-family:'Lora','Times New Roman',serif; text-align:center; orphans: 2; widows: 2;">
      <a href="${data.videoUrl}" target="_blank" style="color:#020617 !important; text-decoration:none;">${wrapEmoji(data.title)}</a>
    </h2>
    
    <!-- YouTube video thumbnail -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:16px 0 0 0; border-radius:12px; overflow:hidden;">
      <tr>
        <td style="padding:0;">
          <a href="${data.videoUrl}" target="_blank" style="display:block; text-decoration:none;">
            <img 
              src="${data.thumbnailUrl}" 
              alt="${data.altText}" 
              width="536" 
              style="width:100%; max-width:536px; height:auto; display:block; border-radius:12px;" 
            />
          </a>
        </td>
      </tr>
    </table>
  </td>
</tr>`;

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
  <td class="content-padding" style="padding: 0 40px 32px 40px; text-align: center;">
    ${vmlButton}
    <!--[if !mso]><!-->
    <a href="${data.url}" target="_blank" style="display: inline-block; padding: 14px 32px; border-radius: 12px; font-family: 'Inter', Arial, sans-serif; font-size: 16px; font-weight: 600; text-decoration: none; ${buttonStyle} box-shadow: 0 8px 24px rgba(0,0,0,0.2);">
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
        <p style="margin: 0 0 8px 0; orphans: 2; widows: 2; color: #020617 !important;">
          Sledujte nás na <a href="https://linkedin.com/company/aibility-org" target="_blank" style="color: #FF5AFF !important; text-decoration: underline;">LinkedInu</a>!
        </p>
      </td>
    </tr>` : '';

  return `
<tr>
  <td data-ogsb="#f9fafb" style="padding: 32px 40px; text-align: center; background-color: #f9fafb !important; border-top: 1px solid #e5e7eb; mso-background-alt: #f9fafb;">
    ${data.logoUrl ? `
    <img src="${data.logoUrl}" alt="${data.companyName}" width="180" style="max-width: 180px; height: auto; display: block; margin: 0 auto 16px auto; border: 0; background-color: #f9fafb !important; padding: 16px !important;">` : ''}
  </td>
</tr>
<tr>
  <td data-ogsb="#f9fafb" data-ogsc="#020617" style="padding: 24px 40px; text-align: center; background-color: #f9fafb !important; font-family: 'Inter', Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #020617 !important; mso-background-alt: #f9fafb; mso-color-alt: #020617;">
    ${socialsHtml}
    <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280 !important; orphans: 2; widows: 2;">
      This email was sent to {{ contact.EMAIL }}
    </p>
    <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280 !important; orphans: 2; widows: 2;">
      You've received it because you've subscribed to our newsletter.
    </p>
    <p style="margin: 0; font-size: 12px; orphans: 2; widows: 2;">
      <a href="{{ mirror }}" style="color: #6b7280 !important; text-decoration: underline;">View in browser</a> | <a href="{{ unsubscribe_url }}" style="color: #6b7280 !important; text-decoration: underline;">Unsubscribe</a>
    </p>
  </td>
</tr>`;
};

// Generate HTML for a single block
const generateBlockHTML = (block: EmailBlock): string => {
  const { data } = block;

  if (isGreetingData(data)) return generateGreeting(data);
  if (isHeroImageData(data)) return generateHeroImage(data);
  if (isTextSectionData(data)) return generateTextSection(data);
  if (isGradientBoxData(data)) return generateGradientBox(data);
  if (isEventBoxData(data)) return generateEventBox(data);
  if (isUseCaseBubbleData(data)) return generateUseCaseBubble(data);
  if (isVideoSectionData(data)) return generateVideoSection(data);
  if (isCTAButtonData(data)) return generateCTAButton(data);
  if (isImageData(data)) return generateImage(data);
  if (isDividerData(data)) return generateDivider(data);
  if (isSpacerData(data)) return generateSpacer(data);
  if (isFooterData(data)) return generateFooter(data);

  return '';
};

/**
 * Generate complete email HTML from state
 * @param state - Email state
 * @param baseUrl - Optional base URL for converting relative image URLs to absolute (for Brevo)
 * @returns Complete HTML email
 */
export function generateEmailHTML(state: EmailState, baseUrl?: string): string {
  let blocksHTML = state.blocks.map(generateBlockHTML).join('\n');
  
  // Convert relative image URLs to absolute if baseUrl is provided
  if (baseUrl) {
    blocksHTML = blocksHTML.replace(
      /src="(\/uploads\/[^"]+)"/g,
      (match, path) => `src="${baseUrl}${path}"`
    );
  }

  const isDark = state.theme.startsWith('dark');
  const theme = isDark ? 'dark' : 'light';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="format-detection" content="telephone=no">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Force Light Mode - no color reversion -->
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <meta name="x-apple-disable-message-reformatting">
  <title>Email</title>
  <style type="text/css">
    /* Reset */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      outline: none;
      text-decoration: none;
    }
    /* Force Light Mode - no color reversion - GLOBAL */
    :root {
      color-scheme: light only !important;
    }
    html {
      color-scheme: light only !important;
    }
    body {
      color-scheme: light only !important;
      background-color: #f3f4ff !important;
      color: #020617 !important;
    }
    * {
      color-scheme: light only !important;
    }
    /* Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
    
    /* Dark Mode Media Query */
    @media (prefers-color-scheme: dark) {
      * {
        color-scheme: light only !important;
      }
      body, html {
        color-scheme: light only !important;
        background-color: #f3f4ff !important;
        color: #020617 !important;
      }
      .force-light { 
        background-color: #ffffff !important; 
        color: #020617 !important;
      }
    }
    /* Outlook Dark Mode Support */
    [data-ogsc] * {
      color-scheme: light only !important;
    }
    [data-ogsc] .force-light { 
      background-color: #ffffff !important; 
      color: #020617 !important;
    }
    /* Gmail Dark Mode Support */
    [data-darkreader-mode] * {
      color-scheme: light only !important;
    }
    /* Apple Mail Dark Mode Support */
    [data-ogsb] * {
      color-scheme: light only !important;
    }
    
    /* Mobile */
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .content-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .event-box { padding: 24px 20px !important; }
      .split-column { width: 100% !important; display: block !important; }
      .reverse-mobile { display: table !important; width: 100% !important; }
      .reverse-mobile .column.first { display: table-footer-group !important; }
      .reverse-mobile .column.last { display: table-header-group !important; }
    }
  </style>
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4ff; font-family: 'Inter', Arial, sans-serif;">
  ${state.preheader ? `
  <!-- Preheader -->
  <div style="display: none; font-size: 1px; color: #ffffff; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${state.preheader}
  </div>` : ''}
  
  <!-- Main Container -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(255,122,217,0.05) 0%, rgba(106,155,255,0.05) 100%); background-color: #f3f4ff; padding: 20px 0;">
    <tr>
      <td align="center">
        <!-- Email Content -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="680" class="email-container" data-ogsb="#ffffff" style="max-width: 680px; background-color: #ffffff !important; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); mso-background-alt: #ffffff;">
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

