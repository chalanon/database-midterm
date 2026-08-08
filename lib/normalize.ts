export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, "")
    .normalize("NFKC");
}

// Damerau–Levenshtein (optimal string alignment): นับแก้/เพิ่ม/ลบ/สลับ
function editDistance(a: string, b: string): number {
  const n = a.length;
  const m = b.length;
  if (n === 0) return m;
  if (m === 0) return n;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 0; i <= n; i++) dp[i][0] = i;
  for (let j = 0; j <= m; j++) dp[0][j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
      }
    }
  }
  return dp[n][m];
}

export function matchesAnswer(user: string, accepts: string[]): boolean {
  const u = normalize(user);
  if (!u) return false;
  for (const a of accepts) {
    const na = normalize(a);
    if (!na) continue;
    // ตรงเป๊ะ
    if (u === na) return true;
    // คำตอบเป็นส่วนหนึ่งของกันและกัน (ยาวพอ) เช่น "foreign key references ..." มี "foreign key"
    if (u.length >= na.length && u.includes(na) && na.length >= 4) return true;
    if (u.length < na.length && na.includes(u) && u.length >= 4) return true;
    // ใกล้เคียง (สะกดผิด/สลับตัว) — เฉพาะคำยาว ≥ 6 เพื่อไม่ให้ไปฟรี “1:1” กับ “1:N”
    const maxLen = Math.max(u.length, na.length);
    if (maxLen >= 6) {
      const d = editDistance(u, na);
      if (d <= Math.max(1, Math.floor(maxLen / 4))) return true;
    }
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
