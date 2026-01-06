# 📧 Email Builder

Standalone email builder aplikace pro vytváření HTML emailů s drag & drop editorem, všemi designy a variantami.

## 🚀 Instalace

```bash
npm install
npm run dev
```

Otevřete [http://localhost:3000/editor](http://localhost:3000/editor) v prohlížeči.

## 📦 Funkce

### Editor
- **Drag & Drop** - Přetahování bloků z palety a přesouvání v emailu
- **Editace** - Všechny bloky jsou editovatelné v pravém panelu
- **Šablony** - Předpřipravené šablony (Newsletter, B2B)
- **Export** - Stahování HTML nebo kopírování do clipboardu

### Komponenty
- Greeting - Oslovení s personalizací
- Hero Image - Hero obrázek
- Text Section - Textová sekce
- Gradient Box - Box s gradientem
- Event Box - Box pro akce s split layoutem
- Use Case Bubble - Bublina pro use case
- Video Section - Sekce s YouTube videem
- CTA Button - Call-to-action tlačítko
- Image - Samostatný obrázek
- Divider - Oddělovač
- Spacer - Vertikální mezera
- Footer - Footer s logem

### Upload obrázků
Obrázky se nahrávají do `/public/uploads/` a získávají relativní URL. Pro Brevo je potřeba převést na absolutní URL.

### Export HTML
- Automatické zabalení emoji
- Dark mode support (force light mode)
- Outlook kompatibilita
- Responzivní design

## 🎨 Designy

### Newsletter
Newsletter design s event boxy a split layoutem.

### B2B Email
B2B email s use case bublinami a video sekcí.

## 🔧 MCP Server

Email Builder obsahuje MCP server pro integraci s Cursorem.

### Instalace MCP serveru

1. Přidejte do Cursor Settings > Features > Model Context Protocol:

```json
{
  "mcpServers": {
    "email-builder": {
      "command": "node",
      "args": ["email-builder/src/mcp-server/index.ts"],
      "cwd": "/path/to/email-builder"
    }
  }
}
```

2. Restartujte Cursor

### Dostupné MCP funkce

- `create_email` - Vytvoří nový email nebo načte šablonu
- `add_block` - Přidá blok do emailu
- `update_block` - Aktualizuje blok
- `remove_block` - Odstraní blok
- `generate_html` - Vygeneruje HTML
- `get_email_state` - Vrátí aktuální stav
- `list_templates` - Vypíše šablony

## 📝 Cursor Rules

Soubor `.cursorrules` obsahuje všechny tipy a best practices pro práci s HTML emaily. Cursor automaticky použije tyto pravidla při práci s emaily.

## 🔮 Brevo integrace

Struktura pro Brevo API je připravena v `src/lib/brevo.ts`. Když bude k dispozici API klíč, implementujte:

1. Upload obrázků do Brevo CDN
2. Odesílání emailů přes Brevo API
3. Vytváření šablon v Brevo

## 📁 Struktura projektu

```
email-builder/
├── src/
│   ├── app/
│   │   └── editor/          # Editor stránka
│   ├── components/
│   │   └── editor/          # Editor komponenty
│   ├── lib/
│   │   ├── email-state.ts   # State management
│   │   ├── generate-html.ts # HTML generování
│   │   ├── upload.ts        # Upload obrázků
│   │   ├── brevo.ts         # Brevo integrace
│   │   └── designs/         # Šablony
│   ├── mcp-server/          # MCP server
│   └── themes/              # Barevné varianty
├── public/
│   └── uploads/             # Nahrané obrázky
└── .cursorrules             # Cursor rules
```

## 💡 Tipy

- Všechny emoji jsou automaticky zabalené do span tagů
- Dark mode je vynucený na light mode
- Outlook kompatibilita je zajištěna pomocí VML
- Mobilní zobrazení je responzivní

## 📚 Dokumentace

Více informací najdete v `.cursorrules` souboru.
