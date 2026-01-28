const CZECH_MONTHS: Record<string, number> = {
  ledna: 1,
  unora: 2,
  brezna: 3,
  dubna: 4,
  kvetna: 5,
  cervna: 6,
  cervence: 7,
  srpna: 8,
  zari: 9,
  rijna: 10,
  listopadu: 11,
  prosince: 12
};

const DAY_MS = 24 * 60 * 60 * 1000;

const normalizeToken = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

export const parseCzechDate = (dateText: string): Date | null => {
  const match = dateText.match(/(\d{1,2})\.\s*([^\s]+)\s*(\d{4})/i);
  if (!match) return null;

  const day = Number(match[1]);
  const monthToken = normalizeToken(match[2]);
  const year = Number(match[3]);
  const month = CZECH_MONTHS[monthToken];
  if (!day || !month || !year) return null;

  return new Date(Date.UTC(year, month - 1, day));
};

export const getTodayUtc = (timeZone: string): Date => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const parts = formatter.formatToParts(new Date());
  const year = Number(parts.find((p) => p.type === "year")?.value);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const day = Number(parts.find((p) => p.type === "day")?.value);

  return new Date(Date.UTC(year, month - 1, day));
};

export const daysUntil = (targetDateUtc: Date, timeZone: string): number => {
  const todayUtc = getTodayUtc(timeZone);
  const diff = targetDateUtc.getTime() - todayUtc.getTime();
  return Math.round(diff / DAY_MS);
};
