'use client';

import Link from 'next/link';

const tips = [
  {
    emoji: '🎯',
    title: 'Emoji v emailech',
    problem: 'Emoji se zalomí na nový řádek, odtrhne se od textu.',
    solution: 'Zabalit emoji do <span> s inline-block stylem.',
    code: `<span style="display:inline-block; vertical-align:middle; line-height:1; font-size:1.1em;">🎄</span>`,
  },
  {
    emoji: '🌙',
    title: 'Dark Mode kompatibilita',
    problem: 'Email klienty automaticky invertují barvy v dark mode. Výsledek? Nečitelný text.',
    solution: 'Přidat meta tagy a explicitní dark mode styly.',
    code: `<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">

<style>
  @media (prefers-color-scheme: dark) {
    .force-light { background-color: #ffffff !important; }
  }
</style>`,
  },
  {
    emoji: '📱',
    title: 'Mobilní zobrazení',
    problem: 'Text je na mobilu příliš malý.',
    solution: 'Přidat viewport meta tag a media queries.',
    code: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />

@media screen and (max-width: 600px) {
  .wrapper { width: 100% !important; }
  .mobile-padding { padding: 20px !important; }
}`,
  },
  {
    emoji: '🔤',
    title: 'Nezalomitelné mezery',
    problem: 'Text se zalomí na nevhodných místech (např. "16. 12." se rozlomí).',
    solution: 'Použít &nbsp; (nezalomitelná mezera).',
    code: `<!-- ✅ Správně -->
<p>16.&nbsp;12. • Praha&nbsp;1</p>

<!-- ❌ Špatně -->
<p>16. 12. • Praha 1</p>`,
  },
  {
    emoji: '🔘',
    title: 'Tlačítka v Outlooku',
    problem: 'Outlook nepodporuje border-radius a některé CSS vlastnosti.',
    solution: 'Použít VML fallback pro Outlook.',
    code: `<!--[if mso]>
<v:roundrect href="URL" style="height:48px;width:280px;" arcsize="50%" fillcolor="#000000">
  <center style="color:#ffffff;">Text</center>
</v:roundrect>
<![endif]-->
<!--[if !mso]><!-->
<a href="URL" style="background:#000; border-radius:12px; color:#fff;">Text</a>
<!--<![endif]-->`,
  },
  {
    emoji: '📝',
    title: 'Prevence vdov a sirotků',
    problem: 'Osamocená slova na konci odstavce.',
    solution: 'CSS vlastnosti orphans a widows.',
    code: `<p style="orphans: 2; widows: 2;">Text odstavce...</p>`,
  },
];

const checklist = [
  'Otestovat v Brevo test emailu',
  'Zkontrolovat mobilní zobrazení',
  'Zkontrolovat dark mode zobrazení',
  'Ověřit, že emoji se nezalomují',
  'Zkontrolovat všechny odkazy',
  'Ověřit zobrazení obrázků',
  'Zkontrolovat vdovy/sirotky v textu',
];

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4ff] via-white to-[#fff5f5]">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff7ad9] to-[#6a9bff] flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Aibility Email Builder</h1>
                <p className="text-xs text-gray-500">Tips & Best Practices</p>
              </div>
            </Link>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900">Templates</Link>
            <Link href="/tips" className="text-sm font-medium text-gray-900">Tips & Rules</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          📚 Email Tips & Best Practices
        </h1>
        <p className="text-xl text-gray-600">
          Vše, co potřebujete vědět pro tvorbu HTML emailů, které fungují všude.
        </p>
      </section>

      {/* Tips Grid */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="space-y-8">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{tip.emoji}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{tip.title}</h2>
                  
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-red-600 mb-1">❌ Problém:</div>
                    <p className="text-gray-600">{tip.problem}</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-green-600 mb-1">✅ Řešení:</div>
                    <p className="text-gray-600">{tip.solution}</p>
                  </div>
                  
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
                    <code>{tip.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Checklist */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-br from-[#ff7ad9]/10 to-[#6a9bff]/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Checklist před odesláním</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {checklist.map((item, index) => (
              <label key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                <span className="text-gray-700">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Cursor Tips */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-gray-900 text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">💻 Práce s Cursorem</h2>
          <p className="text-gray-300 mb-6">
            Stáhněte HTML z editoru a otevřete v Cursoru pro pokročilé úpravy.
          </p>
          <div className="space-y-4 text-sm">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="font-semibold text-white mb-2">1. Stáhněte HTML</div>
              <p className="text-gray-400">Klikněte na "Stáhnout HTML" v editoru</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="font-semibold text-white mb-2">2. Otevřete v Cursoru</div>
              <p className="text-gray-400">File → Open nebo přetáhněte soubor</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="font-semibold text-white mb-2">3. Použijte AI</div>
              <p className="text-gray-400">Cmd+K pro úpravy, Cmd+L pro chat s AI</p>
            </div>
          </div>
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

