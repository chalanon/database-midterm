"use client";

import { useEffect, useMemo, useState } from "react";
import { clearLeaderboard, leaderboardEvents, loadLeaderboard, overallScore } from "@/lib/leaderboard";
import type { LeaderEntry } from "@/lib/leaderboard";
import type { QuizSet } from "@/lib/types";

interface Props {
  sets: QuizSet[];
  ns?: string;
}

export default function Leaderboard({ sets, ns = "" }: Props) {
  const GRAND_TOTAL = sets.reduce((s, x) => s + x.total, 0);
  const [entries, setEntries] = useState<LeaderEntry[]>([]);
  const [tab, setTab] = useState<string>("overall");

  useEffect(() => {
    const refresh = () => setEntries(loadLeaderboard(ns));
    refresh();
    leaderboardEvents.addEventListener("change", refresh);
    return () => leaderboardEvents.removeEventListener("change", refresh);
  }, [ns]);

  const ranked = useMemo(() => {
    const sorted = [...entries].sort((a, b) => {
      const sa = tab === "overall" ? overallScore(a).score : a.scores[tab]?.score ?? 0;
      const sb = tab === "overall" ? overallScore(b).score : b.scores[tab]?.score ?? 0;
      return sb - sa;
    });
    if (tab === "overall") return sorted.filter((e) => Object.keys(e.scores).length > 0);
    return sorted.filter((e) => e.scores[tab]);
  }, [entries, tab]);

  const medal = (i: number) => (i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : "");
  const tabTotal = tab === "overall" ? GRAND_TOTAL : sets.find((s) => s.id === tab)?.total ?? 0;

  return (
    <div className="card pad">
      <div className="lb-tabs">
        <button
          className={`lb-tab ${tab === "overall" ? "active" : ""}`}
          onClick={() => setTab("overall")}
        >
          🏆 รวมทุกชุด ({GRAND_TOTAL} คะแนน)
        </button>
        {sets.map((s) => (
          <button
            key={s.id}
            className={`lb-tab ${tab === s.id ? "active" : ""}`}
            onClick={() => setTab(s.id)}
          >
            ชุด {s.no} ({s.total})
          </button>
        ))}
      </div>

      {ranked.length === 0 ? (
        <div className="empty">
          ยังไม่มีอันดับในชุดนี้ — ทำแบบฝึกหัดแล้วกด "บันทึกคะแนนลงอันดับ" (นับเฉพาะรอบแรกเท่านั้น)
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="lb-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ชื่อ</th>
                <th>{tab === "overall" ? "คะแนนรวม" : "คะแนน"}</th>
                <th>จากทั้งหมด</th>
                <th>สัดส่วน</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((e, i) => {
                const s = tab === "overall" ? overallScore(e) : e.scores[tab] ?? { score: 0, total: tabTotal };
                return (
                  <tr key={e.name + i}>
                    <td>
                      <span className={`rank-badge ${medal(i)}`}>{i + 1}</span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{e.name}</td>
                    <td>{s.score}</td>
                    <td>{s.total}</td>
                    <td>{Math.round((s.score / s.total) * 100)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {entries.length > 0 && (
        <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
          <button
            className="btn ghost small"
            onClick={() => {
              if (confirm("ล้างอันดับทั้งหมด?")) clearLeaderboard(ns);
            }}
          >
            🗑️ ล้างอันดับ (เครื่องนี้)
          </button>
        </div>
      )}
    </div>
  );
}
