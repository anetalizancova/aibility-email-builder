// Email design templates
import { EmailState } from '../email-state';

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  preview: string; // URL to preview image
  state: EmailState;
}

// Newsletter template (from newsletter-leden-2026.html)
export const newsletterTemplate: EmailTemplate = {
  id: 'newsletter',
  name: 'Newsletter',
  description: 'Newsletter design s event boxy a split layoutem',
  preview: '',
  state: {
    blocks: [
      {
        id: 'greeting-1',
        type: 'greeting',
        data: {
          text: 'Hezký den, {{ contact.OSLOVENI }},',
        },
      },
      {
        id: 'text-1',
        type: 'text-section',
        data: {
          title: '',
          content: 'nový rok je tady 🎉. A s ním ta každoroční otázka: Bude to zase jen seznam předsevzetí, která vydržíte do konce ledna?',
          showTitle: false,
        },
      },
      {
        id: 'event-1',
        type: 'event-box',
        data: {
          metaInfo: 'Středa 8:00 • 50 minut • Zdarma',
          title: 'AI Morning Show',
          description: 'Původně to byl náš interní meeting, kde si v týmu sdílíme, co nám s AI funguje, co ne a jak žijeme AI first.\n\nPak nás napadlo: proč si to nechávat pro sebe? Žádná teorie, žádné buzzwordy. Jen reálné ukázky, co děláme, jak to děláme a co se nám (ne)povedlo.',
          buttonText: 'Připojte se zdarma',
          buttonUrl: 'https://aibility.cz/webinare/ai-morning-show',
          gradientPosition: 'right',
          gradientType: 'pink-blue',
        },
      },
      {
        id: 'event-2',
        type: 'event-box',
        data: {
          metaInfo: 'Čtvrtek 13:00 • 60 minut • Zdarma',
          title: 'AI Act v praxi: Udělejte si jasno v pravidlech AI',
          description: '„Můžu do AI vložit zápis z meetingu?" „Musíme označovat AI obrázky?" „Jak poznám, že pracuju s rizikovou situací?"\n\nTahle témata se v týmech probírají dokola. A důvod? AI Act je první velký evropský rámec pro AI – praktický, ale často špatně pochopený.\n\nZa 60 minut pochopíte, co opravdu řeší, co se vás týká a jak s AI pracovat bezpečně každý den. Bez stresu a bez právničiny.',
          buttonText: 'Připojte se zdarma',
          buttonUrl: 'https://aibility.cz/webinare/ai-act-v-praxi-ud%C4%9Blejte-si-jasno-v-pravidlech-ai',
          gradientPosition: 'left',
          gradientType: 'blue-pink',
        },
      },
      {
        id: 'gradient-1',
        type: 'gradient-box',
        data: {
          title: 'Co dál?',
          content: 'Tohle je jen začátek 🚀. V roce 2026 pro vás chystáme spoustu dalších akcí – webináře, workshopy, live streamy.',
          bulletPoints: [],
          gradientType: 'pink-blue',
        },
      },
      {
        id: 'cta-1',
        type: 'cta-button',
        data: {
          text: 'Podívejte se, co všechno vás (prozatím) čeká',
          url: 'https://aibility.cz/webinare/nejblizsi-akce',
          style: 'solid',
        },
      },
      {
        id: 'text-2',
        type: 'text-section',
        data: {
          title: '',
          content: 'Ať se vám rok 2026 povede. A pokud chcete, ať se povede s AI, jsme tu pro vás.\n\nTým Aibility',
          showTitle: false,
        },
      },
      {
        id: 'footer-1',
        type: 'footer',
        data: {
          logoUrl: 'https://d8i8u.img.bh.d.sendibt3.com/im/sh/0KocJ5hj80v-.jpg?u=WtVElij8PJZGdmbTqTmqLMTcgUKHKFEd',
          showSocials: true,
          companyName: 'Aibility s.r.o.',
          address: 'Praha, Česká republika',
        },
      },
    ],
    selectedBlockId: null,
    theme: 'light-pink-blue',
    preheader: 'Nový rok, nové akce: Dvě akce zdarma tento týden. AI Morning Show a AI Act v praxi.',
  },
};

// B2B template (from Aibility B2B Email Template.html)
export const b2bTemplate: EmailTemplate = {
  id: 'b2b',
  name: 'B2B Email',
  description: 'B2B email s use case bublinami a video sekcí',
  preview: '',
  state: {
    blocks: [
      {
        id: 'hero-1',
        type: 'hero-image',
        data: {
          imageUrl: '{{ HERO_IMAGE_URL }}',
          altText: 'Hero image',
        },
      },
      {
        id: 'greeting-1',
        type: 'greeting',
        data: {
          text: 'Dobrý den, {{ contact.OSLOVENI }},',
        },
      },
      {
        id: 'text-1',
        type: 'text-section',
        data: {
          title: '',
          content: 'Úvodní text...',
          showTitle: false,
        },
      },
      {
        id: 'gradient-1',
        type: 'gradient-box',
        data: {
          title: 'Hlavní sekce',
          content: 'Popis produktu/služby...',
          bulletPoints: [],
          gradientType: 'pink-blue',
        },
      },
      {
        id: 'use-case-1',
        type: 'use-case-bubble',
        data: {
          title: 'HR: 6 hodin práce denně',
          result: '→ 1 hodina s AI',
          alignment: 'left',
          gradientUrl: '{{ GRADIENT_BACKGROUND_URL }}',
        },
      },
      {
        id: 'use-case-2',
        type: 'use-case-bubble',
        data: {
          title: 'Marketing: Tvorba obsahu',
          result: '→ 80% rychleji',
          alignment: 'right',
          gradientUrl: '{{ GRADIENT_BACKGROUND_URL }}',
        },
      },
      {
        id: 'video-1',
        type: 'video-section',
        data: {
          videoUrl: '{{ VIDEO_URL }}',
          thumbnailUrl: '{{ VIDEO_THUMBNAIL_URL }}',
          title: 'Jak to vypadá v praxi',
          altText: 'Video thumbnail',
        },
      },
      {
        id: 'cta-1',
        type: 'cta-button',
        data: {
          text: 'Zjistit více',
          url: '{{ BUTTON_1_URL }}',
          style: 'solid',
        },
      },
      {
        id: 'footer-1',
        type: 'footer',
        data: {
          logoUrl: '{{ LOGO_AIBILITY_URL }}',
          showSocials: true,
          companyName: 'Aibility s.r.o.',
          address: 'Praha, Česká republika',
        },
      },
    ],
    selectedBlockId: null,
    theme: 'light-pink-blue',
    preheader: '',
  },
};

export const templates: EmailTemplate[] = [
  newsletterTemplate,
  b2bTemplate,
];

export function getTemplate(id: string): EmailTemplate | undefined {
  return templates.find(t => t.id === id);
}

