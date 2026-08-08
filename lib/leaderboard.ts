export interface LeaderEntry {
  name: string;
  scores: Record<string, { score: number; total: number; at: number }>;
  updatedAt: number;
}

const KEY = "db-midterm-leaderboard-v1";
export const leaderboardEvents = new EventTarget();

export function loadLeaderboard(): LeaderEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function persist(entries: LeaderEntry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries));
    leaderboardEvents.dispatchEvent(new Event("change"));
  } catch {
    /* ignore */
  }
}

export function saveFirstAttempt(name: string, setId: string, score: number, total: number) {
  const trimmed = name.trim();
  if (!trimmed) return false;
  const entries = loadLeaderboard();
  let entry = entries.find((e) => e.name.toLowerCase() === trimmed.toLowerCase());
  if (!entry) {
    entry = { name: trimmed, scores: {}, updatedAt: Date.now() };
    entries.push(entry);
  }
  if (entry.scores[setId]) return false;
  entry.scores[setId] = { score, total, at: Date.now() };
  entry.updatedAt = Date.now();
  persist(entries);
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

export function clearLeaderboard() {
  try {
    localStorage.removeItem(KEY);
    leaderboardEvents.dispatchEvent(new Event("change"));
  } catch {
    /* ignore */
  }
}
