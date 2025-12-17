// Generate Cursor Starter Kit ZIP
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// README content
const readmeContent = `# Aibility Email Kit pro Cursor 📧

Kompletní sada komponent a pravidel pro tvorbu profesionálních HTML emailů s AI asistencí.

## 🚀 Quick Start

1. Otevři tuto složku v Cursoru
2. Řekni AI co potřebuješ: "Vytvoř email pro pozvánku na event"
3. AI použije komponenty a pravidla automaticky

## 📁 Struktura

\`\`\`
├── components/         # HTML komponenty
│   ├── hero-image.html
│   ├── text-section.html
│   ├── gradient-box.html
│   ├── cta-button.html
│   ├── greeting.html
│   ├── divider.html
│   └── footer.html
├── .cursorrules        # Pravidla pro AI
├── EMAIL_TIPS.md       # Best practices
└── brand-colors.md     # Barevná paleta + themes
\`\`\`

## 🎨 4 Barevné varianty

| Varianta | Popis |
|----------|-------|
| Light Pink-Blue | Světlý s růžovo-modrým gradientem |
| Light Sunset | Světlý s růžovo-modro-oranžovým |
| Dark Pink-Blue | Tmavý s růžovo-modrým gradientem |
| Dark Sunset | Tmavý s růžovo-modro-oranžovým |

## 💡 Tipy pro práci

1. Používej komponenty z \`components/\` složky
2. Vždy testuj v Litmus nebo Email on Acid
3. Emoji zabaluj do span s inline-block
4. Pro personalizaci: \`{{ contact.OSLOVENI }}\`

---

Vytvořeno s ❤️ týmem Aibility
`;

// .cursorrules content
const cursorRulesContent = `# Aibility Email Builder - Cursor Rules

## 📧 Email HTML Best Practices

Při tvorbě HTML emailů VŽDY dodržuj:

### 1. Struktura
- Používej table layout (ne div)
- Inline styly (ne externí CSS)
- Max šířka 600px
- role="presentation" na všechny tabulky

### 2. Fonty
- Primární: 'Lora', Georgia, serif (nadpisy)
- Sekundární: 'Inter', Arial, sans-serif (text)
- Fallback fonty jsou POVINNÉ

### 3. Barvy - 4 varianty

**Light Pink-Blue:**
- Background: #f3f4ff
- Container: #ffffff
- Text: #020617, #334155

**Light Sunset:**
- Background: #f3f4ff
- Container: #ffffff
- Akcent: #ffb86b (orange)

**Dark Pink-Blue:**
- Background: #0a0a0a
- Container: #1a1a2e
- Text: #f8fafc, #94a3b8

**Dark Sunset:**
- Background: #0a0a0a
- Container: #1a1a1a
- Akcent: #ffb86b (orange)

### 4. Emoji
NIKDY nepište emoji přímo. VŽDY zabalte do span:
\`\`\`html
<span style="display:inline-block; vertical-align:middle; line-height:1; font-size:1.1em;">🎉</span>
\`\`\`

### 5. Tlačítka
Pro Outlook použij VML fallback:
\`\`\`html
<!--[if mso]>
<v:roundrect href="URL" style="height:48px;width:200px;" arcsize="17%" fillcolor="#ff7ad9">
  <center style="color:#fff;font-weight:bold;">Text</center>
</v:roundrect>
<![endif]-->
\`\`\`

### 6. Obrázky
- Vždy ALT text
- Width v px, ne %
- display: block
- Hostuj na Brevo nebo CDN

### 7. Mobile
@media only screen and (max-width: 600px) pro responzivitu

### 8. Dark Mode
- Meta: color-scheme: light dark
- Testuj v Apple Mail, Outlook
- Zvol: force light NEBO adaptuj

## 📁 Komponenty

Používej komponenty z \`components/\` složky jako základ.

## 🔍 Před odesláním

1. [ ] Validuj HTML
2. [ ] Testuj ve všech klientech
3. [ ] Zkontroluj odkazy
4. [ ] Ověř personalizaci
5. [ ] Zkontroluj preheader
`;

