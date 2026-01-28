import * as cheerio from "cheerio";
import { parseCzechDate } from "./dateUtils";

export type ScrapedEvent = {
  title: string;
  date: Date;
  dateText: string;
  url: string;
};

const cleanWhitespace = (value: string) =>
  value.replace(/\s+/g, " ").trim();

const extractTitle = (element: cheerio.Cheerio, fallbackText: string): string => {
  const heading = element.find("h1, h2, h3, h4").first().text();
  if (heading) return cleanWhitespace(heading);

  const match = fallbackText.match(/^(.*?)\d{1,2}\.\s*[^\s]+\s*\d{4}/i);
  const beforeDate = match?.[1] ?? fallbackText;
  return cleanWhitespace(
    beforeDate
      .replace(/(Placen[eé]|Zdarma)/gi, "")
      .replace(/\(\d+\s*min\)/gi, "")
      .trim()
  );
};

export const scrapeEvents = (html: string): ScrapedEvent[] => {
  const $ = cheerio.load(html);
  const events: ScrapedEvent[] = [];
  const seen = new Set<string>();

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    if (href.includes("/webinare/nejblizsi-akce")) return;

    const text = cleanWhitespace($(el).text());
    const dateMatch = text.match(/\d{1,2}\.\s*[^\s]+\s*\d{4}/i);
    if (!dateMatch) return;

    const url = new URL(href, "https://aibility.cz/webinare/nejblizsi-akce").toString();
    if (seen.has(url)) return;

    const dateText = dateMatch[0];
    const date = parseCzechDate(dateText);
    if (!date) return;

    const title = extractTitle($(el), text);
    if (!title) return;

    seen.add(url);
    events.push({ title, date, dateText, url });
  });

  return events;
};
