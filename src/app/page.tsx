import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f3f4ff]">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">
            📧 Aibility Email Builder
          </div>
          <div className="flex items-center gap-6">
            <Link href="/editor" className="text-gray-600 hover:text-gray-900 transition-colors">
              Editor
            </Link>
            <Link href="/cursor-kit" className="text-gray-600 hover:text-gray-900 transition-colors">
              Cursor Kit
            </Link>
            <Link href="/tips" className="text-gray-600 hover:text-gray-900 transition-colors">
              Tipy
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Lora', serif" }}>
            Email templates pro tým{' '}
            <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              Aibility
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Poskládej si email v prohlížeči, stáhni HTML pro Brevo, nebo si stáhni 
            kompletní kit pro práci v Cursoru.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/editor"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-lg font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
            >
              🖱️ Otevřít Editor
            </Link>
            <Link
              href="/cursor-kit"
              className="px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-xl hover:bg-gray-800 transition-colors"
            >
              ⬇️ Stáhnout Cursor Kit
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Web Editor Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-blue-100 rounded-xl flex items-center justify-center text-3xl mb-6">
              🖱️
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Lora', serif" }}>
              Web Editor
            </h2>
            <p className="text-gray-600 mb-6">
              Drag & drop editor přímo v prohlížeči. Přidávej bloky, upravuj texty, 
              měň barvy a stáhni si hotový HTML kód.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">✓</span>
                8 typů bloků (hero, text, gradient box, tlačítko...)
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">✓</span>
                Live preview při úpravách
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">✓</span>
                Export HTML (copy nebo download)
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">✓</span>
                URL nebo upload obrázků
              </li>
            </ul>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700"
            >
              Otevřít editor →
            </Link>
          </div>

          {/* Cursor Kit Card */}
          <div className="bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-800 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center text-3xl mb-6">
              ⚡
            </div>
            <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Lora', serif" }}>
              Cursor Kit
            </h2>
            <p className="text-gray-400 mb-6">
              Stáhni si kompletní projekt pro Cursor. Šablony, komponenty, pravidla pro AI - 
              vše připravené pro práci s AI asistentem.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-gray-300">
                <span className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-sm">✓</span>
                3 email šablony (welcome, follow-up, promo)
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-sm">✓</span>
                6 HTML komponent
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-sm">✓</span>
                .cursorrules pro AI asistenta
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-sm">✓</span>
                Dokumentace a barevná paleta
              </li>
            </ul>
            <Link
              href="/cursor-kit"
              className="inline-flex items-center gap-2 text-purple-400 font-semibold hover:text-purple-300"
            >
              Stáhnout kit →
            </Link>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Lora', serif" }}>
              💡 Rychlé tipy
            </h2>
            <Link href="/tips" className="text-pink-600 font-medium hover:text-pink-700">
              Všechny tipy →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">🔤 Emoji</h3>
              <p className="text-sm text-gray-600">
                Vždy zabaluj do <code className="bg-gray-200 px-1 rounded">span</code> s inline-block, 
                jinak se zalomí.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">👆 Tlačítka</h3>
              <p className="text-sm text-gray-600">
                Pro Outlook přidej VML fallback, jinak tlačítko nebude klikací.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">🖼️ Obrázky</h3>
              <p className="text-sm text-gray-600">
                Hostuj na Brevo nebo CDN. Lokální cesty v emailech nefungují.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-gray-500">
          <p>Vytvořeno s ❤️ týmem Aibility</p>
          <div className="flex items-center gap-4">
            <Link href="/tips" className="hover:text-gray-700">Tipy</Link>
            <Link href="/editor" className="hover:text-gray-700">Editor</Link>
            <Link href="/cursor-kit" className="hover:text-gray-700">Cursor Kit</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