// EMAIL_TIPS content
const emailTipsContent = `# 📧 Email Tips & Best Practices

## 🔤 Emoji v emailech

**Problém:** Emoji se zalomí na nový řádek

**Řešení:** Vždy zabal do span s inline-block:
\`\`\`html
<span style="display:inline-block; vertical-align:middle; line-height:1; font-size:1.1em;">🎉</span>
\`\`\`

---

## 🖼️ Obrázky

**Problém:** Obrázky se nezobrazují v Outlooku

**Řešení:**
- Hostuj na CDN nebo Brevo
- VŽDY přidej ALT text
- Nastav width v px
- Použij display: block

---

## 👆 Tlačítka

**Problém:** Tlačítka nefungují v Outlooku

**Řešení:** Přidej VML fallback:
\`\`\`html
<!--[if mso]>
<v:roundrect href="URL" style="height:48px;width:200px;" fillcolor="#ff7ad9">
  <center style="color:#fff;font-weight:bold;">Text</center>
</v:roundrect>
<![endif]-->
<!--[if !mso]><!-->
<a href="URL" style="...">Text</a>
<!--<![endif]-->
\`\`\`

---

## 🌙 Dark Mode

**Meta tagy:**
\`\`\`html
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
\`\`\`

**CSS:**
\`\`\`css
@media (prefers-color-scheme: dark) {
  .email-body { background-color: #1a1a2e !important; }
}
\`\`\`

---

## ✅ Checklist před odesláním

- [ ] Preheader text nastaven
- [ ] Všechny odkazy fungují
- [ ] ALT texty u obrázků
- [ ] Emoji zabalené ve span
- [ ] Testováno v Litmus/Email on Acid
- [ ] Mobilní verze OK
- [ ] Personalizace funguje
`;

// Brand colors content with themes
const brandColorsContent = `# 🎨 Aibility Brand Colors & Themes

## 4 Barevné varianty

### Light Pink-Blue (výchozí)
\`\`\`css
/* Background */
background: #f3f4ff;
container: #ffffff;

/* Text */
primary: #020617;
secondary: #334155;
muted: #64748b;

/* Gradient */
background: linear-gradient(135deg, #ff7ad9 0%, #6a9bff 100%);
\`\`\`

### Light Sunset
\`\`\`css
/* Background */
background: #f3f4ff;
container: #ffffff;
box: #fffbf5;

/* Text */
primary: #020617;
secondary: #334155;

/* Gradient */
background: linear-gradient(135deg, #ff7ad9 0%, #6a9bff 50%, #ffb86b 100%);
\`\`\`

### Dark Pink-Blue
\`\`\`css
/* Background */
background: #0a0a0a;
container: #1a1a2e;
box: #252542;

/* Text */
primary: #f8fafc;
secondary: #94a3b8;

/* Gradient */
background: linear-gradient(135deg, #ff7ad9 0%, #6a9bff 100%);
\`\`\`

### Dark Sunset
\`\`\`css
/* Background */
background: #0a0a0a;
container: #1a1a1a;
box: #2a2a2a;

/* Text */
primary: #f8fafc;
secondary: #94a3b8;

/* Gradient */
background: linear-gradient(135deg, #ff7ad9 0%, #6a9bff 50%, #ffb86b 100%);
\`\`\`

---

## Primary Colors

| Název | HEX | Použití |
|-------|-----|---------|
| Pink | #ff7ad9 | Gradient, akcenty |
| Blue | #6a9bff | Gradient, linky |
| Orange | #ffb86b | Sunset gradient |

## Fonts

- **Nadpisy:** Lora (Google Fonts)
- **Text:** Inter (Google Fonts)
- **Fallback:** Georgia, Arial, sans-serif
`;

