export interface LeaderEntry {
  name: string;
  scores: Record<string, { score: number; total: number; at: number }>;
  updatedAt: number;
}

const KEY = "db-midterm-leaderboard-v1";
export const leaderboardEvents = new EventTarget();

function storageKey(ns?: string) {
  return ns ? `${KEY}-${ns}` : KEY;
}

export function loadLeaderboard(ns?: string): LeaderEntry[] {
  try {
    const raw = localStorage.getItem(storageKey(ns));
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function persist(entries: LeaderEntry[], ns?: string) {
  try {
    localStorage.setItem(storageKey(ns), JSON.stringify(entries));
    leaderboardEvents.dispatchEvent(new Event("change"));
  } catch {
    /* ignore */
  }
}

export function saveFirstAttempt(name: string, setId: string, score: number, total: number, ns?: string) {
  const trimmed = name.trim();
  if (!trimmed) return false;
  const entries = loadLeaderboard(ns);
  let entry = entries.find((e) => e.name.toLowerCase() === trimmed.toLowerCase());
  if (!entry) {
    entry = { name: trimmed, scores: {}, updatedAt: Date.now() };
    entries.push(entry);
  }
  if (entry.scores[setId]) return false;
  entry.scores[setId] = { score, total, at: Date.now() };
  entry.updatedAt = Date.now();
  persist(entries, ns);
  return true;
}

export function overallScore(e: LeaderEntry): { score: number; total: number } {
  let score = 0;
  let total = 0;
  for (const s of Object.values(e.scores)) {
    score += s.score;
    total += s.total;
  }
  return { score, total };
}

export function clearLeaderboard(ns?: string) {
  try {
    localStorage.removeItem(storageKey(ns));
    leaderboardEvents.dispatchEvent(new Event("change"));
  } catch {
    /* ignore */
  }
}
