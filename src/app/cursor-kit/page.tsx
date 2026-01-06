'use client';

import { useState } from 'react';
import Link from 'next/link';
import { downloadCursorKit } from '@/lib/generate-kit';

export default function CursorKitPage() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadCursorKit();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            📧 Email Builder
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/editor" className="text-gray-300 hover:text-white transition-colors">
              Editor
            </Link>
            <Link href="/tips" className="text-gray-300 hover:text-white transition-colors">
              Tipy
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6">
            Pro práci v Cursoru
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Cursor Email Kit
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Kompletní sada šablon, komponent a pravidel pro tvorbu profesionálních 
            HTML emailů s AI asistencí v Cursoru.
          </p>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {downloading ? (
              <>
                <span className="animate-spin">⏳</span>
                Generuji...
              </>
            ) : (
              <>
                ⬇️ Stáhnout ZIP
              </>
            )}
          </button>
        </div>

        {/* What's included */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-3xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-white mb-2">Šablony</h3>
            <p className="text-gray-400 mb-4">
              3 připravené šablony emailů - welcome, follow-up a promo. Stačí upravit texty.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• welcome.html</li>
              <li>• follow-up.html</li>
              <li>• promo.html</li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-3xl mb-4">🧩</div>
            <h3 className="text-xl font-semibold text-white mb-2">Komponenty</h3>
            <p className="text-gray-400 mb-4">
              6 HTML komponent pro skládání vlastních emailů. Validované pro všechny klienty.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• hero-image.html</li>
              <li>• text-section.html</li>
              <li>• gradient-box.html</li>
              <li>• cta-button.html</li>
              <li>• divider.html</li>
              <li>• footer.html</li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-white mb-2">.cursorrules</h3>
            <p className="text-gray-400 mb-4">
              Pravidla pro AI asistenta. Cursor automaticky ví, jak tvořit emaily správně.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Emoji formátování</li>
              <li>• Outlook kompatibilita</li>
              <li>• Dark mode podpora</li>
              <li>• Mobile-first</li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-3xl mb-4">💡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Dokumentace</h3>
            <p className="text-gray-400 mb-4">
              Tipy, best practices a barevná paleta. Vše co potřebuješ pro konzistentní emaily.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• EMAIL_TIPS.md</li>
              <li>• brand-colors.md</li>
              <li>• README.md</li>
            </ul>
          </div>
        </div>

        {/* How to use */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Jak to použít</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold text-white mb-2">Stáhni a rozbal</h4>
              <p className="text-gray-400 text-sm">
                Stáhni ZIP a rozbal do složky kde chceš pracovat
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold text-white mb-2">Otevři v Cursoru</h4>
              <p className="text-gray-400 text-sm">
                File → Open Folder a vyber rozbalený kit
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold text-white mb-2">Tvoř s AI</h4>
              <p className="text-gray-400 text-sm">
                Řekni AI co potřebuješ - automaticky použije pravidla
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">
            Nebo si email poskládej přímo v prohlížeči
          </p>
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
          >
            🖱️ Otevřít Web Editor
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-500">
          <p>Vytvořeno s ❤️ týmem Aibility</p>
        </div>
      </footer>
    </div>
  );
}




