import { kv } from "@vercel/kv";
import { scrapeEvents } from "../lib/scrapeEvents";
import { daysUntil } from "../lib/dateUtils";

const DEFAULT_REMINDER_DAYS = "10";
const DEFAULT_TIME_ZONE = "Europe/Prague";

const parseReminderDays = (value: string | undefined): number[] => {
  const raw = value?.trim() || DEFAULT_REMINDER_DAYS;
  return raw
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((num) => Number.isInteger(num) && num > 0);
};

const buildEventKey = (url: string, date: Date) => {
  const urlObj = new URL(url);
  const dateIso = date.toISOString().slice(0, 10);
  return `${dateIso}::${urlObj.pathname}`;
};

const isKvConfigured = () =>
  Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

const buildSlackMessage = (title: string, dateText: string, url: string, day: number) => {
  return [
    `🚀 Reminder: Za ${day} dní je akce!`,
    `Název: ${title}`,
    `Datum: ${dateText}`,
    `LP: ${url}`,
    "→ Čas spustit kampaň!"
  ].join("\n");
};

const sendSlackMessage = async (text: string) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("Missing SLACK_WEBHOOK_URL");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Slack webhook failed: ${response.status} ${body}`);
  }
};

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const timeZone = process.env.TZ || DEFAULT_TIME_ZONE;
    const reminderDays = parseReminderDays(process.env.REMINDER_DAYS);
    const response = await fetch("https://aibility.cz/webinare/nejblizsi-akce");
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`);
    }

    const html = await response.text();
    const events = scrapeEvents(html);
    const sent: Array<{ title: string; day: number }> = [];

    for (const event of events) {
      const daysRemaining = daysUntil(event.date, timeZone);
      if (!reminderDays.includes(daysRemaining)) continue;

      const eventKey = buildEventKey(event.url, event.date);
      const dayKey = `reminder:sent:${daysRemaining}:${eventKey}`;

      if (isKvConfigured()) {
        const alreadySent = await kv.get(dayKey);
        if (alreadySent) continue;
      }

      const text = buildSlackMessage(
        event.title,
        event.dateText,
        event.url,
        daysRemaining
      );
      await sendSlackMessage(text);
      sent.push({ title: event.title, day: daysRemaining });

      if (isKvConfigured()) {
        await kv.set(dayKey, new Date().toISOString());
      }
    }

    res.status(200).json({
      ok: true,
      sent,
      eventCount: events.length
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(500).json({ ok: false, error: message });
  }
}
