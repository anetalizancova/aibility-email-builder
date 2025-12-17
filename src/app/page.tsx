'use client';

import Link from 'next/link';
import { themeList, Theme } from '@/themes';

function ThemePreviewCard({ theme }: { theme: Theme }) {
  const isDark = theme.id.includes('dark');
  
  return (
    <Link href={`/editor?theme=${theme.id}`} className="block">
      <div className="theme-card rounded-2xl overflow-hidden cursor-pointer border border-gray-200">
        {/* Preview */}
        <div
          className="h-48 p-4 relative"
          style={{
            backgroundImage: `url('${theme.gradientImageUrl}')`,
            backgroundColor: theme.colors.background,
            backgroundSize: 'cover',
          }}
        >
          {/* Mini email preview */}
          <div
            className="w-full h-full rounded-xl p-4 flex flex-col gap-2"
            style={{ backgroundColor: theme.colors.containerBg }}
          >
            {/* Mini gradient box */}
            <div
              className="rounded-lg p-3 flex-1"
              style={{
                backgroundImage: `linear-gradient(${theme.colors.boxBgOverlay}, ${theme.colors.boxBgOverlay})`,
                backgroundColor: theme.colors.boxBg,
              }}
            >
              <div
                className="h-3 w-24 rounded mb-2"
                style={{ backgroundColor: theme.colors.textPrimary, opacity: 0.8 }}
              />
              <div
                className="h-2 w-full rounded mb-1"
                style={{ backgroundColor: theme.colors.textPrimary, opacity: 0.3 }}
              />
              <div
                className="h-2 w-3/4 rounded"
                style={{ backgroundColor: theme.colors.textPrimary, opacity: 0.3 }}
              />
            </div>
            {/* Mini button */}
            <div className="flex justify-center">
              <div
                className="h-6 w-20 rounded-md"
                style={{ background: theme.colors.buttonBg }}
              />
            </div>
          </div>
        </div>
        
        {/* Info */}
        <div className="p-4 bg-white">
          <h3 className="font-semibold text-lg text-gray-900">{theme.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{theme.description}</p>
          
          {/* Color dots */}
          <div className="flex gap-2 mt-3">
            <div
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ backgroundColor: theme.colors.gradientStart }}
              title="Gradient Start"
            />
            {theme.colors.gradientMid && (
              <div
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: theme.colors.gradientMid }}
                title="Gradient Mid"
              />
            )}
            <div
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ backgroundColor: theme.colors.gradientEnd }}
              title="Gradient End"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4ff] via-white to-[#fff5f5]">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff7ad9] to-[#6a9bff] flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Aibility Email Builder</h1>
              <p className="text-xs text-gray-500">Vytvořte email za pár kliků</p>
            </div>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="text-sm font-medium text-gray-900">Templates</Link>
            <Link href="/tips" className="text-sm font-medium text-gray-500 hover:text-gray-900">Tips & Rules</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Email templates pro tým Aibility
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Vyberte barevnou variantu, upravte text, stáhněte HTML. 
          Nebo otevřete v Cursoru a upravte dál.
        </p>
      </section>

      {/* Theme Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Barevné varianty</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themeList.map((theme) => (
            <ThemePreviewCard key={theme.id} theme={theme} />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Rychlé akce</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/tips" className="block p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-900 mb-1">Tips & Best Practices</h3>
            <p className="text-sm text-gray-500">Emoji, dark mode, nezalomitelné mezery a další</p>
          </Link>
          
          <Link href="/editor?theme=light-pink-blue" className="block p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-semibold text-gray-900 mb-1">Nový email</h3>
            <p className="text-sm text-gray-500">Začněte skládat email od nuly</p>
          </Link>
          
          <a 
            href="https://github.com/aibility/email-builder" 
            target="_blank"
            className="block p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="text-3xl mb-3">💻</div>
            <h3 className="font-semibold text-gray-900 mb-1">Otevřít v Cursoru</h3>
            <p className="text-sm text-gray-500">Stáhněte repo a upravujte lokálně</p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white/50">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
          <p>Aibility Email Builder • Interní nástroj pro tým</p>
        </div>
      </footer>
    </div>
  );
}
