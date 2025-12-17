'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { themes, themeList, ThemeId, Theme } from '@/themes';
import { EmailWrapper, GradientBox, CTAButton, TextSection } from '@/components/email';
import { emailWrapperStartHTML, emailWrapperEndHTML } from '@/components/email/EmailWrapper';
import { gradientBoxToHTML } from '@/components/email/GradientBox';
import { ctaButtonToHTML } from '@/components/email/CTAButton';

export default function EditorPage() {
  const searchParams = useSearchParams();
  const initialTheme = (searchParams.get('theme') as ThemeId) || 'light-pink-blue';
  
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(initialTheme);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const theme = themes[selectedTheme];

  // Demo email content
  const generateHTML = () => {
    const boxHTML = gradientBoxToHTML({
      title: 'Váš nadpis zde',
      emoji: '🚀',
      children: null,
      theme,
    });
    
    const buttonHTML = ctaButtonToHTML({
      text: 'Call to Action',
      href: 'https://aibility.cz',
      emoji: '👉',
      theme,
    });

    return `${emailWrapperStartHTML(theme)}

          <!-- Text Section -->
          <tr>
            <td class="content-padding mobile-padding" style="padding:32px 32px 0 32px; color:${theme.colors.textPrimary}; font-family:'Inter', system-ui, sans-serif;">
              <p style="margin:0 0 16px 0; font-size:15px; line-height:1.8;">
                Dobrý den, {{ contact.OSLOVENI }},
              </p>
              <p style="margin:0 0 16px 0; font-size:15px; line-height:1.8;">
                Váš text zde...
              </p>
            </td>
          </tr>

          <!-- Gradient Box -->
${boxHTML}

          <!-- CTA Button -->
${buttonHTML}

          <!-- Footer -->
          <tr>
            <td class="mobile-padding" style="padding:24px 32px 32px 32px; border-top:1px solid ${theme.colors.border};">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <p style="margin:0; font-size:15px; color:${theme.colors.textPrimary}; text-align:center;">
                      <strong>Tým Aibility</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

${emailWrapperEndHTML()}`;
  };

  const copyToClipboard = async () => {
    const html = generateHTML();
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-${selectedTheme}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-500 hover:text-gray-900">
              ← Zpět
            </Link>
            <div className="h-6 w-px bg-gray-200" />
            <h1 className="font-semibold text-gray-900">Email Editor</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCode(!showCode)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {showCode ? 'Preview' : 'Kód'}
            </button>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {copied ? '✓ Zkopírováno' : 'Kopírovat HTML'}
            </button>
            <button
              onClick={downloadHTML}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
            >
              Stáhnout HTML
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 border-r border-gray-200 bg-white h-[calc(100vh-65px)] overflow-y-auto">
          {/* Theme Selector */}
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Barevná varianta</h2>
            <div className="space-y-2">
              {themeList.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTheme(t.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                    selectedTheme === t.id
                      ? 'bg-gray-100 ring-2 ring-black'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Color preview */}
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0"
                    style={{
                      backgroundImage: `url('${t.gradientImageUrl}')`,
                      backgroundColor: t.colors.background,
                      backgroundSize: 'cover',
                    }}
                  >
                    <div
                      className="w-full h-full rounded-lg"
                      style={{ backgroundColor: t.colors.containerBg, opacity: 0.9 }}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.id.includes('dark') ? 'Tmavý' : 'Světlý'}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Components */}
          <div className="p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Komponenty</h2>
            <div className="space-y-2">
              {[
                { name: 'Hero Image', emoji: '🖼️' },
                { name: 'Text Section', emoji: '📝' },
                { name: 'Gradient Box', emoji: '📦' },
                { name: 'CTA Button', emoji: '🔘' },
                { name: 'Spacer', emoji: '↕️' },
                { name: 'Footer', emoji: '📄' },
              ].map((comp) => (
                <div
                  key={comp.name}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <span className="text-xl">{comp.emoji}</span>
                  <span className="text-sm font-medium">{comp.name}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Tip: Stáhni HTML a uprav v Cursoru pro plnou kontrolu
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-65px)]">
          {showCode ? (
            /* Code View */
            <div className="max-w-4xl mx-auto">
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm">
                <code>{generateHTML()}</code>
              </pre>
            </div>
          ) : (
            /* Preview */
            <EmailWrapper theme={theme}>
              {/* Demo Content */}
              <div className="p-0">
                {/* Hero placeholder */}
                <div 
                  className="h-48 flex items-center justify-center text-gray-400"
                  style={{ backgroundColor: theme.colors.boxBg }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">🖼️</div>
                    <div className="text-sm">Hero Image</div>
                  </div>
                </div>

                {/* Text Section */}
                <TextSection theme={theme}>
                  <p className="mb-4">Dobrý den, {'{{ contact.OSLOVENI }}'},</p>
                  <p>Váš text zde. Upravte podle potřeby.</p>
                </TextSection>

                {/* Gradient Box */}
                <div className="px-8 py-5">
                  <GradientBox title="Váš nadpis zde" emoji="🚀" theme={theme}>
                    <p>Obsah boxu. Zde můžete napsat hlavní sdělení emailu.</p>
                  </GradientBox>
                </div>

                {/* CTA Button */}
                <CTAButton
                  text="Call to Action"
                  href="https://aibility.cz"
                  emoji="👉"
                  theme={theme}
                />

                {/* Footer */}
                <div
                  className="px-8 py-6 text-center"
                  style={{
                    borderTop: `1px solid ${theme.colors.border}`,
                    color: theme.colors.textPrimary,
                  }}
                >
                  <strong>Tým Aibility</strong>
                </div>
              </div>
            </EmailWrapper>
          )}
        </main>
      </div>
    </div>
  );
}

