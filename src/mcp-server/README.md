# Email Builder MCP Server

MCP server pro integraci Email Builderu s Cursorem.

## Instalace

1. Nainstalujte závislosti:
```bash
npm install
```

2. Přidejte MCP server do Cursor nastavení:

V Cursor Settings > Features > Model Context Protocol přidejte:

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

## Dostupné funkce

### create_email
Vytvoří nový email nebo načte šablonu.

**Parametry:**
- `templateId` (volitelné): ID šablony ('newsletter', 'b2b') nebo null pro prázdný email

### add_block
Přidá nový blok do emailu.

**Parametry:**
- `blockType`: Typ bloku (greeting, hero-image, text-section, atd.)

### update_block
Aktualizuje blok v emailu.

**Parametry:**
- `blockId`: ID bloku
- `data`: Částečná data bloku k aktualizaci

### remove_block
Odstraní blok z emailu.

**Parametry:**
- `blockId`: ID bloku k odstranění

### generate_html
Vygeneruje HTML z aktuálního stavu emailu.

### get_email_state
Vrátí aktuální stav emailu jako JSON.

### list_templates
Vypíše dostupné šablony emailů.

## Použití v Cursoru

Po přidání MCP serveru můžete v Cursoru používat funkce:

```
Vytvoř email z newsletter šablony a přidej text sekci s nadpisem "Ahoj"
```

Cursor automaticky použije MCP funkce pro vytvoření emailu.

