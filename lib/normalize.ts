export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\u0e00-\u0e7f]/g, (c) => c)
    .replace(/[^\p{L}\p{N}]/gu, "")
    .normalize("NFKC");
}

export function matchesAnswer(user: string, accepts: string[]): boolean {
  const u = normalize(user);
  if (!u) return false;
  for (const a of accepts) {
    const na = normalize(a);
    if (!na) continue;
    if (u === na) return true;
    if (u.length >= na.length && u.includes(na) && na.length >= 4) return true;
    if (u.length < na.length && na.includes(u) && u.length >= 4) return true;
  }
  return false;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