// Component templates
const components = {
  'greeting.html': `<!-- Greeting Component -->
<tr>
  <td style="padding: 24px 24px 0 24px;">
    <p style="font-family: 'Inter', Arial, sans-serif; font-size: 16px; color: #334155; margin: 0;">
      Dobrý den, {{ contact.OSLOVENI }},
    </p>
  </td>
</tr>`,

  'hero-image.html': `<!-- Hero Image Component -->
<tr>
  <td style="padding: 0;">
    <img src="IMAGE_URL" alt="Hero image" style="width: 100%; height: auto; display: block; border-radius: 16px 16px 0 0;">
  </td>
</tr>`,

  'text-section.html': `<!-- Text Section Component -->
<tr>
  <td style="padding: 24px;">
    <h3 style="font-family: 'Lora', Georgia, serif; font-size: 20px; font-weight: 600; color: #020617; margin: 0 0 12px 0; line-height: 1.3;">
      Nadpis sekce
    </h3>
    <p style="font-family: 'Inter', Arial, sans-serif; font-size: 16px; color: #334155; line-height: 1.7; margin: 0;">
      Zde je obsah vaší sekce. Můžete použít více odstavců a formátování.
    </p>
  </td>
</tr>`,

  'gradient-box.html': `<!-- Gradient Box Component -->
<tr>
  <td style="padding: 0 24px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(255,122,217,0.15) 0%, rgba(106,155,255,0.15) 100%); border-radius: 12px; border: 1px solid rgba(255,122,217,0.3);">
      <tr>
        <td style="padding: 24px;">
          <h4 style="font-family: 'Lora', Georgia, serif; font-size: 18px; font-weight: 600; color: #020617; margin: 0 0 12px 0;">
            <span style="display:inline-block; vertical-align:middle; line-height:1; font-size:1.1em;">✨</span> Důležitá informace
          </h4>
          <p style="font-family: 'Inter', Arial, sans-serif; font-size: 15px; color: #334155; line-height: 1.6; margin: 0;">
            Obsah barevného boxu. Ideální pro zvýraznění klíčových informací.
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>`,

  'cta-button.html': `<!-- CTA Button Component -->
<tr>
  <td style="padding: 24px; text-align: center;">
    <!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://aibility.cz" style="height:48px;v-text-anchor:middle;width:200px;" arcsize="17%" fillcolor="#ff7ad9" stroke="f">
      <w:anchorlock/>
      <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Zjistit více</center>
    </v:roundrect>
    <![endif]-->
    <!--[if !mso]><!-->
    <a href="https://aibility.cz" style="display: inline-block; padding: 14px 32px; border-radius: 8px; font-family: 'Inter', Arial, sans-serif; font-size: 16px; font-weight: 600; text-decoration: none; background: linear-gradient(135deg, #ff7ad9 0%, #6a9bff 100%); color: #ffffff;">
      Zjistit více
    </a>
    <!--<![endif]-->
  </td>
</tr>`,

  'divider.html': `<!-- Divider Component -->
<tr>
  <td style="padding: 16px 24px;">
    <table role="presentation" width="80%" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td style="height: 1px; background-color: #e5e7eb;"></td>
      </tr>
    </table>
  </td>
</tr>`,

  'footer.html': `<!-- Footer Component -->
<tr>
  <td style="padding: 32px 24px; text-align: center; background-color: #ffffff; border-radius: 0 0 16px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding-bottom: 16px;">
          <img src="LOGO_URL" alt="Aibility" style="width: 120px; height: auto;">
        </td>
      </tr>
      <tr>
        <td>
          <p style="font-family: 'Inter', Arial, sans-serif; font-size: 13px; color: #64748b; margin: 0 0 4px 0;">Aibility s.r.o.</p>
          <p style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: #94a3b8; margin: 0;">Praha, Česká republika</p>
        </td>
      </tr>
    </table>
  </td>
</tr>`,
};

// Main function to generate and download ZIP
export async function downloadCursorKit() {
  const zip = new JSZip();

  // Add root files
  zip.file('README.md', readmeContent);
  zip.file('.cursorrules', cursorRulesContent);
  zip.file('EMAIL_TIPS.md', emailTipsContent);
  zip.file('brand-colors.md', brandColorsContent);

  // Add components
  const componentsFolder = zip.folder('components');
  if (componentsFolder) {
    Object.entries(components).forEach(([name, content]) => {
      componentsFolder.file(name, content);
    });
  }

  // Generate and download
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'aibility-email-kit.zip');
}
