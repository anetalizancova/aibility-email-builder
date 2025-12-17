'use client';

import { Theme } from '@/themes';

interface EmailWrapperProps {
  children: React.ReactNode;
  theme: Theme;
}

export function EmailWrapper({ children, theme }: EmailWrapperProps) {
  return (
    <div
      className="min-h-screen p-8"
      style={{
        backgroundImage: theme.gradientCSS,
        backgroundColor: theme.colors.background,
      }}
    >
      <div
        className="max-w-[600px] mx-auto rounded-[22px] overflow-hidden"
        style={{
          backgroundColor: theme.colors.containerBg,
          boxShadow: '0 24px 80px rgba(0,0,0,0.12)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// HTML Export - vrací celý wrapper
export function emailWrapperStartHTML(theme: Theme): string {
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8" />
  <title>Email</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@600;700&display=swap');
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; display: block; }
    body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; }
    table { border-collapse: collapse !important; }
    p, h1, h2, h3, h4, h5, h6 { orphans: 2; widows: 2; }
    @media only screen and (max-width: 600px) {
      .wrapper { width: 100% !important; max-width: 100% !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-padding-box { padding: 20px 16px !important; }
      .content-padding { padding: 20px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:${theme.colors.background};">
  <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    width="100%"
    style="
      background-image: url('${theme.gradientImageUrl}');
      background-color:${theme.colors.background};
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    "
  >
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table
          class="wrapper"
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="600"
          style="
            width:600px;
            max-width:600px;
            background-color:${theme.colors.containerBg};
            border-radius:22px;
            overflow:hidden;
            box-shadow:0 24px 80px rgba(0,0,0,0.12);
          "
        >`;
}

export function emailWrapperEndHTML(): string {
  return `        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

